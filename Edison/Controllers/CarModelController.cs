using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Edison.Domain;
using Edison.Models;
using Microsoft.AspNetCore.Mvc;

namespace Edison.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CarModelController : Controller
    {
        private readonly DataBaseHandler _userService;

        public CarModelController(DataBaseHandler userService)
        {
            _userService = userService;
        }

        [HttpPost]
        [Route("[action]")]
        public void AddCarToUser([FromForm]string username, [FromForm]string carmodel, [FromForm]string carcolor, [FromForm]string carwheel)
        {
            
            Console.WriteLine("CarModelController: " + username +" " + carmodel + " " + carcolor + " " + carwheel);
            _userService.AddModelToUser(username, carmodel, carcolor, carwheel);
            _userService.CreateUserActivity(username, "Registered a car " + DateTime.Now);
        }

        [HttpGet]
        [Route("[action]")]
        public List<CarModel> GetUserModels()
        {
           var user = HttpContext.User.Claims.First(c => c.Type == ClaimTypes.Email).Value;
           _userService.CreateUserActivity(user, "User listed the models" + DateTime.Now);
           return  _userService.GetAllUserModels(user);
        }
    }
}