using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Core.Config
{
    public class ConfigurationManager
    {
        public IConfiguration Configuration { get; set; }
        public IWebHostEnvironment Environment { get; set; }

        private string _defaultConnection;
        public string DefaultConnectionString
        {
            get
            {
                if (_defaultConnection == null)
                    _defaultConnection = Configuration.GetConnectionString("DefaultConnection");
                return _defaultConnection;
            }
        }

        private AppSettings _appSettings;
        public AppSettings AppSettings
        {
            get
            {
                if (_appSettings == null)
                {
                    _appSettings = new AppSettings();
                    GetSection(_appSettings, "AppSettings");
                }
                return _appSettings;
            }
        }

        private Endpoints _endpoints;
        public Endpoints Endpoints
        {
            get
            {
                if (_endpoints == null)
                {
                    _endpoints = new Endpoints();
                    GetSection(_endpoints, "Endpoints");
                }
                return _endpoints;
            }
        }

        private AzureAd _azureAd;
        public AzureAd AzureAd
        {
            get
            {
                if (_azureAd == null)
                {
                    _azureAd = new AzureAd();
                    GetSection(_azureAd, "AzureAd");
                }
                return _azureAd;
            }
        }

        private T GetSection<T>(T bind, string section) where T : new()
        {
            var cnfSec = Configuration.GetSection(section);
            if (cnfSec.Key != null)
                cnfSec.Bind(bind);

            return bind;
        }
        public IConfigurationSection GetSection(string section)
        {
            var cnfSec = Configuration.GetSection(section);
            return cnfSec;
        }

        public ConfigurationManager(IWebHostEnvironment env)
        {
            Environment = env;
            Configuration = new ConfigurationBuilder()
                                                     .SetBasePath(Path.Combine(Directory.GetCurrentDirectory()))
                                                     .AddJsonFile("appsettings.json", false, true)
                                                     .AddJsonFile($"appsettings.{env.EnvironmentName}.json", true, true)
                                                     .AddEnvironmentVariables()
                                                     .Build();
        }
    }
}
