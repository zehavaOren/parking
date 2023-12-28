using backend.Core.Config;
using backend.Core.Filters;
using backend.Core.Logging;
using backend.Core.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Server.IISIntegration;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Identity.Web;
using backend.Core.Utils;
using Microsoft.AspNetCore.Server.Kestrel.Core;
using Microsoft.OpenApi.Models;
using System.Linq;
using backend.Core.Middleware;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Logging;
using System.Net;



namespace backend
{
    public class Startup
    {
        private readonly Core.Config.ConfigurationManager ConfigurationManager;
        private readonly Logger Logger;
        private readonly IWebHostEnvironment _env;
        readonly string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";



        public Startup(IConfiguration configuration, IWebHostEnvironment env)
        {
            _env = env;
            ConfigurationManager = new Core.Config.ConfigurationManager(_env);
            Logger = new Logger(ConfigurationManager);
        }
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddResponseCompression();
            // add Singleton services
            services.AddSingleton(this.ConfigurationManager);
            services.AddSingleton(this.Logger);



            services.AddMvc(o => { o.Filters.Add<ErrorHandlingFilter>(); });



            if (!ConfigurationManager.AzureAd.Msal)
            {
                services.AddAuthentication(IISDefaults.AuthenticationScheme);
                services.AddHttpContextAccessor();
                services.AddScoped<IUserAD, WinAuthHelper>();
                services.Configure<IISServerOptions>(options =>
                {
                    options.MaxRequestBodySize = null;
                });
            }
            else
            {
                services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                        .AddMicrosoftIdentityWebApi(ConfigurationManager.Configuration) // Add the possibility of acquiring a token to call a protected web API
                        .EnableTokenAcquisitionToCallDownstreamApi() // Enables controllers and pages to get GraphServiceClient by dependency injection And use an in memory token cache
                        .AddMicrosoftGraph()
                        .AddInMemoryTokenCaches();




                services.AddHttpClient();
                services.AddTransient<IUserAD, GraphHelper>();



                services.Configure<KestrelServerOptions>(options =>
                {
                    options.Limits.MaxRequestBodySize = null;
                });
            }



            // Authorization Policies
            services.AddAuthorization();
            services.AddControllers().AddNewtonsoftJson();



            if (_env.IsDevelopment())
            {
                services.AddSwaggerGen(c =>
                {
                    var securityScheme = new OpenApiSecurityScheme
                    {
                        Name = "JWT Authentication",
                        Description = "Enter JWT Bearer token **_only_**",
                        In = ParameterLocation.Header,
                        Type = SecuritySchemeType.Http,
                        Scheme = "bearer",
                        BearerFormat = "JWT",
                        Reference = new OpenApiReference
                        {
                            Id = JwtBearerDefaults.AuthenticationScheme,
                            Type = ReferenceType.SecurityScheme
                        }
                    };
                    c.AddSecurityDefinition(securityScheme.Reference.Id, securityScheme);
                    c.AddSecurityRequirement(new OpenApiSecurityRequirement { { securityScheme, new string[] { } } });
                    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Supervision API", Version = "v1" });
                    c.ResolveConflictingActions(apiDescriptions => apiDescriptions.First());
                });
            }



            services.AddCors(options =>
            {
                options.AddPolicy(MyAllowSpecificOrigins,
                builder =>
                {
                    builder.WithOrigins("https://parkingsubscr-test.muni.jerusalem.muni.il", "http://localhost:4200")
                     .AllowAnyHeader()
                     .AllowAnyMethod()
                    .AllowCredentials();
                });
            });
        }
        public void Configure(IApplicationBuilder app, ILoggerFactory loggerFactory)
        {
            app.UseResponseCompression();



            app.UseDefaultFiles();
            app.UseStaticFiles();



            app.UseMiddleware<StaticFilesMiddleware>();
            app.UseMiddleware<ExceptionMiddleware>(_env.IsDevelopment());



            //log4net info
            var loggingOptions = this.ConfigurationManager.GetSection("Log4NetConfigFile").Get<Log4NetProviderOptions>();
            //loggerFactory.AddLog4Net(loggingOptions);



            if (_env.IsDevelopment())
            {
                app.UseExceptionHandler("/api/error/error-local-development");
                app.UseSwagger();
                app.UseSwaggerUI(c =>
                {
                    c.SwaggerEndpoint("v1/swagger.json", "Supervision API V1");
                    c.DocExpansion(Swashbuckle.AspNetCore.SwaggerUI.DocExpansion.None);
                });
            }
            else
            {
                app.UseHsts();
                app.UseExceptionHandler("/api/error");
            }



            IdentityModelEventSource.ShowPII = true;
            ServicePointManager.SecurityProtocol |= SecurityProtocolType.Tls12;




            app.UseCors(MyAllowSpecificOrigins);



            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();



            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });



            var serviceScopeFactory = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>();
            var serviceProvider = serviceScopeFactory.CreateScope().ServiceProvider;



            Logger.Debug($"env {ConfigurationManager.Environment.EnvironmentName}", null);



        }
    }
}

