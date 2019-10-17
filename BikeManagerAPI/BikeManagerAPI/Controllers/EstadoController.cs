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
    public class EstadoController : ControllerBase
    {
        private readonly BikeManagerContext _context;

        public EstadoController(BikeManagerContext context)
        {
            _context = context;
        }

        // GET: api/Estado
        [HttpGet]
        public IEnumerable<Estado> GetEstado()
        {
            return _context.Estado;
        }

        // GET: api/Estado/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetEstado([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var estado = await _context.Estado.FindAsync(id);

            if (estado == null)
            {
                return NotFound();
            }

            return Ok(estado);
        }

        // PUT: api/Estado/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEstado([FromRoute] int id, [FromBody] Estado estado)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != estado.CdEstado)
            {
                return BadRequest();
            }

            estado.DtAlteracao = DateTime.Now;

            _context.Entry(estado).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EstadoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(estado);
        }

        // POST: api/Estado
        [HttpPost]
        public async Task<IActionResult> PostEstado([FromBody] Estado estado)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            estado.DtRegistro = DateTime.Now;

            _context.Estado.Add(estado);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (EstadoExists(estado.CdEstado))
                {
                    return new StatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetEstado", new { id = estado.CdEstado }, estado);
        }

        // DELETE: api/Estado/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEstado([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var estado = await _context.Estado.FindAsync(id);
            if (estado == null)
            {
                return NotFound();
            }

            _context.Estado.Remove(estado);
            await _context.SaveChangesAsync();

            return Ok(estado);
        }

        private bool EstadoExists(int id)
        {
            return _context.Estado.Any(e => e.CdEstado == id);
        }
    }
}