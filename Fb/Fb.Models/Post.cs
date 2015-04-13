namespace Fb.Models
{
    using System;
    using System.ComponentModel.DataAnnotations;
    using System.Collections.Generic;

    public class Post
    {
        private List<LikePost> likes;

        public Post()
        {
            this.likes = new List<LikePost>();
        }

        [Key]
        public int Id { get; set; }

        [Required]
        [MinLength(1)]
        public string Text { get; set; }

        public string ImageDataURL { get; set; }

        [Required]
        public string OwnerId { get; set; }

        public virtual ApplicationUser Owner { get; set; }

        [Required]
        public DateTime Date { get; set; }

        public virtual List<LikePost> Likes
        {
            get { return this.likes; }
            set { this.likes = value; }
        }
        
    }
}
