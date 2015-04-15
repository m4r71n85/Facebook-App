namespace Fb.Api.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web.Http;
    using Data;
    using Microsoft.AspNet.Identity;
    using Models.Users;
    using Properties;
    using Fb.Models;
    using Models.Posts;

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

        [HttpPut]
        [Route("create")]
        public IHttpActionResult CreatePost([FromBody]UserUpdatePostBindingModel model)
        {
            // Validate the input parameters
            if (!ModelState.IsValid)
            {
                return this.BadRequest(this.ModelState);
            }


            var currentUserId = User.Identity.GetUserId();
            var currentUser = Data.Users.All().FirstOrDefault(u => u.Id == currentUserId);
            if (currentUser == null)
            {
                return BadRequest("Cannot find user");
            }
            currentUser.Posts.Add(new Post
            {
                Date = DateTime.Now,
                ImageDataURL = model.ImageDataURL,
                Text = model.Text
            });


            Data.Users.SaveChanges();

            return this.Ok(
                new
                {
                    message = "Post added successfully."
                }
            );
        }

        [HttpPut]
        [Route("create/{userId}")]
        public IHttpActionResult CreatePost(string userId, [FromBody]UserUpdatePostBindingModel model)
        {
            // Validate the input parameters
            if (!ModelState.IsValid)
            {
                return this.BadRequest(this.ModelState);
            }


            var currentUser = Data.Users.All().FirstOrDefault(u => u.Id == userId);
            if (currentUser == null)
            {
                return BadRequest("Cannot find user");
            }
            currentUser.Posts.Add(new Post
            {
                Date = DateTime.Now,
                ImageDataURL = model.ImageDataURL,
                Text = model.Text
            });


            Data.Users.SaveChanges();

            return Ok(
                new
                {
                    message = "Post added successfully."
                }
            );
        }

        [HttpPut]
        [Route("share/{postId}")]
        public IHttpActionResult SharePost(int postId)
        {
            // Validate the input parameters
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }


            var currentUserId = User.Identity.GetUserId();
            var currentUser = Data.Users.All().FirstOrDefault(u => u.Id == currentUserId);
            if (currentUser == null) { return BadRequest("Cannot find user"); }

            var post = currentUser.Posts.FirstOrDefault(p => p.Id == postId);
            if (post == null) { return BadRequest("Cannot find post"); }

            if (currentUser.Posts.Contains(post)) {  return BadRequest("Post already added"); }

            currentUser.Posts.Add(post);

            Data.Users.SaveChanges();

            return Ok(
                new
                {
                    message = "Post shared successfully."
                }
            );
        }

        [HttpGet]
        [Route("like/{postId}")]
        public IHttpActionResult LikePosts(int postId)
        {
            var userId = User.Identity.GetUserId();
            var post = this.Data.Posts.All().FirstOrDefault(p => p.Id == postId);

            if (post.Likes.Any(l => l.OwnerId == userId))
            {
                return BadRequest("Cannot like post more than one times");
            }

            var like = new LikePost
            {
                OwnerId = userId
            };

            post.Likes.Add(like);
            this.Data.Posts.SaveChanges();
            return Ok(post.Likes.Count());
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
                likeCount = p.Likes.Count,
                like = p.Likes
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