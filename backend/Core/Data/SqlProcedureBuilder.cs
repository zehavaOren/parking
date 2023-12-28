using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Reflection;
using System.Text;
using System.Text.Json.Serialization;
using Newtonsoft.Json;

namespace Supervision.Core.Data
{
    public static class SqlProcedureBuilder
    {
        public static string GetProcedureName(string module, string table, string action)
        {
            return $"sp_{module}_{table}_{action}";
        }

        public static string GetProcedureName(string module, string table, string action, string select)
        {
            return $"sp_{module}_{table}_{action}_{select}";
        }
        public static SqlParameter[] GetSqlParams<T>(T Obj)
        {
            List<SqlParameter> param = new List<SqlParameter>();
            foreach (PropertyInfo prop in Obj.GetType().GetProperties())
            {
                if (prop.GetValue(Obj) != null)
                    param.Add(new SqlParameter('@' + prop.Name, prop.GetValue(Obj)));
            }
            return param.ToArray();
        }
        public static SqlParameter[] GetSqlParams(SqlReportDTO Obj)
        {
            var ParamsDic = JsonConvert.DeserializeObject<Dictionary<string, object>>(Obj.Params);
            List<SqlParameter> param = new List<SqlParameter>();
            if (Obj.Sort != null && Obj.Page != null)
            {
                param.Add(new SqlParameter("@Sort", Obj.Sort));
                param.Add(new SqlParameter("@Page", Obj.Page));
                param.Add(new SqlParameter("@Desc", Obj.Desc));
            }

            foreach (var item in ParamsDic)
            {
                    param.Add(new SqlParameter('@' + item.Key, item.Value));

            }
            return param.ToArray();
        }

        /// <summary>
        /// get sql parameters by dictionary 
        /// </summary>
        public static SqlParameter[] GetSqlParams(Dictionary<string,object> dir)
        {
            List<SqlParameter> param = new List<SqlParameter>();
            foreach (KeyValuePair<string,object> kv in dir)
                    param.Add(new SqlParameter('@' + kv.Key, kv.Value));

            return param.ToArray();
        }
    }

    public class SqlProcedureAction
    {
        public static string Get = "get";
        public static string Set = "set";
        public static string Update = "update";
        public static string Insert = "insert";
        public static string Delete = "delete";

        public string Procedure { get; set; }

        public SqlParameter[] Parameters { get; set; }

        public SqlProcedureAction(string proc)
        {
            this.Procedure = proc;
        }


    }

    public class SqlProcedureSelect
    {
        public static string MainProperty = "main_property";
        public static string Report = "report";


    }
    public class SqlReportDTO
    {
        public string Sort { get; set; }
        public int? Page { get; set; }
        public bool Desc { get; set; }
        public string Params { get; set; }
    }

}
