namespace Fb.Data
{
    using System;
    using System.Collections.Generic;
    using System.Data.Entity;
    using Microsoft.AspNet.Identity.EntityFramework;
    using Models;

    public class FbData : IFbData
    {
        private readonly DbContext _context;

        private readonly IDictionary<Type, object> _repositories;

        public FbData()
            : this(new ApplicationDbContext())
        {
        }

        public FbData(DbContext context)
        {
            _context = context;
            _repositories = new Dictionary<Type, object>();
        }

        public IRepository<ApplicationUser> Users
        {
            get
            {
                return GetRepository<ApplicationUser>();
            }
        }

        public IRepository<IdentityRole> UserRoles
        {
            get
            {
                return GetRepository<IdentityRole>();
            }
        }

        public IRepository<LikePost> Likes
        {
            get
            {
                return GetRepository<LikePost>();
            }
        }

        public IRepository<Post> Posts
        {
            get
            {
                return GetRepository<Post>();
            }
        }

        public IRepository<Town> Towns
        {
            get
            {
                return GetRepository<Town>();
            }
        }

        public int SaveChanges()
        {
            return this._context.SaveChanges();
        }

        private IRepository<T> GetRepository<T>() where T : class
        {
            if (!this._repositories.ContainsKey(typeof(T)))
            {
                var type = typeof(EfRepository<T>);
                this._repositories.Add(typeof(T), Activator.CreateInstance(type, this._context));
            }

            return (IRepository<T>)this._repositories[typeof(T)];
        }
    }
}
