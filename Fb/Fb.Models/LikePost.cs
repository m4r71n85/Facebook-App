namespace Fb.Models
{
    using System.ComponentModel.DataAnnotations;

    public class LikePost
    {
        [Key]
        public int Id { get; set; }

        public string OwnerId { get; set; }
    }
}
