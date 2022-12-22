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
    public class SkillService : ISkills
    {
        private readonly CGDbContext _context;
        
        public SkillService(CGDbContext context) {
         _context = context;
         
        }
        public async Task<ActionResult<IEnumerable<Skills>>> GetAllSkills()
        {
            return await _context.Skills.ToListAsync();
        }

        public async Task<Skills> AddSkills(Skills skills)
        {
            var result = await _context.Skills.AddAsync(skills);
            await _context.SaveChangesAsync();
            return result.Entity;
        }

        public async Task<ActionResult<Skills>> DeleteSkills(int SkillId)
        {
            var skills = await _context.Skills.FindAsync(SkillId);
            if (skills == null)
            {
                return null;
            }

            _context.Skills.Remove(skills);
            await _context.SaveChangesAsync();

            return skills;
        }

        public async Task<Skills> UpdateSkills(Skills skills)
        {
            var result = await _context.Skills
                .FirstOrDefaultAsync(u => u.SkillId == skills.SkillId);

            if (result != null)
            {
                result.SkillId = skills.SkillId;
                result.SkillName = skills.SkillName;

                await _context.SaveChangesAsync();

                return result;
            }

            return null;
        }

        public async Task<IEnumerable<Skills>> Search(string SkillName)
        {
            IQueryable<Skills> query = _context.Skills;
            if (!string.IsNullOrEmpty(SkillName))
            {
                query = query.Where(x => x.SkillName.Contains(SkillName));
            }
            return await query.ToListAsync();
        }

        public async Task<Skills> GetSkill(int SkillId)
        {
            return await _context.Skills.FirstOrDefaultAsync(s => s.SkillId == SkillId);
        }

    }
}
