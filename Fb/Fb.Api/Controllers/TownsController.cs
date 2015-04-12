namespace Fb.Api.Controllers
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Web.Http;
    using Data;
    using Fb.Models;

    public class TownsController : BaseApiController
    {
        public TownsController()
            : this(new FbData())
        {
        }

        public TownsController(IFbData data)
            : base(data)
        {
        }

        // GET api/Towns
        /// <returns>List of all towns sorted by Id</returns>
        [HttpGet]
        public IEnumerable<Town> GetTowns()
        {
            var towns = this.Data.Towns.All().OrderBy(town => town.Id).ToList();
            return towns;
        }
    }
}
