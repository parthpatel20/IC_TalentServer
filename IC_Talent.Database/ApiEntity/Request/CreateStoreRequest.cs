using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace IC_Talent.Database.ApiEntity.Request
{
    public class CreateStoreRequest
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Address { get; set; }

    }

}
