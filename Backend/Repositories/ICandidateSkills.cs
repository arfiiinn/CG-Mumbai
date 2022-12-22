using backend.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace backend.Repositories
{
    public interface ICandidateSkills
    {
        Task<ActionResult<IEnumerable<CandidateSkills>>> GetCandidateSkills();
        Task<ActionResult<CandidateSkills>> GetCandidateSkillsById(int id);
        Task<ActionResult<IEnumerable<CandidateSkills>>> GetCandidateSkillByUserId(int id);

        Task<CandidateSkills> UpdateCandidateSkills(CandidateSkills candidateSkills);
        Task<CandidateSkills> AddCandidateSkills(CandidateSkills candidateSkills);
        Task<ActionResult<CandidateSkills>> DeleteCandidateSkills(int SkillSetId);
    }
}
