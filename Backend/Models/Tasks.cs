using Backend.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public partial class Tasks
    {
        [Required]
        [Key]
        public int TaskId { get; set; }

        public string TaskName { get; set; }

        [DataType(DataType.Date)]
        public DateTime CreatedAt { get; set; }


        public DateTime Deadline { get; set; }
        [ForeignKey("User")]
        public int CreatedBy { get; set; }
        public string Description { get; set; }
        public bool TaskStatus { get; set; }

        public string DocumentName { get; set; }

        public virtual User User { get; set; }
       

        public virtual ICollection<TaskComments> TaskComments { get; set; }

       









    }
}
