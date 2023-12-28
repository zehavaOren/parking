using backend.Controllers.Base;
using backend.Core.Config;
using backend.Core.Data;
using backend.Core.Logging;
using backend.Core.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DataController : MainControllerBase
    {
        [HttpPost("GetData")]
        public IActionResult GetData(SpRequest SpRequest)
        {
            try
            {
                var res = new ResponseData(SpRequest.GetData(configurationManager, authHelper, Logger));
                return Ok(res);
            }
            catch (Exception ex)
            {
                Logger.Error($"GetData: Sp: {SpRequest.StoredProcedure} p:${JsonConvert.SerializeObject(SpRequest.Params)} v:${JsonConvert.SerializeObject(SpRequest.CmdParmas)} = {ex.Message}", ex);

                return ResponseError(ex);
            }

        }


        //[HttpPost("UploadFiles")]
        //public IActionResult UploadFiles(SpRequest SpRequest)
        //{
        //    try
        //    {
        //        var res = new ResponseData(SpRequest.GetData(configurationManager, authHelper, Logger));
        //        return Ok(res);
        //    }
        //    catch (Exception ex)
        //    {
        //        Logger.Error($"GetData: Sp: {SpRequest.StoredProcedure} p:${JsonConvert.SerializeObject(SpRequest.Params)} v:${JsonConvert.SerializeObject(SpRequest.CmdParmas)} = {ex.Message}", ex);

        //        return ResponseError(ex);
        //    }

        //}





        [HttpPost("ExportToExcel")]
        public IActionResult ExportToExcel(SpRequest SpRequest)
        {
            try
            {
                var res = new ResponseData(SpRequest.GetData(configurationManager, authHelper, Logger));
                return this.ExportExcelBL(res.Data[0],SpRequest.columns);
            }
            catch (Exception ex)
            {
                Logger.Error($"ExportToExcel: Sp: {SpRequest.StoredProcedure} = {ex.Message}", ex);
                return ResponseError(ex);
            }

        }
        private string[] offlinePaths = new string[] {
            Path.Combine(Path.GetFullPath(Path.Combine(Environment.CurrentDirectory, @"..\..\..\Client\mobile\public\mockup"))),
            Path.Combine(Path.GetFullPath(Path.Combine(Environment.CurrentDirectory, @"..\..\..\Client\desktop\src\assets\mockups")))
        };

        public DataController(ConfigurationManager cm, IUserAD h, Logger log) : base(cm, h, log) { }
    }

    public class SpRequest : backend.Core.Data.SpRequest
    {
        public List<string> columns { get; set; }
        public IEnumerable<string> CmdParmas { get; private set; }

        public DataSet GetData(ConfigurationManager cm, IUserAD h, Logger log)
        {
            var sqlHelper = SqlHelper.GetInstance(h, log);

            DataSet ds;
            var sp = $"{Scheme}.sp_prk_{this.StoredProcedure}";
            using (var db = sqlHelper.CreateConnection(cm.DefaultConnectionString))
            {
                if (Params != null && Params.Length > 0)
                {
                    try
                    {

                    var p = this.GetSqlParameter(h);
                    CmdParmas = p.Select(e => $"@{e.ParameterName}={e.Value}");
                    ds = sqlHelper.ExecuteDataset(db.Connection, CommandType.StoredProcedure, sp, p);
                    }
                    catch (Exception ex)
                    {

                        throw;
                    }
                }
                else
                    ds = sqlHelper.ExecuteDataset(db.Connection, CommandType.StoredProcedure, sp);
                if (ds.Tables.Count > 0)
                {
                    return ds;
                }
                else return null;
            }
        }

        public override SqlParameter[] GetSqlParameter(IUserAD h)
        {
            SqlParameter[] parm = new SqlParameter[this.Params.Length];
            for (int i = 0, j = 0; i < this.Params.Length && j < this.Params.Length; i++, j++)
            {
                if (this.Params[i].IsTableValue && this.Params[i].Value.GetType() == typeof(string))
                {
                    DataTable dt = JsonConvert.DeserializeObject<DataTable>(this.Params[i].Value.ToString());
                    parm[j] = new SqlParameter(this.Params[i].ParameterName, dt.Rows.Count > 0 ? dt : null);
                    if (dt.Rows.Count <= 0)
                    {
                        var r = parm.ToList();
                        r.RemoveAt(j);
                        parm = r.ToArray();
                        j--;
                    }
                }
                else
                {
                    var value = this.Params[i].Value;
                    var Uppername = this.Params[i].ParameterName.ToUpper();
                    switch (Uppername)
                    {
                        case "USERNAME":
                            value = h.UserName;
                            break;
                        default:
                            break;
                    }
                    parm[i] = new SqlParameter(this.Params[i].ParameterName, value);
                }
            }

            return parm;
        }
    }

}