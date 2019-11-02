using System;
using System.Collections.Generic;
using System.Text;

namespace IC_Talent.Database.ApiEntity.Response
{
   public class GetSalesResponse
    {
        public int Id { get; set; }
        public int ProductId { get; set; }

        public int CustomerId { get; set; }

        public int StoreId { get; set; }

        public DateTime DateSold { get; set; }
    }
}
