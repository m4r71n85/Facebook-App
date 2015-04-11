namespace Fb.Api.Controllers
{
    using System.Data.Entity;
    using System.Web.Http;
    using Fb.Models;
    using Microsoft.AspNet.Identity;
    using Models.Users;
    using System.Linq;
    using Data;
    using Microsoft.AspNet.Identity.EntityFramework;

    public class PostController : BaseApiController
    {
        public PostController(IAdsData data)
            : base(data)
        {
        }

        [HttpGet]
        [Route("posts/{id:int}")]
        public IHttpActionResult GetAdById(int id)
        {
            var ad = this.Data.Ads.All()
                .Include(a => a.Category).Include(a => a.Town)
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
                title = ad.Title,
                text = ad.Text,
                date = ad.Date.ToString("o"),
                imageDataUrl = ad.ImageDataURL,
                categoryId = ad.CategoryId,
                categoryName = ad.Category == null ? null : ad.Category.Name,
                townId = ad.TownId,
                townName = ad.Town == null ? null : ad.Town.Name
            });
        }

        // PUT api/User/Ads/{id}
        [HttpPut]
        [Route("posts/{id:int}")]
        public IHttpActionResult UpdateAdd(int id, [FromBody]UserUpdateAdBindingModel model)
        {
            // Validate the input parameters
            if (!ModelState.IsValid)
            {
                return this.BadRequest(this.ModelState);
            }

            var ad = this.Data.Ads.All().FirstOrDefault(d => d.Id == id);
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

            ad.Title = model.Title;
            ad.Text = model.Text;
            if (model.ChangeImage)
            {
                ad.ImageDataURL = model.ImageDataURL;
            }
            ad.CategoryId = model.CategoryId;
            ad.TownId = model.TownId;
            ad.Status = AdvertisementStatus.Inactive;

            this.Data.Ads.SaveChanges();

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
            var ad = this.Data.Ads.All().FirstOrDefault(d => d.Id == id);
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

            this.Data.Ads.Delete(ad);

            this.Data.Ads.SaveChanges();

            return this.Ok(
               new
               {
                   message = "Advertisement #" + id + " deleted successfully."
               }
           );
        }
    }
}