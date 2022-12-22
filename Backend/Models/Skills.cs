using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System;
using System.Collections.Generic;
using Backend.Models;

namespace backend.Models
{
    public class Skills
    {
        [Key]
        public int SkillId { get; set; }
        [Required]
        public string SkillName { get; set; }
       
    }
}
