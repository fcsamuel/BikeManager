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
    public class FormaPagamentoController : ControllerBase
    {
        private readonly BikeManagerContext _context;

        public FormaPagamentoController(BikeManagerContext context)
        {
            _context = context;
        }

        // GET: api/FormaPagamento
        [HttpGet]
        public IEnumerable<FormaPagamento> GetFormaPagamento()
        {
            return _context.FormaPagamento;
        }

        // GET: api/FormaPagamento/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetFormaPagamento([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var formaPagamento = await _context.FormaPagamento.FindAsync(id);

            if (formaPagamento == null)
            {
                return NotFound();
            }

            return Ok(formaPagamento);
        }

        // PUT: api/FormaPagamento/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFormaPagamento([FromRoute] int id, [FromBody] FormaPagamento formaPagamento)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != formaPagamento.CdFormaPagamento)
            {
                return BadRequest();
            }

            formaPagamento.DtAlteracao = DateTime.Now;

            _context.Entry(formaPagamento).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FormaPagamentoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(formaPagamento);
        }

        // POST: api/FormaPagamento
        [HttpPost]
        public async Task<IActionResult> PostFormaPagamento([FromBody] FormaPagamento formaPagamento)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            formaPagamento.DtRegistro = DateTime.Now;

            _context.FormaPagamento.Add(formaPagamento);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (FormaPagamentoExists(formaPagamento.CdFormaPagamento))
                {
                    return new StatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetFormaPagamento", new { id = formaPagamento.CdFormaPagamento }, formaPagamento);
        }

        // DELETE: api/FormaPagamento/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFormaPagamento([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var formaPagamento = await _context.FormaPagamento.FindAsync(id);
            if (formaPagamento == null)
            {
                return NotFound();
            }

            _context.FormaPagamento.Remove(formaPagamento);
            await _context.SaveChangesAsync();

            return Ok(formaPagamento);
        }

        private bool FormaPagamentoExists(int id)
        {
            return _context.FormaPagamento.Any(e => e.CdFormaPagamento == id);
        }
    }
}