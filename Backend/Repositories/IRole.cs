using backend.Models;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace backend.Repositories
{
    public interface IRole
    {
        Task<ActionResult<IEnumerable<Role>>> GetAllRoles();
        Task<Role> AddRole(Role role);
        Task<Role> UpdateRole(Role role);
        Task<Role> GetRole(int RoleId);
        //string DeleteRole(int RoleId);
        Task<ActionResult<Role>> DeleteRole(int id);



    }
}
