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
    public class TaskAssignedsController : ControllerBase
    {
        private readonly CGDbContext _context;

        public TaskAssignedsController(CGDbContext context)
        {
            _context = context;
        }

        // GET: api/TaskAssigneds
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaskAssigned>>> GetTaskAssigned()
        {
            return await _context.TaskAssigned.ToListAsync();
        }

        // GET: api/TaskAssigneds/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TaskAssigned>> GetTaskAssigned(int id)
        {
            var taskAssigned = await _context.TaskAssigned.FindAsync(id);

            if (taskAssigned == null)
            {
                return NotFound();
            }

            return taskAssigned;
        }

        // PUT: api/TaskAssigneds/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTaskAssigned(int id, TaskAssigned taskAssigned)
        {
            if (id != taskAssigned.TaskAssignedId)
            {
                return BadRequest();
            }

            _context.Entry(taskAssigned).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TaskAssignedExists(id))
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

        // POST: api/TaskAssigneds
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<TaskAssigned>> PostTaskAssigned(TaskAssigned taskAssigned)
        {
            _context.TaskAssigned.Add(taskAssigned);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTaskAssigned", new { id = taskAssigned.TaskAssignedId }, taskAssigned);
        }

        // DELETE: api/TaskAssigneds/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TaskAssigned>> DeleteTaskAssigned(int id)
        {
            var taskAssigned = await _context.TaskAssigned.FindAsync(id);
            if (taskAssigned == null)
            {
                return NotFound();
            }

            _context.TaskAssigned.Remove(taskAssigned);
            await _context.SaveChangesAsync();

            return taskAssigned;
        }

        private bool TaskAssignedExists(int id)
        {
            return _context.TaskAssigned.Any(e => e.TaskAssignedId == id);
        }
        [HttpPost("all")]
        public async Task<ActionResult<object>> PostTaskAssignedall(int domain, DateTime date, int taskid)
        {
            try
            {
                var list = _context.User.Include(i=>i.Roles).Where(r => r.Roles.RoleName == "Candidate").ToArray();
                var flist = list.Where(u => u.DomainId == domain).ToArray();
                var flist2 = flist.Where(r => (r.DOJ).ToShortDateString()==(date).ToShortDateString()).ToArray();
            
           
                for (var i = 0; i<flist2.Length; i++)
                {
                    TaskAssigned t = new TaskAssigned
                    {
                        UserId = flist2[i].UserId,
                        TaskId = taskid,
                        Scores = 0
                    };

                    _context.TaskAssigned.Add(t);
                    await _context.SaveChangesAsync();
                }
                return Ok("successfully assigned");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
       

        [HttpGet("User/{uid}")]
        public async Task<ActionResult<object>> usertasks(int uid)
        {
            var taskAssigned = await _context.TaskAssigned.Where(r=>r.UserId==uid).Include(i=>i.Tasks).ToListAsync();

            if (taskAssigned == null)
            {
                return NotFound();
            }

            return taskAssigned;
        }

        [HttpGet("Tasks/{tid}")]
        public async Task<ActionResult<object>> tasks(int tid)
        {
            var taskAssigned = await _context.TaskAssigned.Where(r => r.TaskId == tid).Include(i => i.Tasks).ToListAsync();

            if (taskAssigned == null)
            {
                return NotFound();
            }

            return taskAssigned;
        }
    }
}
