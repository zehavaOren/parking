using System;
using System.Data.SqlClient;

namespace backend.Core.Data
{
    public class SqlContext : IDisposable
    {
        bool disposed = false;

        public SqlConnection Connection { get; set; }

        public SqlContext(string conn)
        {
            Connection = new SqlConnection(conn);
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        // Protected implementation of Dispose pattern.
        protected virtual void Dispose(bool disposing)
        {
            if (disposed)
                return;

            if (disposing)
            {
                Connection = null;
            }
            disposed = true;
        }

        ~SqlContext()
        {
            Dispose(false);
        }
    }
}
