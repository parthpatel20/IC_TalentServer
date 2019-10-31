using IC_Talent.Database;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace IC_Talent.Server.RepositoryServices.Interface
{
    public interface IProduct
    {

        Task<List<Product>> GetProductsAsync();

        Task<Product> GetProductByIDAsync(int SaleId);
        Task<bool> CreateProductAsync(Product Sale);
        Task<bool> UpdateProductAsync(Product SaleToUpdate);

        Task<bool> DeleteProductAsync(int id);

    }
}
