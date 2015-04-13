namespace Fb.Data
{
    using Microsoft.AspNet.Identity.EntityFramework;
    using Models;

    public interface IFbData
    {
        IRepository<LikePost> Likes { get; }

        IRepository<ApplicationUser> Users { get; }

        IRepository<IdentityRole> UserRoles { get; }

        IRepository<Post> Posts { get; }

        IRepository<Town> Towns { get; }

        int SaveChanges();
    }
}
