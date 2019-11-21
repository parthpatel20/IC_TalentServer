using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IC_Talent.Database;
using IC_Talent.Database.ApiEntity.Request;
using IC_Talent.Server.Helpers;
using IC_Talent.Server.RepositoryServices.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace IC_Talent.Server.Controllers
{
    [ApiController]
    public class StoreController : ControllerBase
    {
        private readonly IStore _storeServices;

        public StoreController(IStore storeServices)
        {
            _storeServices = storeServices;
        }

        [HttpGet(ApiRoutes.Store.GetAll)]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _storeServices.GetStoresAsync());
        }

        [HttpGet(ApiRoutes.Store.Get)]
        public async Task<IActionResult> Get([FromRoute] int storeId)
        {

            var store = await _storeServices.GetStoreByIDAsync(storeId);

            if (store != null) return Ok(store);

            return NotFound();
        }


        [HttpPost(ApiRoutes.Store.Create)]
        public async Task<IActionResult> Create([FromBody] CreateStoreRequest postStore)
        {
            if (ModelState.IsValid)
            {
                Store store = new Store
                {
                    Name = postStore.Name,
                    Address = postStore.Address
                };
                var created = await _storeServices.CreateStoreAsync(store);

                if (created != null) return Ok(await _storeServices.GetStoresAsync());

                return NotFound("Data Not Created");
            }

            return ValidationProblem();
        }

        [HttpPut(ApiRoutes.Store.Update)]
        public async Task<IActionResult> Update([FromRoute] int storeId, [FromBody] UpdateStoreRequest updateToStore)
        {
            if (ModelState.IsValid)
            {
                if (updateToStore.Id.Equals(storeId))
                {
                    Store store = new Store
                    {
                        Id = storeId,
                        Name = updateToStore.Name,
                        Address = updateToStore.Address
                    };
                    var updated = await _storeServices.UpdateStoreAsync(store);

                    if (updated != null) return Ok(await _storeServices.GetStoresAsync());
                    return NotFound("Data Not Updated");
                }
                return ValidationProblem("route and data id need to be same");
            }
            return ValidationProblem();

        }

        [HttpDelete(ApiRoutes.Store.Delete)]
        public async Task<IActionResult> Delete([FromRoute] int storeId)
        {
            var deleted = await _storeServices.DeleteStoreAsync(storeId);
            if (deleted) return Ok(await _storeServices.GetStoresAsync());

            return Ok();
        }

    }
}