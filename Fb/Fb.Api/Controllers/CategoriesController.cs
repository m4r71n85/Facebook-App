namespace Fb.Api.Controllers
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Web.Http;
    using Data;
    using Fb.Models;

    public class CategoriesController : BaseApiController
    {
        public CategoriesController()
            : this(new FbData())
        {
        }

        public CategoriesController(IFbData data)
            : base(data)
        {
        }

        // GET api/Categories
        /// <returns>List of all categories sorted by Id</returns>
        [HttpGet]
        public IEnumerable<Category> GetCategories()
        {
            var categories = this.Data.Categories.All().OrderBy(category => category.Id).ToList();
            return categories;
        }
    }
}
