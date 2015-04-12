namespace Fb.Api.Controllers
{
    using System.Linq;
    using System.Web.Http;
    using Data;
    using Microsoft.AspNet.Identity;
    using Models.Ads;
    using Models.Users;
    using Properties;

    [RoutePrefix("api/posts")]
    public class PostController : BaseApiController
    {
        public PostController()
            : base(new FbData())
        {
        }

        public PostController(IFbData data)
            : base(data)
        {
        }


        [HttpGet]
        [Route("all")]
        public IHttpActionResult GetPosts([FromUri] PostsPageSettingsModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var posts = Data.Posts.All();

            posts = posts.OrderByDescending(ad => ad.Date).ThenBy(ad => ad.Id);

            // Apply paging: find the requested page (by given start page and page size)
            int pageSize = Settings.Default.DefaultPageSize;
            if (model.PageSize.HasValue)
            {
                pageSize = model.PageSize.Value;
            }
            var numItems = posts.Count();
            var numPages = (numItems + pageSize - 1)/pageSize;
            if (model.StartPage.HasValue)
            {
                posts = posts.Skip(pageSize*(model.StartPage.Value - 1));
            }
            posts = posts.Take(pageSize);

            var postsToReturn = posts.ToList().Select(p => new
            {
                id = p.Id,
                text = p.Text,
                date = p.Date.ToString("o"),
                imageDataUrl = p.ImageDataURL,
                ownerName = p.Owner.Name,
                ownerEmail = p.Owner.Email,
                ownerPhone = p.Owner.PhoneNumber,
            });

            return Ok(
                new
                {
                    numItems,
                    numPages,
                    posts = postsToReturn
                }
            );
        }

        [HttpGet]
        [Route("{id:int}")]
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

        [HttpPut]
        [Route("{id:int}")]
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

        [HttpDelete]
        [Route("{id:int}")]
        public IHttpActionResult DeletePost(int id)
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