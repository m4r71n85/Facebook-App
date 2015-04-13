namespace Fb.Models
{
    using System;
    using System.ComponentModel.DataAnnotations;

    public class Post
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MinLength(1)]
        public string Text { get; set; }

        public string ImageDataURL { get; set; }

        [Required]
        public string OwnerId { get; set; }

        public virtual ApplicationUser Owner { get; set; }

        public int Likes { get; set; }

        [Required]
        public DateTime Date { get; set; }
    }
}
