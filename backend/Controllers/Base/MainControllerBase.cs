using backend.Core.Config;
using backend.Core.Data;
using backend.Core.Logging;
using backend.Core.Models;
using ClosedXML.Excel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Controllers.Base
{
    public class MainControllerBase : ControllerBase
    {
        public readonly ConfigurationManager configurationManager;
        public readonly IUserAD authHelper;
        public readonly Logger Logger;

        private SqlHelper _sh;
        public SqlHelper SqlHelper
        {
            get
            {
                if (_sh == null && authHelper != null)
                    _sh = SqlHelper.GetInstance(authHelper, Logger);

                return _sh;
            }
        }

        [NonAction]
        public ActionResult ResponseStatus<T>(T p)
        {
            if (p == null)
            {
                if (typeof(T).GetInterface(nameof(ICollection)) != null)
                    return Ok(new List<T>());

                return NotFound();
            }

            return Ok(p);
        }

        [NonAction]
        public ActionResult ResponseStatus<T>(ICollection<T> p)
        {
            if (p == null || p.Count == 0)
                return NotFound();

            return Ok(p);
        }

        protected ActionResult ResponseError(Exception ex)
        {
            Logger.Error(ex.Message, ex);
            return Problem(ex.Message, null, StatusCodes.Status400BadRequest, ex.Message);
        }

        [NonAction]
        protected IActionResult ExportExcelBL(DataTable dt, List<string> columns)
        {
            string offlinePath = Path.GetFullPath(Path.Combine(Directory.GetCurrentDirectory(), @"wwwroot/assets/i18n/he.json"));

            var content = System.IO.File.ReadAllText(offlinePath);
            var list = JsonConvert.DeserializeObject<Dictionary<string, string>>(content);
            DataTable dt2 = null;
            if (columns.Count > 0)
            {
                columns = columns.Where(r => dt.Columns.Contains(r.Trim())).ToList();
                dt2 = dt.DefaultView.ToTable(false, columns.ToArray());
            }
            DataTable d3 = dt2 != null ? dt2 : dt;
            foreach (DataColumn item in d3.Columns)
            {
                var he = list.Where(x => x.Key == item.ColumnName.ToUpper());
                if (he.Any())
                {
                    try
                    {
                        d3.Columns[item.ColumnName].ColumnName = he.First().Value;
                    }
                    catch (Exception)
                    {
                        // d3.Columns[item.ColumnName].ColumnName = item.ColumnName;
                    }
                }
            }

            using (XLWorkbook wb = new XLWorkbook())
            {
                wb.Worksheets.Add(d3).RightToLeft = true;
                using (MemoryStream stream = new MemoryStream())
                {
                    wb.SaveAs(stream);
                    return File(stream.ToArray(), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
                }
            }
        }


        public MainControllerBase(ConfigurationManager cm, IUserAD _graphHelper = null, Logger log = null)
        {
            configurationManager = cm;
            authHelper = _graphHelper;
            Logger = log;
        }
    }
}
