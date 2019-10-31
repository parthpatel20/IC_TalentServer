using IC_Talent.Database;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace IC_Talent.Services.Interface
{
    public interface ISales
    {

        Task<List<Sales>> GetSalesAsync();

        Task<Sales> GetSalesByIDAsync(int SaleId);
        Task<bool> CreateSalesAsync(Sales Sale);
        Task<bool> UpdateSalesAsync(Sales SaleToUpdate);

        Task<bool> DeleteSalesAsync(int id);

    }
}
