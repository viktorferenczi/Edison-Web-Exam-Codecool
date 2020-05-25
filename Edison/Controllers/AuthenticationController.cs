using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Edison.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthenticationController : Controller
    {
        [HttpGet]
        [Route("[action]")]
        public string CheckForCookie()
        {
            var user = HttpContext.User.Claims.First(c => c.Type == ClaimTypes.Email).Value;
            if (user != null)
            {
                return user.ToString();
            }
            return "";
        }

        [Authorize]
        [HttpGet]
        [Route("[action]")]
        public void CheckForAuth()
        {

        }


    }
}