using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace IC_Talent.Database.ApiEntity.Request
{
    public class UpdateSalesRequest
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public int ProductId { get; set; }
        [Required]
        public int CustomerId { get; set; }
        [Required]
        public int StoreId { get; set; }

        public DateTime DateSold { get; set; }
    }
    
}
