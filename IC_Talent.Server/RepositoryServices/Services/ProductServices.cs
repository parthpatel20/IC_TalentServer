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
    public class ProductServices : IProduct
    {
        private readonly DataContext _dataContext;

        public ProductServices(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<GetProductResponse> CreateProductAsync(Product product)
        {
            await _dataContext.Products.AddAsync(product);
            var created = await _dataContext.SaveChangesAsync();
            if (created > 0) return ConvertToProductResponse(product);
            return null;
        }

        private GetProductResponse ConvertToProductResponse(Product product)
        {
            GetProductResponse convertToResponseProduct = new GetProductResponse()
            {
                Id = product.Id,
                Name = product.Name,
                Price = product.Price
            };
            return convertToResponseProduct;
        }

        public async Task<bool> DeleteProductAsync(int id)
        {
            var product = await _dataContext.Products.SingleOrDefaultAsync(x => x.Id == id);
            _dataContext.Products.Remove(product);
            var deleted = await _dataContext.SaveChangesAsync();
            return deleted > 0;

        }

        public async Task<GetProductResponse> GetProductByIDAsync(int productId)
        {
            return ConvertToProductResponse(await _dataContext.Products.SingleOrDefaultAsync(x => x.Id == productId));
        }

        public async Task<List<GetProductResponse>> GetProductsAsync()
        {
            var products = await _dataContext.Products.ToListAsync();

            List<GetProductResponse> productList = new List<GetProductResponse>();

            foreach (var product in products)
            {
                productList.Add(ConvertToProductResponse(product));
            }
            return productList;
        }

        public async Task<GetProductResponse> UpdateProductAsync(Product productToUpdate)
        {
            var updatedProduct = _dataContext.Products.Update(productToUpdate);
            if (updatedProduct != null)
            {
                var updated = await _dataContext.SaveChangesAsync();
                if (updated > 0)
                {
                    var product = await GetProductByIDAsync(productToUpdate.Id);
                    if (product != null) return product;
                }
            }

            return null;
        }
    }
}
