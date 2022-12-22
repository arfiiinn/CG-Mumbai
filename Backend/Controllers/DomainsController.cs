using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Data;
using backend.Models;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DomainsController : ControllerBase
    {
        private readonly CGDbContext _context;

        public DomainsController(CGDbContext context)
        {
            _context = context;
        }

        // GET: api/Domains
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Domain>>> GetDomain()
        {
            return await _context.Domain.ToListAsync();
        }

        // GET: api/Domains/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Domain>> GetDomain(int id)
        {
            var domain = await _context.Domain.FindAsync(id);

            if (domain == null)
            {
                return NotFound();
            }

            return domain;
        }

        // PUT: api/Domains/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDomain(int id, Domain domain)
        {
            if (id != domain.DomainId)
            {
                return BadRequest();
            }

            _context.Entry(domain).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DomainExists(id))
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

        // POST: api/Domains
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Domain>> PostDomain(Domain domain)
        {
            _context.Domain.Add(domain);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDomain", new { id = domain.DomainId }, domain);
        }

        // DELETE: api/Domains/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Domain>> DeleteDomain(int id)
        {
            var domain = await _context.Domain.FindAsync(id);
            if (domain == null)
            {
                return NotFound();
            }

            _context.Domain.Remove(domain);
            await _context.SaveChangesAsync();

            return domain;
        }

        private bool DomainExists(int id)
        {
            return _context.Domain.Any(e => e.DomainId == id);
        }
    }
}
