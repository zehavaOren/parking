using Azure.Core;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace backend.BL
{
    public class FilePath
    {
        public string docPath { get; set; }

        public string name { get; set; }

        private static string basePath = "M:\\files";

        public Response UploadFile(IFormFile file)
        {
            Response r = new Response();
            try
            {
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
                    file.CopyTo(stream);
                    if (File.Exists(path))
                    {
                        r.Link = endPath;
                        r.Status = 1;
                    }
                    else
                    {
                        r.Status = -1;
                    }
                    return r;
                }
              
            }
            catch (Exception ex)
            {
                r.Msg = ex.Message;
                r.Status = -1;
                return r;
            }

        }

    }


}
