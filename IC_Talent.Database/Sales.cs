using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace IC_Talent.Database
{
    public class Sales
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        public int ProductId { get; set; }
        [Required]
        public int CustomerId { get; set; }
        [Required]
        public int StoreId { get; set; }
        [Required]
        public DateTime DateSold { get; set; }

        public virtual Store Store { get; set; }
        public virtual Customer Customer { get; set; }
        public virtual Product Product { get; set; }

    }
}
