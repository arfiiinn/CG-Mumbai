using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Data
{
    public class UserLogin
    {

       

        [DataType("varchar(30)")]
        [Required(ErrorMessage = "Corp Email cannot be empty")]
        public string CorpMail { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [StringLength(10, MinimumLength = 6, ErrorMessage = "Password should be 6 characters long!")]
        public string Password { get; set; }

        [Required]
        public int RoleId { get; set; }

    }
}
