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
    public class OrdemServicoController : ControllerBase
    {
        private readonly BikeManagerContext _context;

        public OrdemServicoController(BikeManagerContext context)
        {
            _context = context;
        }

        // GET: api/OrdemServico
        [HttpGet]
        public IEnumerable<OrdemServico> GetOrdemServico()
        {
            return _context.OrdemServico.Include(os => os.ClienteFornecedor).Include(os => os.ItemList).AsNoTracking(); 
        }

        // GET: api/OrdemServico/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetOrdemServico([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var ordemServico = await _context.OrdemServico.FindAsync(id);

            if (ordemServico == null)
            {
                return NotFound();
            }

            return Ok(ordemServico);
        }

        // PUT: api/OrdemServico/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrdemServico([FromRoute] int id, [FromBody] OrdemServico ordemServico)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != ordemServico.CdOrdemServico)
            {
                return BadRequest();
            }

            ordemServico.DtAlteracao = DateTime.Now;

            _context.Entry(ordemServico).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrdemServicoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(ordemServico);
        }

        // POST: api/OrdemServico
        [HttpPost]
        public async Task<IActionResult> PostOrdemServico([FromBody] OrdemServico ordemServico)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            ordemServico.DtRegistro = DateTime.Now;

            if (ordemServico.CdConta == 0)
            {
                var idConta = _context.Conta.Count() + 1;
                ordemServico.CdConta = idConta;
                ordemServico.Conta.CdConta = idConta;
                
                
            }

            ordemServico.ItemList.ToList().ForEach(i => i.Produto = null);

            _context.OrdemServico.Add(ordemServico);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (OrdemServicoExists(ordemServico.CdOrdemServico))
                {
                    return new StatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw;
                }
            }

            //return CreatedAtAction("GetOrdemServico", new { id = ordemServico.CdOrdemServico }, ordemServico);
            return Ok(ordemServico);
        }

        // DELETE: api/OrdemServico/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrdemServico([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var ordemServico = await _context.OrdemServico.FindAsync(id);
            if (ordemServico == null)
            {
                return NotFound();
            }

            _context.OrdemServico.Remove(ordemServico);
            await _context.SaveChangesAsync();

            return Ok(ordemServico);
        }

        private bool OrdemServicoExists(int id)
        {
            return _context.OrdemServico.Any(e => e.CdOrdemServico == id);
        }

        [HttpGet("GetLastId")]
        public int GetLastId()
        {
            return _context.OrdemServico.Count() + 1;
        }
    }
}