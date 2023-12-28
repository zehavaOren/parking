using backend.Controllers.Base;
using backend.Core.Config;
using backend.Core.Logging;
using backend.Core.Models;
using Microsoft.AspNetCore.Mvc;
using Supervision.Core.Data;
using System;
using System.Data;
using System.Threading;

namespace backend.Controllers.Dev
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : MainControllerBase
    {
        [HttpGet()]
        public ActionResult<object> Get()
        {
            return ResponseStatus(new { value = "GET - Im Ok.", info = "GET" });
        }

        [HttpPost()]
        public ActionResult<object> Post(string name)
        {
            return ResponseStatus(new { value = "POST - Im Ok.", info = name });
        }

        [HttpGet("Whois")]
        public ActionResult<object> Whois()
        {
            var auth = this.authHelper.GetGraphApiUser(null);
            return ResponseStatus(new { auth });
        }

        [HttpGet("info")]
        public ActionResult<object> Info()
        {
            return ResponseStatus(new
            {
                env1 = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT"),
                env2 = configurationManager.Environment.EnvironmentName,
                username = this.authHelper.UserName
            });
        }

        [HttpGet("Ex")]
        public ActionResult<object> Exception()
        {
            var ex = new Exception("XX test");
            Logger.Error(ex.Message, ex);
            throw ex;
        }

        [HttpPost("Sql")]
        public ActionResult<object> Sql(RequestMessage t)
        {
            try
            {
                object datetime = null;
                using (var db = SqlHelper.CreateConnection(configurationManager.DefaultConnectionString))
                {
                    switch (t.testNum)
                    {
                        case 1:
                            datetime = SqlHelper.ExecuteScalar(db.Connection, CommandType.Text, $" WAITFOR DELAY '00:00:{t.Second.ToString().PadLeft(2, '0')}'; SELECT 'Hello timeout'", SqlProcedureBuilder.GetSqlParams(new { }));
                            break;

                        case 2:
                            Thread.Sleep(t.Second * 1000);
                            datetime = new { t };
                            break;

                        case 0:
                        default:
                            datetime = SqlHelper.ExecuteScalar(db.Connection, CommandType.Text, "SELECT GETDATE()", SqlProcedureBuilder.GetSqlParams(new { }));
                            break;
                    }
                    return ResponseStatus(datetime);
                }
            }
            catch (Exception ex)
            {
                Logger.Error(ex.Message, ex);
                return ResponseStatus(new { con = configurationManager.DefaultConnectionString, ex });
            }
        }
        public TestController(ConfigurationManager cm, IUserAD h, Logger log = null) : base(cm, h, log)
        {
        }
    }
    public class RequestMessage
    {
        public int Second { get; set; }
        public string Name { get; set; }
        public int testNum { get; set; }
    }
}
