using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Edison.Domain;
using Edison.Models;
using System.Security.Claims;

namespace Edison.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AdminController : Controller
    {
        private readonly DataBaseHandler _userService;

        public AdminController(DataBaseHandler userService)
        {
            _userService = userService;
        }

        [HttpGet]
        [Route("[action]")]
        public List<UserActivityModel> ShowUserActivities()
        {
            var user = HttpContext.User.Claims.First(c => c.Type == ClaimTypes.Email).Value;
            _userService.CreateUserActivity(user, "Admin requested user activities " + DateTime.Now);
            return _userService.GetAllUserActivity();
        }

    }
}