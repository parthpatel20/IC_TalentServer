using IC_Talent.Database;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace IC_Talent.Services.Interface
{
    public interface ICustomer
    {
        Task<List<Customer>> GetCustomersAsync();

        Task<Customer> GetCustomerByIDAsync(int CustomerId);
        Task<bool> CreateCustomerdAsync(Customer Customer);
        Task<bool> UpdateCustomerAsync(Customer CustomerToUpdate);

        Task<bool> DeleteCustomerAsync(int id);

    }
}
