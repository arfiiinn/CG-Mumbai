using Backend.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class TaskAssigned
    {
        [Key]
        public int TaskAssignedId { get; set; }
        [ForeignKey("User")]
        public int UserId { get; set; }
        [ForeignKey("Tasks")]
        public int TaskId { get; set; }
        public int Scores { get; set; }
        public virtual User User { get; set; }

        public virtual Tasks Tasks { get; set; }
    }
}
