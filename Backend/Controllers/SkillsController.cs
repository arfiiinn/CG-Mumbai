using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Data;
using backend.Models;
using backend.Repositories;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SkillsController : ControllerBase
    {
        private readonly CGDbContext _context;
        private readonly ISkills _skills;

        public SkillsController(CGDbContext context, ISkills skills)
        {
            _context = context;
            _skills = skills;
        }

        // GET: api/Skills
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Skills>>> GetAllSkills()
        {
            return await _skills.GetAllSkills();
        }

        // GET: api/Skills/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Skills>> GetSkills(int id)
        {
            try
            {
                var result = await _skills.GetSkill(id);

                if (result == null)
                {
                    return NotFound();
                }

                return result;
            }
            catch (Exception) 
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error retrieving data from the database");
            }
        }

        // PUT: api/Skills/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<ActionResult<Skills>> UpdateSkills(int id,Skills skills)
        {
            try
            {
                if (id != skills.SkillId)
                    return BadRequest("Skill ID mismatch");

                var skillToUpdate = await _skills.GetSkill(id);

                if (skillToUpdate == null)
                    return NotFound($"Skill with Id = {id} not found");

                return await _skills.UpdateSkills(skills);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error updating data");
            }
        }

        // POST: api/Skills
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost("/api/Add/Skills")]
        public async Task<ActionResult<Skills>> AddSkills(Skills skills)
        {
            return await _skills.AddSkills(skills);
        }

        // DELETE: api/Skills/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Skills>> DeleteSkills(int id)
        {
            return await _skills.DeleteSkills(id);
        }
        [HttpGet("Search")]
        public async Task<ActionResult<IEnumerable<Skills>>> Search(string SkillName)
        {
            try
            {
                var result = await _skills.Search(SkillName);
                if (result.Any())
                {
                    return Ok(result);
                }
                return NotFound();
            }
            catch (Exception)
            {
                throw;
            }
        }
        private bool SkillsExists(int id)
        {
            return _context.Skills.Any(e => e.SkillId == id);
        }
    }
}
