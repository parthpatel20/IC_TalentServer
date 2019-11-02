using IC_Talent.Database;
using IC_Talent.Database.ApiEntity.Response;
using IC_Talent.Server;
using IC_Talent.Server.RepositoryServices.Interface;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace IC_Talent.Services.Services
{
    public class SalesServices : ISales
    {
        private readonly DataContext _dataContext;

        public SalesServices(DataContext dataContext)
        {
            _dataContext = dataContext;
        }


        public async Task<GetSalesResponse> CreateSalesAsync(Sales postSale)
        {
            await _dataContext.Sales.AddAsync(postSale);
            var created = await _dataContext.SaveChangesAsync();
            if (created > 0) return ConvertToSalesResponse(postSale);
            return null;
        }

        private GetSalesResponse ConvertToSalesResponse(Sales postSale)
        {
            GetSalesResponse convertToResponseSales = new GetSalesResponse()
            {
                Id = postSale.Id,
                ProductId = postSale.ProductId,
                StoreId = postSale.StoreId,
                CustomerId = postSale.CustomerId,
                DateSold = postSale.DateSold
                
            };
            return convertToResponseSales;
        }

        public  async Task<bool> DeleteSalesAsync(int saleId)
        {
            var sale = await _dataContext.Sales.SingleOrDefaultAsync(x => x.Id == saleId);
            _dataContext.Sales.Remove(sale);
            var deleted = await _dataContext.SaveChangesAsync();
            return deleted > 0;

        }

        public async Task<List<GetSalesResponse>> GetSalesAsync()
        {
            var sales = await _dataContext.Sales.ToListAsync();

            List<GetSalesResponse> salesList = new List<GetSalesResponse>();

            foreach (var sale in sales)
            {
                salesList.Add(ConvertToSalesResponse(sale));
             }

            return salesList;
        }
        public async Task<GetSalesResponse> GetSalesByIDAsync(int saleId)
        {
            return ConvertToSalesResponse(await _dataContext.Sales.SingleOrDefaultAsync(x => x.Id == saleId));
        }

        public async Task<GetSalesResponse> UpdateSalesAsync(Sales saleToUpdate)
        {
            var updatedSale = _dataContext.Sales.Update(saleToUpdate);
            if (updatedSale != null)
            {
                var updated = await _dataContext.SaveChangesAsync();
                if (updated > 0)
                {
                    var sales = await GetSalesByIDAsync(saleToUpdate.Id);
                    if (sales != null) return sales;
                }
            }
            return null;
        }
    }
}
