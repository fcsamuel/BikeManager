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
    public class OrcamentoController : ControllerBase
    {
        private readonly BikeManagerContext _context;

        public OrcamentoController(BikeManagerContext context)
        {
            _context = context;
        }

        // GET: api/Orcamento
        [HttpGet]
        public IEnumerable<Orcamento> GetOrcamento()
        {
            return _context.Orcamento;
        }

        // GET: api/Orcamento/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetOrcamento([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var orcamento = await _context.Orcamento.FindAsync(id);

            if (orcamento == null)
            {
                return NotFound();
            }

            return Ok(orcamento);
        }

        // PUT: api/Orcamento/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrcamento([FromRoute] int id, [FromBody] Orcamento orcamento)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != orcamento.CdOrcamento)
            {
                return BadRequest();
            }

            orcamento.DtAlteracao = DateTime.Now;

            _context.Entry(orcamento).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrcamentoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(orcamento);
        }

        // POST: api/Orcamento
        [HttpPost]
        public async Task<IActionResult> PostOrcamento([FromBody] Orcamento orcamento)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            orcamento.DtRegistro = DateTime.Now;

            _context.Orcamento.Add(orcamento);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (OrcamentoExists(orcamento.CdOrcamento))
                {
                    return new StatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetOrcamento", new { id = orcamento.CdOrcamento }, orcamento);
        }

        // DELETE: api/Orcamento/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrcamento([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var orcamento = await _context.Orcamento.FindAsync(id);
            if (orcamento == null)
            {
                return NotFound();
            }

            _context.Orcamento.Remove(orcamento);
            await _context.SaveChangesAsync();

            return Ok(orcamento);
        }

        private bool OrcamentoExists(int id)
        {
            return _context.Orcamento.Any(e => e.CdOrcamento == id);
        }
    }
}