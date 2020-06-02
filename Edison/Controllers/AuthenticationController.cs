using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Edison.Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Edison.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthenticationController : Controller
    {
        private readonly DataBaseHandler _userService;

        public AuthenticationController(DataBaseHandler userService)
        {
            _userService = userService;
        }

        [HttpGet]
        [Route("[action]")]
        public string CheckForCookie()
        {
            var user = HttpContext.User.Claims.First(c => c.Type == ClaimTypes.Email).Value;
            if (user != null)
            {
                if (_userService.IsAdmin(user))
                {
                    return "Admin";
                }
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