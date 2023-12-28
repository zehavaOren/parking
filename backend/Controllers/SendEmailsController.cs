using backend.BL;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/SendEmail")]
    public class SendEmailsController : ControllerBase
    {

        [HttpPost("SendEmail")]
        public ActionResult<object> SendEmail(Message message)
        {
            try
            {
               var m = message;
                return Ok(m);
            }
            catch (System.Exception)
            {
                return BadRequest();
            }

        }

    }
   
}
