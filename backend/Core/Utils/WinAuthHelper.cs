using backend.Core.Models;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;

namespace backend.Core.Utils
{
    public class WinAuthHelper : IUserAD
    {

        private readonly IHttpContextAccessor _httpCnx;

        public string UserName { get; set; }
        public WinAuthHelper(IHttpContextAccessor httpCnx)
        {
            _httpCnx = httpCnx;
        }

        public string GetGraphApiProfilePhoto()
        {
            throw new Exception();
        }

        public ADUser GetGraphApiUser(string userName)
        {
            UserName = userName;

            ADUser user = new ADUser();

            string splitChar = "\\";
            string[] partsOfname = (string.IsNullOrWhiteSpace(userName) ? _httpCnx.HttpContext.User.Identity.Name : userName).Split(splitChar);
            userName = partsOfname.Length > 1 ? partsOfname[1] : partsOfname[0];
            user.UserName = userName;
            return user;
        }

        public List<ADGroup> GetTransitiveMemberOf()
        {
            var g = new List<ADGroup>();
            return g;
        }
    }
}
