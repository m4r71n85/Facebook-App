namespace Fb.Api.Models.Friends
{
    using System.ComponentModel.DataAnnotations;

    public class FindFriendByStringModel
    {
        [Required]
        public string SearchPhrase { get; set; }
    }
}