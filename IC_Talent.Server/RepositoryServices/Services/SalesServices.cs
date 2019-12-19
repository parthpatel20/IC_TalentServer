using IC_Talent.Database;
using IC_Talent.Database.ApiEntity.Request;
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
       public async Task<bool> CreateSalesAsync(Sales postSale)
        {
            await _dataContext.Sales.AddAsync(postSale);
            var created = await _dataContext.SaveChangesAsync();
            if (created > 0) return true;
            return false;
        }

        private GetSalesResponse ConvertToSalesResponse(Sales postSale)
        {
            GetSalesResponse convertToResponseSales = new GetSalesResponse()
            {
                Id = postSale.Id,
                ProductId = postSale.ProductId,
                ProductName = postSale.Product.Name,
                StoreId = postSale.StoreId,
                StoreName = postSale.Store.Name,
                CustomerId = postSale.CustomerId,
                CustomerName = postSale.Customer.Name,
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
            var sales = await _dataContext.Sales.Include("Customer").Include("Product").Include("Store").ToListAsync();
            
            List<GetSalesResponse> salesList = new List<GetSalesResponse>();

            foreach (var sale in sales)
            {
                salesList.Add(ConvertToSalesResponse(sale));
             }

            return salesList;
        }
        public async Task<GetSalesResponse> GetSalesByIDAsync(int saleId)
        {
            return ConvertToSalesResponse(await _dataContext.Sales.Include("Customer").Include("Product").Include("Store").SingleOrDefaultAsync(x => x.Id == saleId));
        }

        public async Task<bool> UpdateSalesAsync(UpdateSalesRequest saleToUpdate)
        {
            var dt = DateTime.Parse(saleToUpdate.DateSold);
            var dataNeedToUpdate = await _dataContext.Sales.SingleOrDefaultAsync(x => x.Id == saleToUpdate.Id);
            if (dataNeedToUpdate != null)
            {
                dataNeedToUpdate.ProductId = saleToUpdate.ProductId;
                dataNeedToUpdate.StoreId = saleToUpdate.StoreId;
                dataNeedToUpdate.CustomerId = saleToUpdate.CustomerId;
                dataNeedToUpdate.DateSold = dt;
                    _dataContext.Entry(dataNeedToUpdate).State =  EntityState.Modified;
                    var updated = await _dataContext.SaveChangesAsync();
                    if (updated > 0)
                    {
                        var sales = await GetSalesByIDAsync(saleToUpdate.Id);
                        if (sales != null) return true;
                    }
                
                return false;
            }
            return false;
        }
    }
}
