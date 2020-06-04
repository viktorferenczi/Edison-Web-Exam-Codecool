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

        [HttpPost]
        [Route("[action]")]
        public string DeleteCarForUser([FromForm]string car_id)
        {
            var user = HttpContext.User.Claims.First(c => c.Type == ClaimTypes.Email).Value;

            string[] input = car_id.Split(':');
            int carID = Convert.ToInt32(input[1]);

            var payment_status = _userService.GetPaymentSatusForCar(carID);

            if (payment_status == "unpaid")
            {
                _userService.DeleteUnpaidCarForUser(carID);
                _userService.CreateUserActivity(user, "User deleting unpaid car " + DateTime.Now);
                return "unpaid";
            }
            else if (payment_status == "paid")
            {
                _userService.DeletePaidCarForUser(carID);
                _userService.CreateUserActivity(user, "User deleting a paid car " + DateTime.Now);
                return "paid";
            }
            throw new Exception("asd");
        }


        [HttpPost]
        [Route("[action]")]
        public void UpdateCarForUser([FromForm]string car_id, [FromForm]string car_model, [FromForm]string car_color, [FromForm]string car_wheel)
        {
            var user = HttpContext.User.Claims.First(c => c.Type == ClaimTypes.Email).Value;

            string[] input = car_id.Split(':');
            int carID = Convert.ToInt32(input[1]);

            _userService.UpdateCar(carID, car_model, car_color, car_wheel);
        }


        [HttpPost]
        [Route("[action]")]
        public CarModel GetCarForUser([FromForm]string car_id)
        {
            string[] input = car_id.Split(':');
            int carID = Convert.ToInt32(input[1]);

            return _userService.GetModelForUser(carID);
        }


    }
}