using IC_Talent.Database;
using IC_Talent.Database.ApiEntity.Response;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace IC_Talent.Server.RepositoryServices.Interface
{
    public interface ISales
    {

        Task<List<GetSalesResponse>> GetSalesAsync();

        Task<GetSalesResponse> GetSalesByIDAsync(int saleId);
        Task<GetSalesResponse> CreateSalesAsync(Sales postSale);

        Task<GetSalesResponse> UpdateSalesAsync(Sales saleToUpdate);
        Task<bool> DeleteSalesAsync(int saleId);

    }
}
