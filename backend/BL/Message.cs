﻿using Microsoft.Graph;

namespace backend.BL
{
    public class Message 
    {
        public string Address { get; set; }

        public string Subject { get; set; }

        public string message { get; set; }

        public string AddressFrom { get; set; }

        public string AddressFromDisplay { get; set; }

        public string[] AddressCC { get; set; }

        public string[] AddressTo { get; set; }

        public string HtmlContent { get; set; }

        public string Name { get; set; }

        public string FooterHtml { get; set; }

        public string HeaderHtml { get; set; }


        public FilePath[] filesPath;

    }
}
