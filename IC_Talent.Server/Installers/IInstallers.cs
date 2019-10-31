using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IC_Talent.Server.Installers
{
    public interface IInstallers
    {
        void InstallService(IServiceCollection services, IConfiguration configuration);
    }
}
