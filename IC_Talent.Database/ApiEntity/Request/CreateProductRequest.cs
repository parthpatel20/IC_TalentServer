using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace IC_Talent.Database.ApiEntity.Request
{
    public class CreateProductRequest
    {
        [Required]
        public string Name { get; set; }
       
        [Required]
        public decimal Price { get; set; }
        
    }
}
