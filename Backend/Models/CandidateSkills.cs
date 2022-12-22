using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System;
using Backend.Models;


namespace backend.Models
{
    public class CandidateSkills
    {
        [Key]
        [Required]
        public int SkillSetId { get; set; }

        [ForeignKey("User")]
        public int UserId  { get; set; }
        
        [ForeignKey("Skills")]
        public  int SkillId  { get; set; }

        [Required]
        public int Ratings { get; set; }

        //navigation property
        public virtual User User { get; set; }

        public virtual Skills Skills { get; set; }

    }
}
