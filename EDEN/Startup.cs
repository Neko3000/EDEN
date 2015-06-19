using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(EDEN.Startup))]
namespace EDEN
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
