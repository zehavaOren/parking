using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Core.Models
{
    public interface IUserAD
    {
        string UserName { get; set; }

        ADUser GetGraphApiUser(string userName);

        string GetGraphApiProfilePhoto();

        List<ADGroup> GetTransitiveMemberOf();
    }
}
