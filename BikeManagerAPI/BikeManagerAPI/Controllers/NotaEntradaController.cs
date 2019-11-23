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
    public class NotaEntradaController : ControllerBase
    {
        private readonly BikeManagerContext _context;

        public NotaEntradaController(BikeManagerContext context)
        {
            _context = context;
        }

        // GET: api/NotaEntrada
        [HttpGet]
        public IEnumerable<NotaEntrada> GetNotaEntrada()
        {
            return _context.NotaEntrada;
        }

        // GET: api/NotaEntrada/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetNotaEntrada([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var notaEntrada = await _context.NotaEntrada.FindAsync(id);

            if (notaEntrada == null)
            {
                return NotFound();
            }

            return Ok(notaEntrada);
        }

        // PUT: api/NotaEntrada/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutNotaEntrada([FromRoute] int id, [FromBody] NotaEntrada notaEntrada)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != notaEntrada.CdNotaEntrada)
            {
                return BadRequest();
            }

            notaEntrada.DtAlteracao = DateTime.Now;

            _context.Entry(notaEntrada).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NotaEntradaExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(notaEntrada);
        }

        // POST: api/NotaEntrada
        [HttpPost]
        public async Task<IActionResult> PostNotaEntrada([FromBody] NotaEntrada notaEntrada)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            notaEntrada.DtRegistro = DateTime.Now;

            _context.NotaEntrada.Add(notaEntrada);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (NotaEntradaExists(notaEntrada.CdNotaEntrada))
                {
                    return new StatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetNotaEntrada", new { id = notaEntrada.CdNotaEntrada }, notaEntrada);
        }

        // DELETE: api/NotaEntrada/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNotaEntrada([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var notaEntrada = await _context.NotaEntrada.FindAsync(id);
            if (notaEntrada == null)
            {
                return NotFound();
            }

            _context.NotaEntrada.Remove(notaEntrada);
            await _context.SaveChangesAsync();

            return Ok(notaEntrada);
        }

        private bool NotaEntradaExists(int id)
        {
            return _context.NotaEntrada.Any(e => e.CdNotaEntrada == id);
        }

        [HttpGet("GetLastId")]
        public int GetLastId()
        {
            return _context.NotaEntrada.Count() + 1;
        }
    }
}