namespace FBApp.Data
{
    using System;
    using System.Collections.Generic;
    using System.Data.Entity;
    using FbApp.Models;
    using Microsoft.AspNet.Identity.EntityFramework;
    using Models;

    class FbAppData
    {
        private readonly DbContext _context;

        private readonly IDictionary<Type, object> _repositories;

        public FbAppData()
            : this(new ApplicationDbContext())
        {
        }

        public FbAppData(DbContext context)
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

        public IRepository<Town> Towns
        {
            get
            {
                return GetRepository<Town>();
            }
        }

        public int SaveChanges()
        {
            return _context.SaveChanges();
        }

        private IRepository<T> GetRepository<T>() where T : class
        {
            if (!_repositories.ContainsKey(typeof(T)))
            {
                var type = typeof(EfRepository<T>);
                _repositories.Add(typeof(T), Activator.CreateInstance(type, _context));
            }

            return (IRepository<T>)_repositories[typeof(T)];
        }
    }
}
