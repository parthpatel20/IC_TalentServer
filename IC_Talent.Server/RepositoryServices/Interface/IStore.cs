using IC_Talent.Database;
using IC_Talent.Database.ApiEntity.Response;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace IC_Talent.Server.RepositoryServices.Interface
{
   public interface IStore
    {
        Task<List<GetStoreResponse>> GetStoresAsync();

        Task<GetStoreResponse> GetStoreByIDAsync(int storeId);
        Task<GetStoreResponse> CreateStoreAsync(Store store);
        Task<GetStoreResponse> UpdateStoreAsync(Store storeToUpdate);

        Task<bool> DeleteStoreAsync(int id);


    }
}
