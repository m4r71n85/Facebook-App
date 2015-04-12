namespace Fb.Api.Controllers
{
    using System.Linq;
    using System.Web.Http;
    using Data;
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
        public IHttpActionResult FindFriends([FromBody]FindFriendByStringModel findFriend)
        {
            if (!ModelState.IsValid) { return BadRequest(ModelState); }
            var searchPhrase = findFriend.SearchPhrase;

            var friends = Data.Users.All()
                .Where(u => u.UserName.Contains(searchPhrase)
                            ||u.Email.Contains(searchPhrase)
                            ||u.Town.Name.Contains(searchPhrase));

            return Ok(friends);
        }
    }
}