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
using Microsoft.AspNetCore.Authorization;

namespace backend.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class RolesController : ControllerBase
    {
        private readonly CGDbContext _context;
        private readonly IRole _role;

        public RolesController(CGDbContext context, IRole role)
        {
            _context = context;
            _role = role;
        }

        // GET: api/Roles
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Role>>> GetRole()
        {
           
            var Users = await _role.GetAllRoles();
            return Users;
        }

       

        // GET: api/Roles/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Role>> GetRole(int id)
        {
            try
            {
                var role = await _role.GetRole(id);

                if (role == null)
                {
                    return NotFound();
                }

                return role;
            }
            catch(Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error retrieving data from the database");
            }
        }

        // PUT: api/Roles/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.

        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutRole(int id, Role role)
        //{
        //    if (id != role.RoleId)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(role).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!RoleExists(id))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return NoContent();
        //}

        [HttpPut("{id}")]
        public async Task<ActionResult<Role>> PutRole(int id, Role role)
        {
            try
            {
                if (id != role.RoleId)
                    return BadRequest("Role ID mismatch");

                var roleToUpdate = await _role.GetRole(id);

                if (roleToUpdate == null)
                {
                    return NotFound("Role not found");
                }
                else
                {
                    return await _role.UpdateRole(role);
                }
                   
                
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error updating data");
            }
        }

        // POST: api/Roles
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        
        [HttpPost]
        public async Task<ActionResult<Role>> PostRole(Role role)
        {
            try
            {
                if (role == null)
                    return BadRequest();

                var newrole = await _role.AddRole(role);

                return CreatedAtAction(nameof(GetRole),
                    new { id = newrole.RoleId }, newrole);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error creating new Role record");
            }
        }



        // DELETE: api/Roles/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Role>> DeleteRole(int id)
        {
            try
            {
                var role = await _role.GetRole(id);

                if (role == null)
                {
                    return NotFound("Role not found");
                }

                return await _role.DeleteRole(id);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error deleting data");
            }
        }

        private bool RoleExists(int id)
        {
            return _context.Role.Any(e => e.RoleId == id);
        }
    }
}
