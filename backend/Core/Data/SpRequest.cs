using backend.Core.Config;
using backend.Core.Logging;
using backend.Core.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;

namespace backend.Core.Data
{
    public class SpRequest
    {
        public DalParameter[] Params { get; set; }
        public string StoredProcedure { get; set; }
        public string Scheme { get; set; } = "dbo";


        public virtual DataSet GetData(ConfigurationManager cm, IUserAD userAD, Logger log)
        {
            var sqlHelper = SqlHelper.GetInstance(userAD, log);

            DataSet ds;
            var sp = $"{Scheme}.sp_{this.StoredProcedure}";
            using (var db = sqlHelper.CreateConnection(cm.DefaultConnectionString))
            {
                if (Params != null && Params.Length > 0)
                {
                    if (this.Params.Any(x => x.IsTableValue))
                    {
                        ds = sqlHelper.ExecuteDataset(db.Connection, CommandType.StoredProcedure, sp, this.GetSqlParameter(userAD));
                    }
                    else
                    {
                        ds = sqlHelper.ExecuteDataset(db.Connection, CommandType.StoredProcedure, sp, this.GetSqlParameter(userAD));
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

        public virtual SqlParameter[] GetSqlParameter(IUserAD h)
        {
            SqlParameter[] parm = new SqlParameter[this.Params.Length];
            for (int i = 0; i < this.Params.Length; i++)
            {
                if (this.Params[i].IsTableValue && this.Params[i].Value.GetType() == typeof(string))
                {
                    DataTable dt = JsonConvert.DeserializeObject<DataTable>(this.Params[i].Value.ToString());
                    parm[i] = new SqlParameter(this.Params[i].ParameterName, dt.Rows.Count > 0 ? dt : null);
                    if (dt.Rows.Count <= 0)
                    {
                        var r = parm.ToList();
                        r.RemoveAt(i);
                        parm = r.ToArray();
                    }
                }
                else
                {
                    var value = this.Params[i].Value;
                    parm[i] = new SqlParameter(this.Params[i].ParameterName, value);
                }
            }
            return parm;
        }
    }

    public class DalParameter
    {
        public string ParameterName { get; set; }
        public ParameterDirection Direction { get; set; }
        public DbType DbType { get; set; }
        public object Value { get; set; }
        public bool IsTableValue { get; set; }
    }
    public class ResponseData
    {
        public dynamic Data { get; set; }


        public ResponseData(DataSet data)
        {
            List<DataTable> arr = new List<DataTable>();
            if (data != null && data.Tables != null && data.Tables.Count > 0)
                foreach (DataTable item in data.Tables)
                {
                    arr.Add(item);
                }
            this.Data = arr.ToArray();
        }
        public ResponseData() { }
    }
}
