using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IC_Talent.Server.Helpers
{
    public static class ApiRoutes
    {
        public const string Root = "api";
        public const string RootForCustomerModification = Root + "/customer/{customerId}";
        public const string RootForProductModification = Root + "/product/{productId}";
        public const string RootForStoreModification = Root + "/store/{storeId}";
        public const string RootForSalesModification = Root + "/Sale/{saleId}";


        public static class Customer
        {
            public const string GetAll = Root + "/customers";

            public const string Update = RootForCustomerModification;

            public const string Delete = RootForCustomerModification;

            public const string Get = RootForCustomerModification;

            public const string Create = Root + "/customer";

        }

        public static class Product
        {
            public const string GetAll = Root + "/products";

            public const string Update = RootForProductModification;

            public const string Delete = RootForProductModification;

            public const string Get = RootForProductModification;

            public const string Create = Root + "/product";

        }

        public static class Store
        {
            public const string GetAll = Root + "/stores";

            public const string Update = RootForStoreModification;

            public const string Delete = RootForStoreModification;

            public const string Get = RootForStoreModification;

            public const string Create = Root + "/store";
        }

        public static class Sales
        {
            public const string GetAll = Root + "/sales";

            public const string Update = RootForSalesModification;

            public const string Delete = RootForSalesModification;

            public const string Get = RootForSalesModification;

            public const string Create = Root + "/sale";

        }


    }
}
