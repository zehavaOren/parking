using backend.Controllers;
using ClosedXML.Excel;
using DocumentFormat.OpenXml.Drawing;
using DocumentFormat.OpenXml.Spreadsheet;
using System.Collections.Generic;
using System.Data;
using static backend.Controllers.Dev.FileController;

namespace backend.BL
{
    public class Excel
    {

        private static List<string> list = new List<string> { "זהות עובד", "שם פרטי", "שם משפחה", "אגף", "מחלקה", "תפקיד",
            "מעמד/זכאות","מקום חניה","סיבת דחיה","תאריך הוספה" };

   
        public static DataTable ImportExceltoDatatable(string filePath, string sheetName)
        {
            using (XLWorkbook workBook = new XLWorkbook(filePath))
            {
                //Read the first Sheet from Excel file.
                IXLWorksheet workSheet = workBook.Worksheet(1);

                //Create a new DataTable.
                DataTable dt = new DataTable();

                //Loop through the Worksheet rows.
                bool firstRow = true;
                foreach (IXLRow row in workSheet.Rows())
                {
                    //Use the first row to add columns to DataTable.
                    if (firstRow)
                    {
                        foreach (IXLCell cell in row.Cells())
                        {
                            dt.Columns.Add(cell.Value.ToString());
                        }
                        firstRow = false;
                    }
                    else
                    {
                        //Add rows to DataTable.
                        dt.Rows.Add();
                        int i = 0;

                        foreach (IXLCell cell in row.Cells(row.FirstCellUsed().Address.ColumnNumber, row.LastCellUsed().Address.ColumnNumber))
                        {
                            dt.Rows[dt.Rows.Count - 1][i] = cell.Value.ToString();
                            i++;
                        }
                    }
                }

                return dt;
            }

        }

        // TODO
        //create function

        public static Response CheckTd(DataTable td)
        {
            Response r = new Response();
            int i ;
            for ( i = 0; i < td.Columns.Count; i++)
            {
                if (td.Columns[i].ColumnName != list[i])
                {
                    r.Status = -1;
                    r.Msg = "הכותרות אינן תואמות ";
                    break;
                }
              
            }
            if(i== td.Columns.Count)
            {
                //SpRequest s = new SpRequest();
                //s.columns=
                //SpRequest.GetData("upsert_eligibility_waive", td);
                //Data.GetData
            }

            return r;
        }




    }
}
