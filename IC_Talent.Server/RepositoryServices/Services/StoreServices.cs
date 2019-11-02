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
    public class StoreServices : IStore
    {
        private readonly DataContext _dataContext;


        public StoreServices(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<GetStoreResponse> CreateStoreAsync(Store store)
        {
            await _dataContext.Stores.AddAsync(store);
            var created = await _dataContext.SaveChangesAsync();
            if (created > 0) return ConvertToStoreResponse(store);
            return null;
        }

        private GetStoreResponse ConvertToStoreResponse(Store store)
        {
            GetStoreResponse convertToResponseStore = new GetStoreResponse()
            {
                Id = store.Id,
                Name = store.Name,
                Address = store.Address
            };
            return convertToResponseStore;
        }

        public  async Task<bool> DeleteStoreAsync(int id)
        {
            var store = await _dataContext.Stores.SingleOrDefaultAsync(x => x.Id == id);
            _dataContext.Stores.Remove(store);
            var deleted = await _dataContext.SaveChangesAsync();
            return deleted > 0;

        }

        public async Task<GetStoreResponse> GetStoreByIDAsync(int storeId)
        {
            return ConvertToStoreResponse(await _dataContext.Stores.SingleOrDefaultAsync(x => x.Id == storeId));
        }

        public async Task<List<GetStoreResponse>> GetStoresAsync()
        {
            var stores = await _dataContext.Stores.ToListAsync();

            List<GetStoreResponse> storeList = new List<GetStoreResponse>();

            foreach (var store in stores)
            {
                storeList.Add(ConvertToStoreResponse(store));
            }
            return storeList;
        }

        public async Task<GetStoreResponse> UpdateStoreAsync(Store storeToUpdate)
        {
            var updatedStore = _dataContext.Stores.Update(storeToUpdate);
            if (updatedStore != null)
            {
                var updated = await _dataContext.SaveChangesAsync();
                if (updated > 0)
                {
                    var customer = await GetStoreByIDAsync(storeToUpdate.Id);
                    if (customer != null) return customer;
                }
            }
            return null;
        }

    }
}
