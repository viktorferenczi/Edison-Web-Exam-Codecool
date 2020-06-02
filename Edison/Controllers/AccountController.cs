using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Edison.Domain;

namespace Edison.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AccountController : Controller
    {
        private readonly DataBaseHandler _userService;

        public AccountController(DataBaseHandler userService)
        {
            _userService = userService;
        }

        [HttpPost]
        [Route("[action]")]
        public void Register([FromForm]string username, [FromForm]string password)
        {
            _userService.Register(username, password, "user");
            _userService.CreateUserActivity(username, "User registered " + DateTime.Now);
           
        }

        [HttpPost]
        [Route("[action]")]
        public string DeleteUser([FromForm]string user)
        {
            if (_userService.DeleteUser(user))
            {
                var username = HttpContext.User.Claims.First(c => c.Type == ClaimTypes.Email).Value;
                _userService.CreateUserActivity(username, "Admin deleted a customer " + DateTime.Now);
                return "Deleted";
            }
            return "Error";
           

        }
        
        [HttpGet]
        [Route("[action]")]
        public async void Logout()
        {
            var user = HttpContext.User.Claims.First(c => c.Type == ClaimTypes.Email).Value;
            _userService.CreateUserActivity(user, "User logged out " + DateTime.Now);
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
        }

        [HttpPost]
        [Route("[action]")]
        public async Task<string> LoginAsync([FromForm]string username, [FromForm]string password)
        {
            var claims = new List<Claim>
                {
                new Claim(ClaimTypes.Email, username)
                };

            var claimsIdentity = new ClaimsIdentity(
                claims, CookieAuthenticationDefaults.AuthenticationScheme);

            var authProperties = new AuthenticationProperties
            {
                //AllowRefresh = <bool>,
                // Refreshing the authentication session should be allowed.

                //ExpiresUtc = DateTimeOffset.UtcNow.AddMinutes(10),
                // The time at which the authentication ticket expires. A 
                // value set here overrides the ExpireTimeSpan option of 
                // CookieAuthenticationOptions set with AddCookie.

                //IsPersistent = true,
                // Whether the authentication session is persisted across 
                // multiple requests. When used with cookies, controls
                // whether the cookie's lifetime is absolute (matching the
                // lifetime of the authentication ticket) or session-based.

                //IssuedUtc = <DateTimeOffset>,
                // The time at which the authentication ticket was issued.

                //RedirectUri = <string>
                // The full path or absolute URI to be used as an http 
                // redirect response value.
            };

            await HttpContext.SignInAsync(
                CookieAuthenticationDefaults.AuthenticationScheme,
                new ClaimsPrincipal(claimsIdentity),
                authProperties);



            if (_userService.Login(username, password))
            {
               

                if (_userService.IsAdmin(username))
                {
                    _userService.CreateUserActivity(username, "User logged in " + DateTime.Now);
                    // User admin
                    Console.WriteLine("User is admin");
                    return "admin";
                }
                // User registered
                _userService.CreateUserActivity(username, "User logged in " + DateTime.Now);
                return username;
            }
            else
            {
                // Guest
                throw new System.Web.Http.HttpResponseException(HttpStatusCode.Unauthorized);
            }
        }
    }
}
