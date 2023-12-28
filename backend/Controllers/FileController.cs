using DocumentFormat.OpenXml.ExtendedProperties;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Buffers.Text;
using System.Collections.Generic;
using System.IO;
using System.Reflection;
using System.Threading.Tasks;
using PdfSharpCore;
using PdfSharp;
using Microsoft.AspNetCore.Http;
using Azure.Core;
using ClosedXML.Excel;
using System.Data;
using backend.BL;
using NReco.PdfGenerator;

namespace backend.Controllers.Dev
{
    [ApiController]
    [Route("api/File")]
    public class FileController : ControllerBase
    {
        private static string basePath = "M:\\files";

        [HttpPost("UploadFile")]
        public async Task<ActionResult<List<string>>> UploadFile()
        {
            try
            {

                var file = Request.Form.Files[0];


                var path = Path.Combine(basePath, DateTime.Now.ToString("dd-MM-yy"));

                if (!Directory.Exists(path))
                {
                    Directory.CreateDirectory(path);
                }

                int ind = 0;
                string fileName1 = file.FileName;
                string fileName = file.FileName.Split('.')[0];
                string ext = '.' + file.FileName.Split('.')[1];
                while (System.IO.File.Exists(path + "\\" + fileName + ext))
                {
                    ind++;
                    fileName = fileName + '_' + ind.ToString();
                }

                path = path + "\\" + fileName + ext;
                string endPath = path.Substring(path.LastIndexOf(basePath));

                using (var stream = new FileStream(path, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }
                List<string> pathList = new List<string>();
                pathList.Add(endPath);
                return Ok(pathList);
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpPost("ReadFile")]
        public ActionResult ReadFile(FilePath filePath)
        {
            try
            {
                string path = basePath + "\\" + filePath.path;
                path = filePath.path;
                if (System.IO.File.Exists(path))
                {
                    byte[] bytes = System.IO.File.ReadAllBytes(path);
                    filePath.base64 = Convert.ToBase64String(bytes);
                    return Ok(filePath);
                }
                return Ok();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
        public class FilePath
        {
            public string path;
            public string base64;
        }






        [HttpPost("ChangeFile")]
        public ActionResult ChangeFile(String path)
        {

            try
            {
                // Check if file exists with its full path    
                if (System.IO.File.Exists(Path.Combine(basePath, path)))
                {
                    // If file found, delete it    
                    System.IO.File.Delete(Path.Combine(basePath, path));
                }
                return Ok();

            }
            catch (IOException ioExp)
            {
                return BadRequest();

            }
        }

        [HttpPost("UploadFileExcel")]
        // public async Task<ActionResult<List<string>>> UploadFileExcel()
        public ActionResult UploadFileExcel()
        {
            try
            {

                //var url = basePath + "\\aaa\\subscriber-reports -05_06_2023.xlsx";
                //if (System.IO.Directory.Exists(basePath))
                //{
                //    var t = "kk;l";
                //}
                //if (System.IO.File.Exists(url))
                //{
                //}

                var file = Request.Form.Files[0];
                BL.FilePath f = new BL.FilePath();
                var path = f.UploadFile(file);
                DataTable dt = BL.Excel.ImportExceltoDatatable(path.Link, "");

                Response r = BL.Excel.CheckTd(dt);
                if (r.Status != -1)
                {
                    r.Status = 1;
                    r.OutputDT = dt;
                }
                System.IO.File.Delete(path.Link);

                return Ok(r);

                //        app.MapPost("/upload", async (HttpRequest request) =>
                //        {
                //            using (var memStrem = new MemoryStream())
                //            {
                //                await request.Body.CopyToAsync(memStrem);
                //                using (var workbook = new ClosedXML.Excel.XLWorkbook(memStrem))
                //                {
                //                    return workbook.Worksheets.First().Name;
                //                }
                //            }

                //        })
                //.Accepts<IFormFile>("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            }
            catch
            {
                return BadRequest();
            }
        }


        //public static Byte[] PdfSharpConvert(String html)
        //{
        //    Byte[] res = null;
        //    using (MemoryStream ms = new MemoryStream())
        //    {
        //        var t = PdfSharp.W
        //        var pdf = TheArtOfDev.HtmlRenderer.PdfSharp.PdfGenerator.GeneratePdf(html, PdfSharp.PageSize.A4);
        //        pdf.Save(ms);
        //        res = ms.ToArray();
        //    }
        //    return res;
        //}


        [HttpPost("CreateFile")]
        public ActionResult CreateFile(FilePath file)
        {

            try
            {
                HtmlToPdfConverter pdf = new HtmlToPdfConverter();
                //pdf.TempFilesPath = _DocPath + '\\' + fileName;
                pdf.Margins = new PageMargins();
                //var isPageOrientation = data.GetValue("isPageOrientation")?.ToString();
                //if (isPageOrientation != null && int.Parse(isPageOrientation) == 1)
                //{
                //    pdf.Orientation = PageOrientation.Landscape;
                //}
                var bytes = pdf.GeneratePdf(file.path);

                //string docName = fileName + "_" + DateTime.Now.Year.ToString() + DateTime.Now.Month.ToString() + DateTime.Now.Day.ToString() + "_" + DateTime.Now.Hour.ToString() + DateTime.Now.Minute.ToString() + DateTime.Now.Second.ToString();
                //using (FileStream stream = new FileStream(_DocPath + "\\" + docName + ".pdf", FileMode.Create, FileAccess.Write, FileShare.Read))
                //{
                //    stream.Write(bytes, 0, bytes.Length);
                //}
                return Ok(bytes);


            }
            catch (IOException ioExp)
            {
                return BadRequest();

            }
        }

    }
}
