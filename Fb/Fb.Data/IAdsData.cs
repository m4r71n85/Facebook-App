namespace Fb.Data
{
    using Microsoft.AspNet.Identity.EntityFramework;
    using Models;

    public interface IAdsData
    {
        IRepository<ApplicationUser> Users { get; }

        IRepository<IdentityRole> UserRoles { get; }

        IRepository<Advertisement> Ads { get; }

        IRepository<Town> Towns { get; }

        IRepository<Category> Categories { get; }

        int SaveChanges();
    }
}
