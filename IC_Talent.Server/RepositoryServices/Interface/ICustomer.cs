using IC_Talent.Database;
using IC_Talent.Database.ApiEntity.Response;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace IC_Talent.Server.ReporitoryServices.Interface
{
    public interface ICustomer
    {
        Task<List<GetCustomerResponse>> GetCustomersAsync();

        Task<GetCustomerResponse> GetCustomerByIDAsync(int customerId);
        Task<GetCustomerResponse> CreateCustomerAsync(Customer customer);
        Task<GetCustomerResponse> UpdateCustomerAsync(Customer customerToUpdate);

        Task<bool> DeleteCustomerAsync(int id);

    }
}
