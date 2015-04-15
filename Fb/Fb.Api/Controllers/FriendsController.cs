namespace Fb.Api.Controllers
{
    using System.Data.Entity;
    using System.Linq;
    using System.Web.Http;
    using Data;
    using Microsoft.AspNet.Identity;
    using Models.Friends;

    [RoutePrefix("api/friends")]
    public class FriendsController:BaseApiController
    {
        public FriendsController()
            : this(new FbData())
        {
        }

        public FriendsController(IFbData data)
            : base(data)
        {
        }

        [Route("search")]
        [HttpPost]
        public IHttpActionResult FindFriends([FromBody]FindFriendByStringModel searchCriterias)
        {
            if (!ModelState.IsValid) { return BadRequest(ModelState); }
            var searchPhrase = searchCriterias.SearchPhrase;
            var userId = User.Identity.GetUserId();
            var friends = Data.Users.All()
                .Where(u => (u.UserName.Contains(searchPhrase)
                             || u.Email.Contains(searchPhrase)
                             || u.Town.Name.Contains(searchPhrase))
                            && u.Id != userId)
                .Include(u => u.Town)
                .Select(u => new
                {
                    u.Id,
                    u.Name,
                    TownName = u.Town.Name,
                    IsFriend = u.Friends.Any(f => f.Id == userId),
                }).OrderBy(u => u.IsFriend)
                .ToList();

            return Ok(friends);
        }

        [HttpGet]
        public IHttpActionResult AddFriend(string friendId)
        {
            var userId = User.Identity.GetUserId();
            var user = Data.Users.All().FirstOrDefault(u => u.Id == userId);
            var friend = Data.Users.All().FirstOrDefault(u => u.Id == friendId);
            if (user == null || friend == null)
            {
                return BadRequest("Cannot find user!");
            }

            user.Friends.Add(friend);
            Data.SaveChanges();

            return Ok("Friend added!");
        }

        [HttpGet]
        public IHttpActionResult RemoveFriend(string friendId)
        {
            var userId = User.Identity.GetUserId();
            var user = Data.Users.All().FirstOrDefault(u => u.Id == userId);
            var friend = Data.Users.All().FirstOrDefault(u => u.Id == friendId);
            if (user == null || friend == null)
            {
                return BadRequest("Cannot find user!");
            }

            user.Friends.Remove(friend);
            Data.SaveChanges();

            return Ok("Friend Removed!");
        }
    }
}