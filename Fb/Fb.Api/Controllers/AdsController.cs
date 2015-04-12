namespace Fb.Api.Controllers
{
    using System.Data.Entity;
    using System.Linq;
    using System.Web.Http;
    using Data;
    using Fb.Models;
    using Models.Ads;
    using Properties;

    public class AdsController : BaseApiController
    {
        public AdsController()
            : this(new FbData())
        {
        }

        public AdsController(IFbData data)
            : base(data)
        {
        }

        // GET api/Ads
        [HttpGet]
        public IHttpActionResult GetAds([FromUri]GetAdsBindingModel model)
        {
            // Validate the input parameters
            if (!ModelState.IsValid)
            {
                return this.BadRequest(this.ModelState);
            }

            // Select all published ads by given category, town
            var ads = this.Data.Posts.All().Include(ad => ad.Owner);
            
            ads = ads.OrderByDescending(ad => ad.Date).ThenBy(ad => ad.Id);

            // Apply paging: find the requested page (by given start page and page size)
            int pageSize = Settings.Default.DefaultPageSize;
            if (model.PageSize.HasValue)
            {
                pageSize = model.PageSize.Value;
            }
            var numItems = ads.Count();
            var numPages = (numItems + pageSize - 1) / pageSize;
            if (model.StartPage.HasValue)
            {
                ads = ads.Skip(pageSize * (model.StartPage.Value - 1));
            }
            ads = ads.Take(pageSize);

            // Select only the columns to be returned 
            var adsToReturn = ads.ToList().Select(ad => new
            {
                id = ad.Id,
                text = ad.Text,
                date = ad.Date.ToString("o"),
                imageDataUrl = ad.ImageDataURL,
                ownerName = ad.Owner.Name,
                ownerEmail = ad.Owner.Email,
                ownerPhone = ad.Owner.PhoneNumber,
            });

            return this.Ok(
                new
                {
                    numItems,
                    numPages,
                    ads = adsToReturn
                }
            );
        }
    }
}
