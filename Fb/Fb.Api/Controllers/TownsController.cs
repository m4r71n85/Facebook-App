namespace Fb.Api.Controllers
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Web.Http;
    using Data;
    using Fb.Models;

    [AllowAnonymous]
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

        [HttpGet]
        [Route("api/towns")]
        public IEnumerable<Town> GetTowns()
        {
            var towns = this.Data.Towns.All().OrderBy(town => town.Id).ToList();
            return towns;
        }
    }
}
