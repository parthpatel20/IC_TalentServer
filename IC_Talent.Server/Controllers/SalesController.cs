using System;
using System.Collections.Generic;
using System.Globalization;
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
    public class SalesController : ControllerBase
    {
        private readonly ISales _salesServices;
        
        public SalesController(ISales salesServices)
        {
            _salesServices = salesServices;
        }

        [HttpGet(ApiRoutes.Sales.GetAll)]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _salesServices.GetSalesAsync());
        }

        [HttpGet(ApiRoutes.Sales.Get)]
        public async Task<IActionResult> Get([FromRoute] int saleId)
        {

            var sale = await _salesServices.GetSalesByIDAsync(saleId);

            if (sale != null) return Ok(sale);

            return NotFound();
        }


        [HttpPost(ApiRoutes.Sales.Create)]
        public async Task<IActionResult> Create([FromBody] CreateSalesRequest postSale)
        {
          if (ModelState.IsValid)
            {
                Sales sale = new Sales
                {
                    ProductId = postSale.ProductId,
                    StoreId = postSale.StoreId,
                    CustomerId = postSale.CustomerId,
                    DateSold = postSale.DateSold
             };
                var created = await _salesServices.CreateSalesAsync(sale);

                if (created) return Ok(await _salesServices.GetSalesAsync());

                return NotFound("Data Not Created");
            }

            return ValidationProblem();
        }

        [HttpPut(ApiRoutes.Sales.Update)]
        public async Task<IActionResult> Update([FromRoute] int saleId, [FromBody] UpdateSalesRequest updateToSale)
        {
            if (ModelState.IsValid)
            {
                if (updateToSale.Id.Equals(saleId))
                {
                    var updated = await _salesServices.UpdateSalesAsync(updateToSale);

                    if (updated) return Ok(await _salesServices.GetSalesAsync());

                    return NotFound("Data Not Updated");
                }
                return ValidationProblem("route and data id need to be same");
            }
            return ValidationProblem();
        }
    

        [HttpDelete(ApiRoutes.Sales.Delete)]
        public async Task<IActionResult> Delete([FromRoute] int saleId)
        {
            var deleted = await _salesServices.DeleteSalesAsync(saleId);
            if (deleted) return Ok(await _salesServices.GetSalesAsync());

            return NotFound();
        }
        
    }
}