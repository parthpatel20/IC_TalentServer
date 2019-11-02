using IC_Talent.Database;
using IC_Talent.Database.ApiEntity.Response;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace IC_Talent.Server.RepositoryServices.Interface
{
    public interface IProduct
    {

        Task<List<GetProductResponse>> GetProductsAsync();
        Task<GetProductResponse> GetProductByIDAsync(int productId);
        Task<GetProductResponse> CreateProductAsync(Product product);
        Task<GetProductResponse> UpdateProductAsync(Product productToUpdate);
        Task<bool> DeleteProductAsync(int id);

    }
}
