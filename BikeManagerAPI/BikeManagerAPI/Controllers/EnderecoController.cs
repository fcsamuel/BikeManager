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
    public class EnderecoController : ControllerBase
    {
        private readonly BikeManagerContext _context;

        public EnderecoController(BikeManagerContext context)
        {
            _context = context;
        }

        // GET: api/Endereco
        [HttpGet]
        public IEnumerable<Endereco> GetEndereco()
        {
            return _context.Endereco;
        }

        // GET: api/Endereco/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetEndereco([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var endereco = await _context.Endereco.FindAsync(id);

            if (endereco == null)
            {
                return NotFound();
            }

            return Ok(endereco);
        }

        // PUT: api/Endereco/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEndereco([FromRoute] int id, [FromBody] Endereco endereco)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != endereco.CdEndereco)
            {
                return BadRequest();
            }

            endereco.DtAlteracao = DateTime.Now;

            _context.Entry(endereco).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EnderecoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(endereco);
        }

        // POST: api/Endereco
        [HttpPost]
        public async Task<IActionResult> PostEndereco([FromBody] Endereco endereco)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            endereco.DtAlteracao = DateTime.Now;

            _context.Endereco.Add(endereco);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (EnderecoExists(endereco.CdEndereco))
                {
                    return new StatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetEndereco", new { id = endereco.CdEndereco }, endereco);
        }

        // DELETE: api/Endereco/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEndereco([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var endereco = await _context.Endereco.FindAsync(id);
            if (endereco == null)
            {
                return NotFound();
            }

            _context.Endereco.Remove(endereco);
            await _context.SaveChangesAsync();

            return Ok(endereco);
        }

        private bool EnderecoExists(int id)
        {
            return _context.Endereco.Any(e => e.CdEndereco == id);
        }
    }
}