namespace FBApp.Data
{
    using System.Data.Entity;
    using System.Linq;

    public class EfRepository<T> : IRepository<T> where T : class
    {
        private readonly DbContext _context;

        private readonly IDbSet<T> _set;

        public EfRepository(DbContext context)
        {
            _context = context;
            _set = context.Set<T>();
        }

        public void Dispose()
        {
            _context.Dispose();
        }

        public IQueryable<T> All()
        {
            return _set;
        }

        public T GetById(object id)
        {
            return _set.Find(id);
        }

        public void Add(T entity)
        {
            ChangeEntityState(entity, EntityState.Added);
        }

        public void Update(T entity)
        {
            ChangeEntityState(entity, EntityState.Modified);
        }

        public void Delete(T entity)
        {
            ChangeEntityState(entity, EntityState.Deleted);
        }

        public void Delete(object id)
        {
            Delete(GetById(id));
        }

        public int SaveChanges()
        {
            return _context.SaveChanges();
        }

        private void ChangeEntityState(T entity, EntityState state)
        {
            var entry = _context.Entry(entity);
            if (entry.State == EntityState.Detached)
            {
                _set.Attach(entity);
            }

            entry.State = state;
        }
    }
}
