using backend.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace backend.Repositories
{
    public interface ISkills
    {
        Task<ActionResult<IEnumerable<Skills>>> GetAllSkills();

        Task<Skills> AddSkills(Skills skills);

        Task<ActionResult<Skills>> DeleteSkills(int skillid);

        Task<Skills> UpdateSkills(Skills skills);

        Task<Skills> GetSkill(int SkillId);

        Task<IEnumerable<Skills>> Search(string name);
    }
}
