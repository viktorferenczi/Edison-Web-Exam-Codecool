using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Edison.Domain;
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
        }

    }
}