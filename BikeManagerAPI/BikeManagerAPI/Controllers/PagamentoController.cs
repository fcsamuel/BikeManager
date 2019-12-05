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
    public class PagamentoController : ControllerBase
    {
        private readonly BikeManagerContext _context;

        public PagamentoController(BikeManagerContext context)
        {
            _context = context;
        }

        // GET: api/Pagamento
        [HttpGet]
        public IEnumerable<Pagamento> GetPagamento()
        {
            return _context.Pagamento.Include(p => p.FormaPagamento).AsNoTracking();
        }

        // GET: api/Pagamento/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetPagamento([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var pagamento = await _context.Pagamento.FindAsync(id);

            if (pagamento == null)
            {
                return NotFound();
            }

            return Ok(pagamento);
        }

        // PUT: api/Pagamento/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPagamento([FromRoute] int id, [FromBody] Pagamento pagamento)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != pagamento.CdConta)
            {
                return BadRequest();
            }

            pagamento.DtAlteracao = DateTime.Now;

            _context.Entry(pagamento).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PagamentoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(pagamento);
        }

        // POST: api/Pagamento
        [HttpPost]
        public async Task<IActionResult> PostPagamento([FromBody] Pagamento pagamento)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            pagamento.DtAlteracao = DateTime.Now;

            _context.Pagamento.Add(pagamento);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (PagamentoExists(pagamento.CdConta))
                {
                    return new StatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetPagamento", new { id = pagamento.CdConta }, pagamento);
        }

        // DELETE: api/Pagamento/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePagamento([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var pagamento = await _context.Pagamento.FindAsync(id);
            if (pagamento == null)
            {
                return NotFound();
            }

            _context.Pagamento.Remove(pagamento);
            await _context.SaveChangesAsync();

            return Ok(pagamento);
        }

        private bool PagamentoExists(int id)
        {
            return _context.Pagamento.Any(e => e.CdConta == id);
        }

        [HttpGet("GetLastId")]
        public int GetLastId()
        {
            return _context.Pagamento.Count() + 1;
        }

        /*[HttpGet("GetParcelasByOrdemServicoList")]
        public IEnumerable<Pagamento> GetParcelasByOrdemServicoList(IEnumerable<OrdemServico> ordemServicoList)
        {
            foreach(OrdemServico os in ordemServicoList)
            {
                os.ClienteFornecedor
            }
            return _context.Pagamento.Where(p => p.);
        }*/

    }
}