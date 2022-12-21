using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Data;
using backend.Models;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskCommentsController : ControllerBase
    {
        private readonly CGDbContext _context;

        public TaskCommentsController(CGDbContext context)
        {
            _context = context;
        }

        // GET: api/TaskComments
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaskComments>>> GetTaskComments()
        {
            return await _context.TaskComments.ToListAsync();
        }

        // GET: api/TaskComments/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TaskComments>> GetTaskComments(int id)
        {
            var taskComments = await _context.TaskComments.FindAsync(id);

            if (taskComments == null)
            {
                return NotFound();
            }

            return taskComments;
        }

        // PUT: api/TaskComments/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTaskComments(int id, TaskComments taskComments)
        {
            if (id != taskComments.CommentId)
            {
                return BadRequest();
            }

            _context.Entry(taskComments).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TaskCommentsExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/TaskComments
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<TaskComments>> PostTaskComments(TaskComments taskComments)
        {
            _context.TaskComments.Add(taskComments);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTaskComments", new { id = taskComments.CommentId }, taskComments);
        }

        // DELETE: api/TaskComments/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TaskComments>> DeleteTaskComments(int id)
        {
            var taskComments = await _context.TaskComments.FindAsync(id);
            if (taskComments == null)
            {
                return NotFound();
            }

            _context.TaskComments.Remove(taskComments);
            await _context.SaveChangesAsync();

            return taskComments;
        }

        private bool TaskCommentsExists(int id)
        {
            return _context.TaskComments.Any(e => e.CommentId == id);
        }
    }
}
