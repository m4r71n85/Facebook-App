namespace Fb.Api.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Data.Entity;
    using System.Linq;
    using System.Net.Http;
    using System.Text;
    using System.Threading;
    using System.Threading.Tasks;
    using System.Web;
    using System.Web.Http;
    using Data;
    using Fb.Models;
    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;
    using Microsoft.Owin.Security;
    using Microsoft.Owin.Security.Cookies;
    using Models.Users;
    using Properties;

    [Authorize]
    [RoutePrefix("api/user")]
    public class UserController : BaseApiController
    {
        private ApplicationUserManager userManager;

        public UserController(IFbData data)
            : base(data)
        {
        }

        public UserController()
            : base(new FbData())
        {
            this.userManager = new ApplicationUserManager(
                new UserStore<ApplicationUser>(new ApplicationDbContext()));
        }

        public ApplicationUserManager UserManager
        {
            get
            {
                return this.userManager;
            }
        }

        private IAuthenticationManager Authentication
        {
            get
            {
                return Request.GetOwinContext().Authentication;
            }
        }

        // POST api/User/Login
        [HttpPost]
        [AllowAnonymous]
        [Route("Login")]
        public async Task<HttpResponseMessage> LoginUser(LoginUserBindingModel model)
        {
            if (model == null)
            {
                model = new LoginUserBindingModel();
            }

            // Invoke the "token" OWIN service to perform the login: /api/token
            // Ugly implementation: I use a server-side HTTP POST because I cannot directly invoke the service (it is deeply hidden in the OAuthAuthorizationServerHandler class)
            var request = HttpContext.Current.Request;
            var tokenServiceUrl = request.Url.GetLeftPart(UriPartial.Authority) + request.ApplicationPath + Startup.TokenEndpointPath;
            using (var client = new HttpClient())
            {
                var requestParams = new List<KeyValuePair<string, string>>
                {
                    new KeyValuePair<string, string>("grant_type", "password"),
                    new KeyValuePair<string, string>("username", model.Username),
                    new KeyValuePair<string, string>("password", model.Password)
                };
                var requestParamsFormUrlEncoded = new FormUrlEncodedContent(requestParams);
                var tokenServiceResponse = await client.PostAsync(tokenServiceUrl, requestParamsFormUrlEncoded);
                var responseString = await tokenServiceResponse.Content.ReadAsStringAsync();
                var responseCode = tokenServiceResponse.StatusCode;
                var responseMsg = new HttpResponseMessage(responseCode)
                {
                    Content = new StringContent(responseString, Encoding.UTF8, "application/json")
                };
                return responseMsg;
            }
        }

        // POST api/User/Register
        [HttpPost]
        [AllowAnonymous]
        [Route("Register")]
        public async Task<HttpResponseMessage> RegisterUser(RegisterUserBindingModel model)
        {
            if (!ModelState.IsValid)
            {
                return await this.BadRequest(this.ModelState).ExecuteAsync(new CancellationToken());
            }

            var user = new ApplicationUser
            {
                UserName = model.Username,
                Name = model.Name,
                Email = model.Email,
                PhoneNumber = model.Phone,
                TownId = model.TownId
            };

            IdentityResult result = await this.UserManager.CreateAsync(user, model.Password);

            if (!result.Succeeded)
            {
                return await this.GetErrorResult(result).ExecuteAsync(new CancellationToken());
            }

            // Auto login after register (successful user registration should return access_token)
            var loginResult = this.LoginUser(new LoginUserBindingModel()
            {
                Username = model.Username,
                Password = model.Password
            });
            return await loginResult;
        }

        // POST api/User/Logout
        [HttpPost]
        [Route("Logout")]
        public IHttpActionResult Logout()
        {
            this.Authentication.SignOut(CookieAuthenticationDefaults.AuthenticationType);
            return this.Ok(
                new
                {
                    message = "Logout successful."
                }
            );
        }

        // POST api/User/Ads
        [HttpPost]
        [Route("Ads")]
        public IHttpActionResult CreateNewAd(UserCreateAdBindingModel model)
        {
            // Validate the input parameters
            if (!ModelState.IsValid)
            {
                return this.BadRequest(this.ModelState);
            }

            // Validate the current user exists in the database
            var currentUserId = User.Identity.GetUserId();
            var currentUser = this.Data.Users.All().FirstOrDefault(x => x.Id == currentUserId);
            if (currentUser == null)
            {
                return this.BadRequest("Invalid user token! Please login again!");
            }

            var ad = new Post()
            {
                Text = model.Text,
                ImageDataURL = model.ImageDataURL,
                Date = DateTime.Now,
                OwnerId = currentUserId
            };

            this.Data.Posts.Add(ad);

            this.Data.SaveChanges();

            return this.Ok(
                new
                {
                    message = "Advertisement created successfully.",
                    adId = ad.Id
                }
            );
        }

        // GET api/User/Ads
        [HttpGet]
        [Route("Ads")]
        public IHttpActionResult GetPosts([FromUri]GetUserAdsBindingModel model)
        {
            if (model == null)
            {
                // When no parameters are passed, the model is null, so we create an empty model
                model = new GetUserAdsBindingModel();
            }

            // Validate the input parameters
            if (!ModelState.IsValid)
            {
                return this.BadRequest(this.ModelState);
            }

            // Validate the current user exists in the database
            var currentUserId = User.Identity.GetUserId();
            var currentUser = this.Data.Users.All().FirstOrDefault(x => x.Id == currentUserId);
            if (currentUser == null)
            {
                return this.BadRequest("Invalid user token! Please login again!");
            }

            // Select current user's ads by given status
            var ads = this.Data.Posts.All();
            
            ads = ads.Where(ad => ad.OwnerId == currentUserId);
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

            // Select the columns to be returned 
            var adsToReturn = ads.ToList().Select(ad => new
            {
                id = ad.Id,
                text = ad.Text,
                date = ad.Date.ToString("o"),
                imageDataUrl = ad.ImageDataURL,
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


        // PUT api/User/ChangePassword
        [HttpPut]
        [Route("ChangePassword")]
        public async Task<IHttpActionResult> ChangeUserPassword(ChangePasswordBindingModel model)
        {
            if (!ModelState.IsValid)
            {
                return this.BadRequest(this.ModelState);
            }

            if (User.Identity.GetUserName() == "admin")
            {
                return this.BadRequest("Password change for user 'admin' is not allowed!");
            }

            IdentityResult result = await this.UserManager.ChangePasswordAsync(
                User.Identity.GetUserId(), model.OldPassword, model.NewPassword);

            if (!result.Succeeded)
            {
                return this.GetErrorResult(result);
            }

            return this.Ok(
                new
                {
                    message = "Password changed successfully.",
                }
            );
        }

        // GET api/Users/Profile
        [HttpGet]
        [Route("Profile")]
        public IHttpActionResult GetUserProfile()
        {
            if (!ModelState.IsValid)
            {
                return this.BadRequest(this.ModelState);
            }

            // Validate the current user exists in the database
            var currentUserId = User.Identity.GetUserId();
            var currentUser = this.Data.Users.All().FirstOrDefault(x => x.Id == currentUserId);
            if (currentUser == null)
            {
                return this.BadRequest("Invalid user token! Please login again!");
            }

            var userToReturn = new
            {
                currentUser.Name,
                currentUser.Email,
                currentUser.PhoneNumber,
                currentUser.TownId,
            };

            return this.Ok(userToReturn);
        }

        // PUT api/Users/Profile
        [HttpPut]
        [Route("Profile")]
        public IHttpActionResult EditUserProfile(EditUserProfileBindingModel model)
        {
            if (!ModelState.IsValid)
            {
                return this.BadRequest(this.ModelState);
            }

            // Validate the current user exists in the database
            var currentUserId = User.Identity.GetUserId();
            var currentUser = this.Data.Users.All().FirstOrDefault(x => x.Id == currentUserId);
            if (currentUser == null)
            {
                return this.BadRequest("Invalid user token! Please login again!");
            }

            if (User.Identity.GetUserName() == "admin")
            {
                return this.BadRequest("Edit profile for user 'admin' is not allowed!");
            }

            var hasEmailTaken = this.Data.Users.All().Any(x => x.Email == model.Email);
            if (hasEmailTaken)
            {
                return this.BadRequest("Invalid email. The email is already taken!");
            }

            currentUser.Name = model.Name;
            currentUser.Email = model.Email;
            currentUser.PhoneNumber = model.PhoneNumber;
            currentUser.TownId = model.TownId;

            this.Data.SaveChanges();

            return this.Ok(
                new
                {
                    message = "User profile edited successfully.",
                });
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                this.UserManager.Dispose();
            }

            base.Dispose(disposing);
        }
    }
}
