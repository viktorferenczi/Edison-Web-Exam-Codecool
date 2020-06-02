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

        [HttpGet]
        [Route("[action]")]
        public void MakeCarPayed()
        {
            var user = HttpContext.User.Claims.First(c => c.Type == ClaimTypes.Email).Value;
            _userService.MakeCarPayed();
            _userService.CreateTransaction(user);
            _userService.CreateUserActivity(user, "Ordered a car " + DateTime.Now);

        }

        [HttpGet]
        [Route("[action]")]
        public TransactionModel GetTransaction()
        {
           return _userService.GetTransactionForOrder();
        }

        [HttpGet]
        [Route("[action]")]
        public void DeleteCarAfterOrder()
        {
          
            _userService.DeleteCarAfterOrder();
            var user = HttpContext.User.Claims.First(c => c.Type == ClaimTypes.Email).Value;
            _userService.CreateUserActivity(user, "Deleted an unpaid car " + DateTime.Now);
        }
        
    }
}