namespace Fb.Api.Controllers
{
    using System.Linq;
    using System.Web.Http;
    using Data;
    using Microsoft.AspNet.Identity;
    using Models.Users;

    public class PostController : BaseApiController
    {
        public PostController(IFbData data)
            : base(data)
        {
        }

        [HttpGet]
        [Route("posts/{id:int}")]
        public IHttpActionResult GetAdById(int id)
        {
            var ad = this.Data.Posts.All()
                .FirstOrDefault(d => d.Id == id);
            if (ad == null)
            {
                return this.BadRequest("Advertisement #" + id + " not found!");
            }

            // Validate the current user ownership over the ad
            var currentUserId = User.Identity.GetUserId();
            if (ad.OwnerId != currentUserId)
            {
                return this.Unauthorized();
            }

            return this.Ok(new
            {
                id = ad.Id,
                text = ad.Text,
                date = ad.Date.ToString("o"),
                imageDataUrl = ad.ImageDataURL,
            });
        }

        // PUT api/User/Ads/{id}
        [HttpPut]
        [Route("posts/{id:int}")]
        public IHttpActionResult UpdatePost(int id, [FromBody]UserUpdateAdBindingModel model)
        {
            // Validate the input parameters
            if (!ModelState.IsValid)
            {
                return this.BadRequest(this.ModelState);
            }

            var ad = Data.Posts.All().FirstOrDefault(d => d.Id == id);
            if (ad == null)
            {
                return this.BadRequest("Advertisement #" + id + " not found!");
            }

            // Validate the current user ownership over the ad
            var currentUserId = User.Identity.GetUserId();
            if (ad.OwnerId != currentUserId)
            {
                return this.Unauthorized();
            }

            ad.Text = model.Text;
            if (model.ChangeImage)
            {
                ad.ImageDataURL = model.ImageDataURL;
            }

            this.Data.Posts.SaveChanges();

            return this.Ok(
                new
                {
                    message = "Advertisement #" + id + " edited successfully."
                }
            );
        }

        // DELETE api/User/Ads/{id}
        [HttpDelete]
        [Route("posts/{id:int}")]
        public IHttpActionResult DeleteAd(int id)
        {
            var ad = this.Data.Posts.All().FirstOrDefault(d => d.Id == id);
            if (ad == null)
            {
                return this.BadRequest("Advertisement #" + id + " not found!");
            }

            // Validate the current user ownership over the add
            var currentUserId = User.Identity.GetUserId();
            if (ad.OwnerId != currentUserId)
            {
                return this.Unauthorized();
            }

            this.Data.Posts.Delete(ad);

            this.Data.Posts.SaveChanges();

            return this.Ok(
               new
               {
                   message = "Advertisement #" + id + " deleted successfully."
               }
           );
        }
    }
}