using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Data;
using backend.Models;
using Microsoft.AspNetCore.StaticFiles;
using System.IO;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly CGDbContext _context;

        public TasksController(CGDbContext context)
        {
            _context = context;
        }

        // GET: api/Tasks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Tasks>>> GetTasks()
        {
            return await _context.Tasks.ToListAsync();
        }

        // GET: api/Tasks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Tasks>> GetTasks(int id)
        {
            var tasks = await _context.Tasks.FindAsync(id);

            if (tasks == null)
            {
                return NotFound();
            }

            return tasks;
        }

        // PUT: api/Tasks/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTasks(int id, Tasks tasks)
        {
            if (id != tasks.TaskId)
            {
                return BadRequest();
            }

            _context.Entry(tasks).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TasksExists(id))
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

        // POST: api/Tasks
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Tasks>> PostTasks(Tasks tasks)
        {
            Tasks tasks1 = new Tasks {
                TaskName=tasks.TaskName,
                CreatedAt=DateTime.Now,
                Deadline=tasks.Deadline,
                CreatedBy=tasks.CreatedBy,  
                Description=tasks.Description,  
                TaskStatus=tasks.TaskStatus,
                DocumentName=tasks.DocumentName
            };
            _context.Tasks.Add(tasks1);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTasks", new { id = tasks.TaskId }, tasks);
        }

        // DELETE: api/Tasks/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Tasks>> DeleteTasks(int id)
        {
            var tasks = await _context.Tasks.FindAsync(id);
            if (tasks == null)
            {
                return NotFound();
            }

            _context.Tasks.Remove(tasks);
            await _context.SaveChangesAsync();

            return tasks;
        }

        private bool TasksExists(int id)
        {
            return _context.Tasks.Any(e => e.TaskId == id);
        }

        private async Task<string> WriteFile(IFormFile file/*, string f_name*/)
        {
            string fileName = file.FileName;
            try
            {
                var extension = "." + file.FileName.Split('.')[file.FileName.Split('.').Length - 1];

                var pathBuilt = Path.Combine(Directory.GetCurrentDirectory(), "Upload\\files");
                if (!Directory.Exists(pathBuilt))
                {
                    Directory.CreateDirectory(pathBuilt);
                }
                var path = Path.Combine(Directory.GetCurrentDirectory(), "Upload\\files",
                   fileName);
                using (var stream = new FileStream(path, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }
            }
            catch (Exception e)
            {
                return e.Message;
            }
            return fileName;
        }


        [HttpPost]
        [Route("SaveFile")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(string), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> UploadFile(IFormFile file/*, string f_name*//*, CancellationToken cancellationToken*/)
        {

            var result = await WriteFile(file);


            return Ok(result);
        }

        [HttpGet("DownloadFile")]
        public async Task<ActionResult> DownloadFile(string NameFile)
        {
            // ... code for validation and get the file
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "Upload\\files",
                   NameFile);
            var provider = new FileExtensionContentTypeProvider();
            if (!provider.TryGetContentType(filePath, out var contentType))
            {
                contentType = "application/octet-stream";
            }

            var bytes = await System.IO.File.ReadAllBytesAsync(filePath);

            return File(bytes, contentType, Path.GetFileName(filePath));
        }
    }
}
