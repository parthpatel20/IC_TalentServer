using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IC_Talent.Database;
using IC_Talent.Database.ApiEntity.Request;
using IC_Talent.Server.Helpers;
using IC_Talent.Server.RepositoryServices.Interface;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace IC_Talent.Server.Controllers
{
    [ApiController]
    [EnableCors("Policy")]
    public class ProductController : ControllerBase
    {
        private readonly IProduct _productrServices;

        public ProductController(IProduct productrServices)
        {
            _productrServices = productrServices;

        }

        [HttpGet(ApiRoutes.Product.GetAll)]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _productrServices.GetProductsAsync());

        }

        [HttpGet(ApiRoutes.Product.Get)]
        public async Task<IActionResult> Get([FromRoute] int productId)
        {

            var product = await _productrServices.GetProductByIDAsync(productId);

            if (product != null) return Ok(product);

            return NotFound();
        }

        [HttpPost(ApiRoutes.Product.Create)]
        public async Task<IActionResult> Create([FromBody] CreateProductRequest postproduct)
        {
            if (ModelState.IsValid)
            {
                Product product = new Product
                {
                    Name = postproduct.Name,
                    Price = postproduct.Price
                };
                var created = await _productrServices.CreateProductAsync(product);

                if (created != null) return Ok(await _productrServices.GetProductsAsync());

                return NotFound("Data Not Created");
            }

            return ValidationProblem();
        }

        [HttpPut(ApiRoutes.Product.Update)]
        public async Task<IActionResult> Update([FromRoute] int productId, [FromBody] UpdateProductRequest updateToProduct)
        {
            if (ModelState.IsValid)
            {
                if (updateToProduct.Id.Equals(productId))
                {
                    Product product = new Product
                    {
                        Id = productId,
                        Name = updateToProduct.Name,
                        Price = updateToProduct.Price
                    };
                    var updated = await _productrServices.UpdateProductAsync(product);

                    if (updated != null) return Ok(await _productrServices.GetProductsAsync());

                    return NotFound("Data Not Updated");
                }
                return ValidationProblem("route and data id need to be same");
            }
            return ValidationProblem();

        }
        [HttpDelete(ApiRoutes.Product.Delete)]
        public async Task<IActionResult> Delete([FromRoute] int productId)
        {
            var deleted = await _productrServices.DeleteProductAsync(productId);
            if (deleted) return Ok(await _productrServices.GetProductsAsync());

            return Ok();
        }

    }
}