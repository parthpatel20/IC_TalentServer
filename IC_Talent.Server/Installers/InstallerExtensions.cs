using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IC_Talent.Server.Installers
{
    public static class InstallerExtensions
    {
        public static void InstallServiceAssembelies(this IServiceCollection services, IConfiguration configuration)
        {

            var installers = typeof(Startup).Assembly.ExportedTypes.Where(x => typeof(IInstallers).IsAssignableFrom(x) && !x.IsAbstract)
                .Select(Activator.CreateInstance).Cast<IInstallers>().ToList();
            installers.ForEach(installer => installer.InstallService(services, configuration));
        }
    }
}
