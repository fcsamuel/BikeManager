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
    public class BicicletaController : ControllerBase
    {
        private readonly BikeManagerContext _context;

        public BicicletaController(BikeManagerContext context)
        {
            _context = context;
        }

        // GET: api/Bicicleta
        [HttpGet]
        public IEnumerable<Bicicleta> GetBicicleta()
        {
            return _context.Bicicleta;
        }

        // GET: api/Bicicleta/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetBicicleta([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var bicicleta = await _context.Bicicleta.FindAsync(id);

            if (bicicleta == null)
            {
                return NotFound();
            }

            return Ok(bicicleta);
        }

        // PUT: api/Bicicleta/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBicicleta([FromRoute] int id, [FromBody] Bicicleta bicicleta)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != bicicleta.CdBicicleta)
            {
                return BadRequest();
            }

            bicicleta.DtAlteracao = DateTime.Now;

            _context.Entry(bicicleta).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BicicletaExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(bicicleta);
        }

        // POST: api/Bicicleta
        [HttpPost]
        public async Task<IActionResult> PostBicicleta([FromBody] Bicicleta bicicleta)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            bicicleta.DtRegistro = DateTime.Now;

            _context.Bicicleta.Add(bicicleta);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (BicicletaExists(bicicleta.CdBicicleta))
                {
                    return new StatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetBicicleta", new { id = bicicleta.CdBicicleta }, bicicleta);
        }

        // DELETE: api/Bicicleta/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBicicleta([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var bicicleta = await _context.Bicicleta.FindAsync(id);
            if (bicicleta == null)
            {
                return NotFound();
            }

            _context.Bicicleta.Remove(bicicleta);
            await _context.SaveChangesAsync();

            return Ok(bicicleta);
        }

        private bool BicicletaExists(int id)
        {
            return _context.Bicicleta.Any(e => e.CdBicicleta == id);
        }

        [HttpGet("GetLastId")]
        public int GetLastId()
        {
            return _context.ClienteFornecedor.Count() + 1;
        }
    }
}