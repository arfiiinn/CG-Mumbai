using backend.Models;
using backend.Repositories;
using Backend.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Data
{
    public class CandidateSkillsService :ICandidateSkills
    {
        private readonly CGDbContext _context;

        public CandidateSkillsService(CGDbContext context)
        {
            _context = context;

        }

        public async Task<ActionResult<IEnumerable<CandidateSkills>>> GetCandidateSkills()
        {
            return await _context.CandidateSkills.Include(u => u.User).Include(s => s.Skills).ToListAsync();
        }

        public async Task<ActionResult<CandidateSkills>> GetCandidateSkillsById(int id)
        {
            return await _context.CandidateSkills.Include(s => s.Skills).Where(r => r.SkillSetId == id).FirstAsync();

        }

        public async Task<ActionResult<IEnumerable<CandidateSkills>>> GetCandidateSkillByUserId(int id)
        {
            return await _context.CandidateSkills.Include(s => s.Skills).Where(r => r.UserId == id).ToListAsync();

        }

        public async Task<CandidateSkills> UpdateCandidateSkills(CandidateSkills candidateskills)
        {
            var result = await _context.CandidateSkills
                .FirstOrDefaultAsync(u => u.SkillSetId == candidateskills.SkillSetId);

            if (result != null)
            {
                result.SkillSetId = candidateskills.SkillSetId;
                result.SkillId = candidateskills.SkillId;
                result.UserId = candidateskills.UserId;
                result.Ratings = candidateskills.Ratings;
                  
                
                await _context.SaveChangesAsync();

                return result;
            }

            return null;
        }

        public async Task<CandidateSkills> AddCandidateSkills(CandidateSkills candidateSkills)
        {
            var result = await _context.CandidateSkills.AddAsync(candidateSkills);
            await _context.SaveChangesAsync();
            return result.Entity;
        }

        public async Task<ActionResult<CandidateSkills>> DeleteCandidateSkills(int SkillSetId)
        {
            var candidateskills = await _context.CandidateSkills.FindAsync(SkillSetId);
            if (candidateskills == null)
            {
                return null;
            }

            _context.CandidateSkills.Remove(candidateskills);
            await _context.SaveChangesAsync();

            return candidateskills;
        }


    }
}
