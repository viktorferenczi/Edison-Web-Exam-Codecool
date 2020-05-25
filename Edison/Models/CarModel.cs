using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Edison.Models
{
    public class CarModel
    {
        public string ModelType { get; set; }
        public string ModelColor { get; set; }
        public string ModelWheel { get; set; }
        public string IsPayed { get; set; }

        public CarModel() { }

        public CarModel(string modeltype, string modelcolor, string modelwheel, string ispayed)
        {
            ModelType = modeltype;
            ModelColor = modelcolor;
            ModelWheel = modelwheel;
            IsPayed = ispayed;
        }
    }
}
