using IC_Talent.Database;
using IC_Talent.Database.ApiEntity.Response;
using IC_Talent.Server.ReporitoryServices.Interface;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace IC_Talent.Server.RepositoryServices.Services
{
    public class CustomerServices : ICustomer
    {
        private readonly DataContext _dataContext;
        

        public CustomerServices(DataContext dataContext)
        {
            _dataContext = dataContext;
        }
        public async Task<GetCustomerResponse> CreateCustomerAsync(Customer customer)
        {
            await _dataContext.Customers.AddAsync(customer);
            var created = await _dataContext.SaveChangesAsync();
            if (created > 0) return convertToCustomerResponse( customer);
            return null ;
        }

        public async Task<bool> DeleteCustomerAsync(int id)
        {
            var customer = await _dataContext.Customers.SingleOrDefaultAsync(x => x.Id == id);
            _dataContext.Customers.Remove(customer);
            var deleted = await _dataContext.SaveChangesAsync();
            return deleted > 0;
            
        }

        public async Task<GetCustomerResponse> GetCustomerByIDAsync(int customerId)
        {
           return convertToCustomerResponse( await _dataContext.Customers.SingleOrDefaultAsync(x => x.Id == customerId));            
        }

        public async Task<List<GetCustomerResponse>> GetCustomersAsync()
        {
            var customers = await _dataContext.Customers.ToListAsync();

            List<GetCustomerResponse> customerList = new List<GetCustomerResponse>();

            foreach(var customer in customers)
            {
                customerList.Add(convertToCustomerResponse(customer));
            }
            return customerList;
        }

        public async Task<GetCustomerResponse> UpdateCustomerAsync(Customer customerToUpdate)
        {
            var updatedCustomer = _dataContext.Customers.Update(customerToUpdate);
            if (updatedCustomer != null)
            {
                var updated = await _dataContext.SaveChangesAsync();
                if (updated > 0)
                {
                    var customer = await GetCustomerByIDAsync(customerToUpdate.Id);
                    if (customer != null) return customer;
                }
            }
            
            return null;
        }

        private GetCustomerResponse convertToCustomerResponse(Customer customer)
        {
            GetCustomerResponse convertToResponseCustomer = new GetCustomerResponse()
            {
                Id = customer.Id,
                Name = customer.Name,
                Address = customer.Address
            };
            return convertToResponseCustomer;
        }
    }
}
