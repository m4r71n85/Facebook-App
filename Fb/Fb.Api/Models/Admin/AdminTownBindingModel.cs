namespace Fb.Api.Models.Admin
{
    using System.ComponentModel.DataAnnotations;

    public class AdminTownBindingModel
    {
        [Required]
        public string Name { get; set; }
    }
}
