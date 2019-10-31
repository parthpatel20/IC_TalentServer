using IC_Talent.Database;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace IC_Talent.Server.RepositoryServices.Interface
{
   public interface IStore
    {
        Task<List<Store>> GetStoresAsync();

        Task<Store> GetStoreByIDAsync(int storeId);
        Task<bool> CreateStoreAsync(Store store);
        Task<bool> UpdateStoreAsync(Store storeToUpdate);

        Task<bool> DeleteStoreAsync(int id);


    }
}
