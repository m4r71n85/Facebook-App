﻿namespace Fb.Api.Models.Posts
{
    using System.ComponentModel.DataAnnotations;

    public class PostsPageSettingsModel
    {
        public PostsPageSettingsModel()
        {
            this.StartPage = 1;
        }

        [Range(1, 100000, ErrorMessage = "Page number should be in range [1...100000].")]
        public int? StartPage { get; set; }

        [Range(1, 1000, ErrorMessage = "Page size be in range [1...1000].")]
        public int? PageSize { get; set; }
    }
}
