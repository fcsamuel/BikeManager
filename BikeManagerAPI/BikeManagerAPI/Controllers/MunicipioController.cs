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
    public class MunicipioController : ControllerBase
    {
        private readonly BikeManagerContext _context;

        public MunicipioController(BikeManagerContext context)
        {
            _context = context;
        }

        // GET: api/Municipio
        [HttpGet]
        public IEnumerable<Municipio> GetMunicipio()
        {
            return _context.Municipio;
        }

        // GET: api/Municipio/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetMunicipio([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var municipio = await _context.Municipio.FindAsync(id);

            if (municipio == null)
            {
                return NotFound();
            }

            return Ok(municipio);
        }

        // PUT: api/Municipio/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMunicipio([FromRoute] int id, [FromBody] Municipio municipio)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != municipio.CdMunicipio)
            {
                return BadRequest();
            }

            municipio.DtRegistro = DateTime.Now;

            _context.Entry(municipio).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MunicipioExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(municipio);
        }

        // POST: api/Municipio
        [HttpPost]
        public async Task<IActionResult> PostMunicipio([FromBody] Municipio municipio)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            municipio.DtRegistro = DateTime.Now;

            _context.Municipio.Add(municipio);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (MunicipioExists(municipio.CdMunicipio))
                {
                    return new StatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetMunicipio", new { id = municipio.CdMunicipio }, municipio);
        }

        // DELETE: api/Municipio/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMunicipio([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var municipio = await _context.Municipio.FindAsync(id);
            if (municipio == null)
            {
                return NotFound();
            }

            _context.Municipio.Remove(municipio);
            await _context.SaveChangesAsync();

            return Ok(municipio);
        }

        private bool MunicipioExists(int id)
        {
            return _context.Municipio.Any(e => e.CdMunicipio == id);
        }
    }
}