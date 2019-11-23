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
    public class ContatoController : ControllerBase
    {
        private readonly BikeManagerContext _context;

        public ContatoController(BikeManagerContext context)
        {
            _context = context;
        }

        // GET: api/ContatoList
        [HttpGet]
        public IEnumerable<Contato> GetContato()
        {
            return _context.Contato;
        }

        // GET: api/ContatoList/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetContato([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var contato = await _context.Contato.FindAsync(id);

            if (contato == null)
            {
                return NotFound();
            }

            return Ok(contato);
        }

        // PUT: api/ContatoList/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutContato([FromRoute] int id, [FromBody] Contato contato)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != contato.CdContato)
            {
                return BadRequest();
            }

            contato.DtAlteracao = DateTime.Now;

            _context.Entry(contato).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ContatoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(contato);
        }

        // POST: api/ContatoList
        [HttpPost]
        public async Task<IActionResult> PostContato([FromBody] Contato contato)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            contato.DtRegistro = DateTime.Now;

            _context.Contato.Add(contato);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ContatoExists(contato.CdContato))
                {
                    return new StatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetContato", new { id = contato.CdContato }, contato);
        }

        // DELETE: api/ContatoList/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteContato([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var contato = await _context.Contato.FindAsync(id);
            if (contato == null)
            {
                return NotFound();
            }

            _context.Contato.Remove(contato);
            await _context.SaveChangesAsync();

            return Ok(contato);
        }

        private bool ContatoExists(int id)
        {
            return _context.Contato.Any(e => e.CdContato == id);
        }

        [HttpGet("GetLastId")]
        public int GetLastId()
        {
            return _context.Contato.Count() + 1;
        }
    }
}