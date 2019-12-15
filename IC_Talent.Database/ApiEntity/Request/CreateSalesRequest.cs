using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace IC_Talent.Database.ApiEntity.Request
{
    public class CreateSalesRequest
    {
        [Required]
        public int ProductId { get; set; }
        [Required]
        public int CustomerId { get; set; }
        [Required]
        public int StoreId { get; set; } 
        public DateTime DateSold { get; set; }
    }
}
