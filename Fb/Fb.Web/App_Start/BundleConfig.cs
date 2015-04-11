using System.Web;
using System.Web.Optimization;

namespace Fb.Web
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(
                new ScriptBundle("~/bundles/js/lib").Include(
                    "~/Scripts/jquery-{version}.js",
                    "~/Scripts/bootstrap.min.js",
                    "~/Scripts/angular.js",
                    "~/Scripts/angular-cookies.js",
                    "~/Scripts/angular-ui-router.js",
                    "~/Scripts/angular-animate.js",
                    "~/Scripts/loading-bar.js",
                    "~/Scripts/toaster.js",
                    "~/Scripts/angular-ui/ui-bootstrap-tpls.js"));

            bundles.Add(
                new ScriptBundle("~/bundles/js/spa")
                    .Include("~/App/app.js")
                    .IncludeDirectory("~/App/interceptors", "*.js", true)
                    .IncludeDirectory("~/App/directives", "*.js", true)
                    .IncludeDirectory("~/App/services", "*.js", true)
                    .IncludeDirectory("~/App/controllers", "*.js", true)
                    .IncludeDirectory("~/App/filters", "*.js", true)
                    .IncludeDirectory("~/App/modals", "*.js", true));

            bundles.Add(
               new StyleBundle("~/bundles/css/site").Include(
                   "~/Content/bootstrap.css",
                   "~/Content/bootstrap-yeti-theme.css",
                   "~/Content/Site.css",
                   "~/Content/toaster.css",
                   "~/Content/loading-bar.css"));

            BundleTable.EnableOptimizations = false;
        }
    }
}
