using Microsoft.Graph;
using Microsoft.Identity.Web;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using backend.Core.Models;
using backend.Core.Logging;

namespace backend.Core.Utils
{
    public class GraphHelper : IUserAD
    {
        private Logger logger;

        private static readonly string graphUrl = "https://graph.microsoft.com/beta";//"https://graph.microsoft.com/beta";"https://graph.windows.net";//
        private static readonly string[] scopes = new string[] { "GroupMember.Read.All", "User.Read", "profile", "openid", "email" };//,"Api.Read"

        private readonly ITokenAcquisition _tokenAcquisition;
        private readonly IHttpClientFactory _clientFactory;
        private readonly IHttpContextAccessor _httpCnx;
        private GraphServiceClient _GraphServiceClient;

        public GraphServiceClient GraphServiceClient
        {
            get
            {
                if (_GraphServiceClient == null)
                {
                    _GraphServiceClient = GetGraphClient(scopes).Result;
                }
                return _GraphServiceClient;

            }
        }


        public string UserName { get; set; }
        public GraphHelper(ITokenAcquisition tokenAcquisition, IHttpClientFactory clientFactory, IHttpContextAccessor httpCnx, Logger log)
        {
            _clientFactory = clientFactory;
            _tokenAcquisition = tokenAcquisition;
            _httpCnx = httpCnx;
            logger = log;
        }

        public ADUser GetGraphApiUser(string userName)
        {
            UserName = userName;

            var graphclient = GraphServiceClient;
            //var up = graphclient.Users.Request().Filter($"OnPremisesSamAccountName eq '{userName}'").GetAsync().Result.GetEnumerator().Current;

            var user = new ADUser();

            if (graphclient != null)
            {
                var up = graphclient.Me.Request().GetAsync().Result;
                user.GivenName = up.GivenName;
                user.Surname = up.Surname;
                user.DisplayName = up.DisplayName;
                user.Name = up.UserPrincipalName;
                user.UserName = up.OnPremisesSamAccountName;
                user.UserId = up.EmployeeId;
                user.Email = up.Mail;
                user.Department = up.Department;
                user.WindowsAccountName = up.UserPrincipalName;
                user.MobilePhone = up.MobilePhone;

                UserName = user.UserName;
            }

            return user;

        }

        public string GetGraphApiProfilePhoto()
        {
            try
            {
                var graphclient = GraphServiceClient;


                var photo = string.Empty;
                // Get user photo
                if (graphclient != null)
                    using (var photoStream = graphclient.Me.Photo.Content.Request().GetAsync().Result)
                    {
                        byte[] photoByte = ((MemoryStream)photoStream).ToArray();
                        photo = Convert.ToBase64String(photoByte);
                    }

                return photo;
            }
            catch
            {
                return string.Empty;
            }
        }

        public List<ADGroup> GetTransitiveMemberOf()
        {
            var graphclient = GraphServiceClient;

            if (graphclient != null)
            {
                var groups = graphclient.Me.TransitiveMemberOf.Request().GetAsync().Result;
                var gList = new List<ADGroup>();
                var roles = new List<DirectoryRole>();
                foreach (var g in groups)
                {
                    if (g is Group)
                    {
                        var p = g as Group;
                        if (p.DisplayName.Substring(0, 3) == "250")
                        {
                            gList.Add(new ADGroup { Name = p.DisplayName, Sid = p.SecurityIdentifier, Description = p.Description, DistinguishedName = p.OnPremisesDomainName });
                        }
                    }
                    else
                        roles.Add(g as DirectoryRole);

                }

                return gList;
            }
            return null;
        }

        private async Task<GraphServiceClient> GetGraphClient(string[] scopes)
        {
            try
            {
                string isApim = _httpCnx.HttpContext.Request.Headers["IsAPIM"];
                if (isApim != null && isApim == "True")
                    return null;

                var t = _httpCnx.HttpContext.Request.Headers["Authorization"].ToString().Replace("Bearer ", "");

                JwtSecurityTokenHandler jwtHandler = new JwtSecurityTokenHandler();
                JwtSecurityToken parsedJwt = jwtHandler.ReadToken(t) as JwtSecurityToken;
                //logger.Debug(parsedJwt.ToString(), null);

                var token = await _tokenAcquisition.GetAccessTokenForUserAsync(scopes).ConfigureAwait(false);

                var client = _clientFactory.CreateClient();
                client.BaseAddress = new Uri(graphUrl);
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                GraphServiceClient graphClient = new GraphServiceClient(client)
                {
                    AuthenticationProvider = new DelegateAuthenticationProvider(async (requestMessage) =>
                    {
                        requestMessage.Headers.Authorization = new AuthenticationHeaderValue("bearer", token);
                    })
                };

                graphClient.BaseUrl = graphUrl;
                return graphClient;
            }
            catch (Exception ex)
            {
                if (logger != null)
                    logger.Error(ex.Message, ex);

                throw ex;
            }

        }

        private static string StreamToString(Stream stream)
        {
            stream.Position = 0;
            using (StreamReader reader = new StreamReader(stream, Encoding.UTF8))
            {
                return reader.ReadToEnd();
            }
        }

    }
}