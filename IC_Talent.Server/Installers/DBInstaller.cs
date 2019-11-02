using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IC_Talent.Server.ReporitoryServices.Interface;
using IC_Talent.Server.RepositoryServices.Interface;
using IC_Talent.Server.RepositoryServices.Services;
using IC_Talent.Services.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace IC_Talent.Server.Installers
{
    public class DBInstaller : IInstallers
    {

        public void InstallService(IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<DataContext>(options => options.UseSqlServer(configuration.GetConnectionString("LocalConnection")));

            services.AddDefaultIdentity<IdentityUser>(options => options.SignIn.RequireConfirmedAccount = true)
                .AddEntityFrameworkStores<DataContext>();

            services.AddScoped<ICustomer, CustomerServices>();
            services.AddScoped<IStore, StoreServices>();
            services.AddScoped<IProduct, ProductServices>();
            services.AddScoped<ISales, SalesServices>();
        }
    }
}
