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
    public class ItemOrcamentoController : ControllerBase
    {
        private readonly BikeManagerContext _context;

        public ItemOrcamentoController(BikeManagerContext context)
        {
            _context = context;
        }

        // GET: api/ItemOrcamento
        [HttpGet]
        public IEnumerable<ItemOrcamento> GetItemOrcamento()
        {
            return _context.ItemOrcamento;
        }

        // GET: api/ItemOrcamento/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetItemOrcamento([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var itemOrcamento = await _context.ItemOrcamento.FindAsync(id);

            if (itemOrcamento == null)
            {
                return NotFound();
            }

            return Ok(itemOrcamento);
        }

        // PUT: api/ItemOrcamento/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutItemOrcamento([FromRoute] int id, [FromBody] ItemOrcamento itemOrcamento)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != itemOrcamento.CdProduto)
            {
                return BadRequest();
            }

            itemOrcamento.DtAlteracao = DateTime.Now;

            _context.Entry(itemOrcamento).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ItemOrcamentoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(itemOrcamento);
        }

        // POST: api/ItemOrcamento
        [HttpPost]
        public async Task<IActionResult> PostItemOrcamento([FromBody] ItemOrcamento itemOrcamento)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            itemOrcamento.DtRegistro = DateTime.Now;

            _context.ItemOrcamento.Add(itemOrcamento);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ItemOrcamentoExists(itemOrcamento.CdProduto))
                {
                    return new StatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetItemOrcamento", new { id = itemOrcamento.CdProduto }, itemOrcamento);
        }

        // DELETE: api/ItemOrcamento/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteItemOrcamento([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var itemOrcamento = await _context.ItemOrcamento.FindAsync(id);
            if (itemOrcamento == null)
            {
                return NotFound();
            }

            _context.ItemOrcamento.Remove(itemOrcamento);
            await _context.SaveChangesAsync();

            return Ok(itemOrcamento);
        }

        private bool ItemOrcamentoExists(int id)
        {
            return _context.ItemOrcamento.Any(e => e.CdProduto == id);
        }
    }
}