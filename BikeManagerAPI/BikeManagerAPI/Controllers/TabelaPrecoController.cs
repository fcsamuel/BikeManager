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
    public class TabelaPrecoController : ControllerBase
    {
        private readonly BikeManagerContext _context;

        public TabelaPrecoController(BikeManagerContext context)
        {
            _context = context;
        }

        // GET: api/TabelaPrecoList
        [HttpGet]
        public IEnumerable<TabelaPreco> GetTabelaPreco()
        {
            return _context.TabelaPreco;
        }

        // GET: api/TabelaPrecoList/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTabelaPreco([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var tabelaPreco = await _context.TabelaPreco.FindAsync(id);

            if (tabelaPreco == null)
            {
                return NotFound();
            }

            return Ok(tabelaPreco);
        }

        // PUT: api/TabelaPrecoList/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTabelaPreco([FromRoute] int id, [FromBody] TabelaPreco tabelaPreco)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != tabelaPreco.CdTabelaPreco)
            {
                return BadRequest();
            }

            tabelaPreco.DtAlteracao = DateTime.Now;

            _context.Entry(tabelaPreco).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TabelaPrecoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(tabelaPreco);
        }

        // POST: api/TabelaPrecoList
        [HttpPost]
        public async Task<IActionResult> PostTabelaPreco([FromBody] TabelaPreco tabelaPreco)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            tabelaPreco.DtAlteracao = DateTime.Now;

            _context.TabelaPreco.Add(tabelaPreco);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (TabelaPrecoExists(tabelaPreco.CdTabelaPreco))
                {
                    return new StatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetTabelaPreco", new { id = tabelaPreco.CdTabelaPreco }, tabelaPreco);
        }

        // DELETE: api/TabelaPrecoList/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTabelaPreco([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var tabelaPreco = await _context.TabelaPreco.FindAsync(id);
            if (tabelaPreco == null)
            {
                return NotFound();
            }

            _context.TabelaPreco.Remove(tabelaPreco);
            await _context.SaveChangesAsync();

            return Ok(tabelaPreco);
        }

        private bool TabelaPrecoExists(int id)
        {
            return _context.TabelaPreco.Any(e => e.CdTabelaPreco == id);
        }
    }
}