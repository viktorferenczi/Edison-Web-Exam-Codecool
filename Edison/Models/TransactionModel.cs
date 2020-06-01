using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Edison.Models
{
    public class TransactionModel
    {
        public int TransID { get; set; }
        public int CarID { get; set; }
        public string CarOwner { get; set; }
        public string OrderDate { get; set; }

        public TransactionModel () { }

        public TransactionModel(int transid, int carid, string carowner, string date) 
        {
            TransID = transid;
            CarID = carid;
            CarOwner = carowner;
            OrderDate = date;
        }
    }
}
