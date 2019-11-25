using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BikeManagerAPI.Models;

namespace BikeManagerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContaController : ControllerBase
    {
        private readonly BikeManagerContext _context;

        public ContaController(BikeManagerContext context)
        {
            _context = context;
        }

        // GET: api/Conta
        [HttpGet]
        public IEnumerable<Conta> GetConta()
        {
            return _context.Conta;
        }

        // GET: api/Conta/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetConta([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var conta = await _context.Conta.FindAsync(id);

            if (conta == null)
            {
                return NotFound();
            }

            return Ok(conta);
        }

        // PUT: api/Conta/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutConta([FromRoute] int id, [FromBody] Conta conta)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != conta.CdConta)
            {
                return BadRequest();
            }

            conta.DtAlteracao = DateTime.Now;

            _context.Entry(conta).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ContaExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(conta);
        }

        // POST: api/Conta
        [HttpPost]
        public async Task<IActionResult> PostConta([FromBody] Conta conta)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            conta.DtRegistro = DateTime.Now;

            _context.Conta.Add(conta);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ContaExists(conta.CdConta))
                {
                    return new StatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetConta", new { id = conta.CdConta }, conta);
        }

        // DELETE: api/Conta/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteConta([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var conta = await _context.Conta.FindAsync(id);
            if (conta == null)
            {
                return NotFound();
            }

            _context.Conta.Remove(conta);
            await _context.SaveChangesAsync();

            return Ok(conta);
        }

        private bool ContaExists(int id)
        {
            return _context.Conta.Any(e => e.CdConta == id);
        }

        [HttpGet("GetLastId")]
        public int GetLastId()
        {
            return _context.Conta.Count() + 1;
        }
            
    }
}