using backend.Models;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data
{
    public class CGDbContext : DbContext
    {

        public CGDbContext(DbContextOptions<CGDbContext> options) : base(options)
        {

        }

        public DbSet<User> User { get; set; }
        public DbSet<Role> Role { get; set; }

        public DbSet<Tasks> Tasks { get; set; }

        public DbSet<TaskAssigned> TaskAssigned { get; set; }


        public DbSet<TaskComments> TaskComments { get; set; }
    }
}
