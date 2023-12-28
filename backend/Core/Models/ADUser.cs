using Microsoft.Graph;
using System.Collections.Generic;

namespace backend.Core.Models
{
    public class ADUser
    {
        private readonly string idGroup = "2500";
        public string UserId { get; set; }
        public string UserName { get; set; }
        public string Name { get; set; }
        public string GivenName { get; set; }
        public string Surname { get; set; }
        public string WindowsAccountName { get; set; }
        public string DisplayName { get; set; }

        public string Department { get; set; }
        public string Email { get; set; }
        public string MobilePhone { get; set; }

        public List<ADGroup> Groups { get; set; }

        public ADUser() { }

        public ADUser(IUserAD auth, string userName)
        {
            var me = auth.GetGraphApiUser(userName);
            if (me != null && me.UserName != null)
            {
                var transitiveMemberOf = auth.GetTransitiveMemberOf();
                userName = me.UserName.Split("@")[0];

                GivenName = me.GivenName;
                Surname = me.Surname;
                DisplayName = me.DisplayName;
                Name = me.Name;
                UserName = me.UserName;
                UserId = me.UserId;
                Email = me.Email;

                // get DirectoryEntry underlying it
                Department = me.Department;
                WindowsAccountName = me.WindowsAccountName;
                MobilePhone = me.MobilePhone;

                //groups
                Groups = new List<ADGroup>();
                foreach (var p in transitiveMemberOf)
                {
                    if (p.Name.StartsWith(idGroup) && p.Name != idGroup && int.TryParse(p.Name, out int valueTryParse))
                    {
                        Groups.Add(new ADGroup { Name = p.Name, Description = p.Description});
                    }

                }
            }

        }
    }
}
