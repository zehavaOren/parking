using backend.Core.Config;
using log4net;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using System.Xml;

namespace backend.Core.Logging
{
    public class Logger
    {
        private const string LOG_CONFIG_FILE = @"log4net.{0}.config";

        private ILog _log;
        private readonly ConfigurationManager cm;

        public void Info(string message, object stack)
        {
            Console.WriteLine($"Info: {message} -> {stack}");
            var d = new LoggerCustomData(cm.AppSettings.AppName, "");
            d.SetData();

            var ex = new Exception(stack != null ? stack.ToString() : null);
            _log.Info(message, ex);
        }

        public void Debug(string message, object stack)
        {
            Console.WriteLine($"Debug: {message} -> {stack}");
            var d = new LoggerCustomData(cm.AppSettings.AppName, "");
            d.SetData();

            var ex = new Exception(stack != null ? stack.ToString() : null);
            _log.Debug(message, ex);
        }

        public void Error(string message, Exception ex)
        {
            Console.WriteLine($"Error: {message} -> {ex.Message} :{ex.StackTrace}");
            var d = new LoggerCustomData(cm.AppSettings.AppName, "");
            d.SetData();

            _log.Error(message, ex);
        }






        public Logger(ConfigurationManager _cm)
        {
            cm = _cm;

            XmlDocument log4netConfig = new XmlDocument();
            log4netConfig.Load(File.OpenRead(String.Format(LOG_CONFIG_FILE, cm.Environment.EnvironmentName)));
            var repo = LogManager.CreateRepository(Assembly.GetEntryAssembly(), typeof(log4net.Repository.Hierarchy.Hierarchy));
            log4net.Config.XmlConfigurator.Configure(repo, log4netConfig["log4net"]);
            _log = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);
        }
    }
    public class LoggerCustomData
    {
        public string Caller { get; set; }
        public string UserName { get; set; }

        public void SetData()
        {
            foreach (var p in GetType().GetProperties())
                GlobalContext.Properties[p.Name] = p.GetValue(this);
        }

        public LoggerCustomData(string caller, string userName)
        {
            Caller = caller;
            UserName = userName;
        }
    }
}
