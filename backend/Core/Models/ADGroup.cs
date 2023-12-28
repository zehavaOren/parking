using System.Security.Principal;

namespace backend.Core.Models
{
    public class ADGroup
    {
        public string Name { get;  set; }
        public string Sid { get;  set; }
        public string Description { get;  set; }
        public string DistinguishedName { get;  set; }
    }
}