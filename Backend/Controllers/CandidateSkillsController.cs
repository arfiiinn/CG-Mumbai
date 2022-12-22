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
    public class CandidateSkillsController : ControllerBase
    {
        private readonly CGDbContext _context;
        private readonly ICandidateSkills _candidateskills;

        public CandidateSkillsController(CGDbContext context, ICandidateSkills candidateskills)
        {
            _context = context;
            _candidateskills = candidateskills;
        }

        // GET: api/CandidateSkills
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CandidateSkills>>> GetCandidateSkills()
        {
            return await _candidateskills.GetCandidateSkills();
        }

        // GET: api/CandidateSkills/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CandidateSkills>> GetCandidateSkillsById(int id)
        {
            try
            {
                var candidateSkills = await _candidateskills.GetCandidateSkillsById(id);

                if (candidateSkills == null)
                {
                    return NotFound();
                }
                return candidateSkills;
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error retrieving data from the database");
            }


        }

        [HttpGet("User/{id}")]
        public async Task<ActionResult<IEnumerable<CandidateSkills>>> GetCandidateSkillByUserId(int id)
        {
            try
            {
                var candidateSkills = await _candidateskills.GetCandidateSkillByUserId(id);

                if (candidateSkills == null)
                {
                    return NotFound();
                }

                return candidateSkills;
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error retrieving data from the database");
            }

        }

        // PUT: api/CandidateSkills/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<ActionResult<CandidateSkills>> UpdateCandidateSkills(int id, CandidateSkills candidateskills)
        {
            try
            {
                if (id != candidateskills.SkillSetId)
                    return BadRequest("Skill ID mismatch");

                var skillToUpdate = await _candidateskills.GetCandidateSkillsById(id);

                if (skillToUpdate == null)
                    return NotFound($"Skill with Id = {id} not found");

                return await _candidateskills.UpdateCandidateSkills(candidateskills);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error updating data");
            }
        }


        // POST: api/CandidateSkills
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<CandidateSkills>> PostCandidateSkills(CandidateSkills candidateSkills)
        {
            return await _candidateskills.AddCandidateSkills(candidateSkills);
        }



        // DELETE: api/CandidateSkills/5
        [HttpDelete("Skill/{id}")]
        public async Task<ActionResult<CandidateSkills>> DeleteCandidateSkills(int id)
        {
            return await _candidateskills.DeleteCandidateSkills(id);
        }

        private bool CandidateSkillsExists(int id)
        {
            return _context.CandidateSkills.Any(e => e.SkillSetId == id);
        }
    }
}
