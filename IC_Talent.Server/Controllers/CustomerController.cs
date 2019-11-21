using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IC_Talent.Database;
using IC_Talent.Database.ApiEntity.Request;
using IC_Talent.Database.APIEntity.Request;
using IC_Talent.Server.Helpers;
using IC_Talent.Server.ReporitoryServices.Interface;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace IC_Talent.Server.Controllers
{
    [ApiController]
    [EnableCors("Policy")]
    public class CustomerController : ControllerBase
    {
        private readonly ICustomer _customerServices;
        
        public CustomerController(ICustomer customerServices)
        {
            _customerServices = customerServices;

        }

    
        [HttpGet(ApiRoutes.Customer.GetAll)]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _customerServices.GetCustomersAsync());

        }

        [HttpGet(ApiRoutes.Customer.Get)]
        public async Task<IActionResult> Get([FromRoute] int customerId) 
        {

            var customer = await _customerServices.GetCustomerByIDAsync(customerId);
            
            if(customer != null) return Ok(customer);

            return NotFound();
        }

        [HttpPost(ApiRoutes.Customer.Create)]
        public async Task<IActionResult> Create([FromBody] CreateCustomerRequest postCustomer)
        {
            if (ModelState.IsValid)
            {
                Customer customer = new Customer
                {
                    Name = postCustomer.Name,
                    Address = postCustomer.Address
                };
                var created = await _customerServices.CreateCustomerAsync(customer);


                if (created != null) return Ok(await _customerServices.GetCustomersAsync() );

                return NotFound("Data Not Created");
            }

            return ValidationProblem();
        }

        [HttpPut(ApiRoutes.Customer.Update)]
        public async Task<IActionResult> Update([FromRoute] int customerId,[FromBody] UpdateCustomerRequest updateToCustomer)
        {
            if (ModelState.IsValid)
            {
                if (updateToCustomer.Id.Equals(customerId))
                {
                    Customer customer = new Customer
                    {
                        Id = customerId,
                        Name = updateToCustomer.Name,
                        Address = updateToCustomer.Address
                    };
                    var updated = await _customerServices.UpdateCustomerAsync(customer);

                    if (updated != null) return Ok(await _customerServices.GetCustomersAsync());
                    return NotFound("Data Not Updated");
                }
                return ValidationProblem("route and data id need to be same");
            }
        return ValidationProblem(); 
         
        }
        [HttpDelete(ApiRoutes.Customer.Delete)]
        public async Task<IActionResult> Delete([FromRoute] int customerId)
        {
            var deleted =await  _customerServices.DeleteCustomerAsync(customerId);
            if (deleted) return Ok(await _customerServices.GetCustomersAsync());
            return NotFound("Data Not Deleted");
        } 
    }
}