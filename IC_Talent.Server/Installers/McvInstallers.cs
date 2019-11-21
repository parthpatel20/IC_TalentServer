using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace IC_Talent.Server.Installers
{
    public class McvInstallers : IInstallers
    {
        public void InstallService(IServiceCollection services, IConfiguration configuration)
        {

            services.AddControllers();
            services.AddCors(p => p.AddPolicy("Policy", builder =>
            {
                builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();

            }));

        }
    }
}
