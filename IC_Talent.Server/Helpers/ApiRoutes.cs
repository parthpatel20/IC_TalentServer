using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IC_Talent.Server.Helpers
{
    public static  class ApiRoutes
    {
        public const string Root = "api";
        public const string RootForModification = Root + "/customer/{customerId}";



        public static class Customer
        {
            public const string GetAll = Root + "/customers";

            public const string Update = RootForModification;

            public const string Delete = RootForModification;

            public const string Get = RootForModification;

            public const string Create = Root + "/customer";

        }

    }
}
