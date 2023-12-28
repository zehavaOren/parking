using backend.Core.Logging;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Core.Middleware
{
    public class StaticFilesMiddleware
    {
        private readonly RequestDelegate _next;
        private Logger logger;
        public StaticFilesMiddleware(RequestDelegate next, Logger log)
        {
            _next = next;
            logger = log;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);

                if (context.Response.StatusCode == 404 && !Path.HasExtension(context.Request.Path.Value) && !context.Request.Path.Value.StartsWith("/api"))
                {
                    context.Response.StatusCode = 200;
                    await context.Response.WriteAsync(System.IO.File.ReadAllText(@"wwwroot/index.html"));
                }
            }
            catch (Exception ex)
            {

            }
        }
    }
}
