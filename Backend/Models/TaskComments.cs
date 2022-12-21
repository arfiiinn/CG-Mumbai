using Backend.Models;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.Design;
using System.Xml.Linq;

namespace backend.Models
{
    public class TaskComments
    {
        [Key]
        public int CommentId { get; set; }
        [ForeignKey("User")]
        public int UserId { get; set; }
        public string Comments { get; set; }
        public DateTime CreatedAt { get; set; }
        [ForeignKey("Tasks")]
        public int TaskId { get; set; }
        
        public virtual User User { get; set; }

        public virtual Tasks Tasks { get; set; }


    }
}
