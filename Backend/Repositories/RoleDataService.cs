using backend.Models;
using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace backend.Repositories
{
    public class RoleDataService : IRole
    {
        private readonly CGDbContext _context;
        public RoleDataService(CGDbContext context)
        {
            _context = context;
        }

        public async Task<Role> AddRole(Role role)
        {
            var result = await _context.Role.AddAsync(role);
            await _context.SaveChangesAsync();
            return result.Entity;
        }
        

        public async Task<ActionResult<IEnumerable<Role>>> GetAllRoles()
        {
            var Users = await _context.Role.ToListAsync();
            return Users;
        }

        public async Task<Role> GetRole(int RoleId)
        {
            return await _context.Role.FirstOrDefaultAsync(p => p.RoleId == RoleId);
        }


        public async Task<Role> UpdateRole(Role role)
        {
            //var result = await _context.Role.FindAsync(id);
            var result = await _context.Role
                .FirstOrDefaultAsync(e => e.RoleId == role.RoleId);
            if (result != null)
            {
                result.RoleName = role.RoleName;
                await _context.SaveChangesAsync();

                return result;
            }

            return null;
        }


        //public async string DeleteRole(int RoleId)
            public async Task<ActionResult<Role>> DeleteRole(int id)
        {
            var result = await _context.Role.FirstOrDefaultAsync(r => r.RoleId == id);
            if (result != null)
            {
                _context.Role.Remove(result);
                await _context.SaveChangesAsync();
                return result;
            }
            else
            {
                return null;
            }
        }




    }
}
