using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System;
using backend.Models;
using System.Collections.Generic;

namespace Backend.Models
{
    public class User
    {
        [Key]
        [Required]
        public int UserId { get; set; }

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        [DataType("varchar(30)")]
        [Required(ErrorMessage = "Personal email can't be empty")]
        public string PersonalMail { get; set; }

        [DataType("varchar(30)")]
        [Required(ErrorMessage = "Corp Email can't be empty")]
        public string CorpMail { get; set; }

        [Required]
        public string Gender { get; set; }

        [Required(ErrorMessage = "Mobile no. cannot be empty")]
        [Phone]
        public string MobileNumber { get; set; }


        [Required]
        [DataType(DataType.Date)]
        public DateTime DOB { get; set; }

        [Required]
        [DataType(DataType.Date)]
        public DateTime DOJ { get; set; }


        [Required]
        [DataType("varchar(3)")]
        public string Grade { get; set; }


        [Required]
        public string Location { get; set; }

        [Required]
        [ForeignKey("Role")]
        public int RoleId { get; set; }

        [Required]
        [ForeignKey("Domain")]
        public int DomainId { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [StringLength(10, MinimumLength = 6, ErrorMessage = "Password must be 6 characters long!")]
        public string Password { get; set; }

        public int OTP { get; set; }

        public bool IsVerified { get; set; }

        public virtual Role Roles { get; set; }

        public virtual Domain Domains { get; set; }
    }
}
