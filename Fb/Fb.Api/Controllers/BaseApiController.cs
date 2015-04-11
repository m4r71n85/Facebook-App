namespace Fb.Api.Controllers
{
    using System.Web.Http;
    using Data;
    using Microsoft.AspNet.Identity;

    public class BaseApiController : ApiController
    {
        public BaseApiController(IAdsData data)
        {
            Data = data;
        }

        protected IAdsData Data { get; private set; }

        protected IHttpActionResult GetErrorResult(IdentityResult result)
        {
            if (result == null)
            {
                return InternalServerError();
            }

            if (!result.Succeeded)
            {
                if (result.Errors != null)
                {
                    foreach (string error in result.Errors)
                    {
                        ModelState.AddModelError(string.Empty, error);
                    }
                }

                if (ModelState.IsValid)
                {
                    // No ModelState errors are available to send, so just return an empty BadRequest.
                    return BadRequest();
                }

                return BadRequest(ModelState);
            }

            return null;
        }
    }
}
