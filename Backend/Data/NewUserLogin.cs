using System.ComponentModel.DataAnnotations;

namespace Backend.Data
{
    public class NewUserLogin
    {
        [DataType("varchar(30)")]
        [Required(ErrorMessage = "Corp Email cannot be empty")]
        public string CorpMail { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [StringLength(10, MinimumLength = 6, ErrorMessage = "Password should be 6 characters long!")]
        public string Password { get; set; }

        [DataType("varchar(30)")]
        [Required(ErrorMessage = "Personal Email cannot be empty")]
        public string PersonalMail { get; set; }
        [Required]
        public int RoleId { get; set; }
        public int OTP { get; set; }
    }
}
