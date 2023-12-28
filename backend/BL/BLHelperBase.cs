using backend.Core.Config;
using backend.Core.Data;
using backend.Core.Logging;
using backend.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.BL
{
    public class BLHelperBase
    {
        public readonly ConfigurationManager Cm;
        public readonly IUserAD Auth;
        public readonly Logger Logger;

        private SqlHelper _sh;
        public SqlHelper SqlHelper
        {
            get
            {
                if (_sh == null)
                    _sh = SqlHelper.GetInstance(Auth, Logger);
                return _sh;
            }
        }

        public BLHelperBase(ConfigurationManager cm, IUserAD auth, Logger log)
        {
            Cm = cm;
            Logger = log;
            Auth = auth;
        }
        public void ConsoleWriteLine(string text)
        {
            Console.WriteLine($"Console: {text}");
        }
        public void ConsoleError(Exception ex)
        {
            StringBuilder s = new StringBuilder($"{ex.Message} {ex.StackTrace}");
            var e = ex.InnerException;
            while (e != null)
            {
                s.AppendLine($"{e.Message} {e.StackTrace}");
                e = e.InnerException;
            }

            ConsoleWriteLine(s.ToString());
        }
    }
}
