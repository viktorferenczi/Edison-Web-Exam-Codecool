using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Edison.Models
{
    public class UserActivityModel
    {
        public string UserID { get; set; }
        public string Activity { get; set; }

        public UserActivityModel() { }

        public UserActivityModel(string userid, string activity)
        {
            UserID = userid;
            Activity = activity;
        }
    }
}
