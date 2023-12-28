using System;
using System.Collections.Generic;
using System.Text;

namespace backend.Core.Config
{
    public class AzureAd
    {
        public string Instance { get; set; }
        public string Domain { get; set; }
        public string TenantId { get; set; }
        public string ClientId { get; set; }
        public string ClientSecret { get; set; }
        public string CallbackPath { get; set; }
        public string ApiUrl { get; set; }
        public bool Msal { get; set; }
    }
}
