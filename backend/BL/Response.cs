using System.Data;

namespace backend.BL

{
    public class Response
    {
        public int Status { get; set; }
        public string Msg { get; set; }
        public int  Output { get; set; }=0;
        public DataTable OutputDT { get; set; } = null;
        public string Link { get; set; } = "";
    }
}
