using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Domain
    {
        [Key]
        public int DomainId { get; set; }
        [Required]
        public string DomainName { get; set; }
    }
}
