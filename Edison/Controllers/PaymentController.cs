using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Edison.Models;
using Edison.Domain;
using System.Security.Claims;

namespace Edison.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PaymentController : Controller
    {
        private readonly DataBaseHandler _userService;

        public PaymentController(DataBaseHandler userService)
        {
            _userService = userService;
        }


        [HttpPost]
        [Route("[action]")]
        public CarModel GetShoppingCart([FromForm] string username)
        {
            var user = HttpContext.User.Claims.First(c => c.Type == ClaimTypes.Email).Value;
            CarModel car = _userService.GetModelForUser(user);
            return car;
        }
    }
}