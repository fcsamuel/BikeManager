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
    public class ItemOrdemServicoController : ControllerBase
    {
        private readonly BikeManagerContext _context;

        public ItemOrdemServicoController(BikeManagerContext context)
        {
            _context = context;
        }

        // GET: api/ItemOrdemServico
        [HttpGet]
        public IEnumerable<ItemOrdemServico> GetItemOrdemServico()
        {
            return _context.ItemOrdemServico;
        }

        // GET: api/ItemOrdemServico/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetItemOrdemServico([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var itemOrdemServico = await _context.ItemOrdemServico.FindAsync(id);

            if (itemOrdemServico == null)
            {
                return NotFound();
            }

            return Ok(itemOrdemServico);
        }

        // PUT: api/ItemOrdemServico/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutItemOrdemServico([FromRoute] int id, [FromBody] ItemOrdemServico itemOrdemServico)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != itemOrdemServico.CdProduto)
            {
                return BadRequest();
            }

            itemOrdemServico.DtAlteracao = DateTime.Now;

            _context.Entry(itemOrdemServico).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ItemOrdemServicoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(itemOrdemServico);
        }

        // POST: api/ItemOrdemServico
        [HttpPost]
        public async Task<IActionResult> PostItemOrdemServico([FromBody] ItemOrdemServico itemOrdemServico)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            itemOrdemServico.DtAlteracao = DateTime.Now;

            _context.ItemOrdemServico.Add(itemOrdemServico);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ItemOrdemServicoExists(itemOrdemServico.CdProduto))
                {
                    return new StatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetItemOrdemServico", new { id = itemOrdemServico.CdProduto }, itemOrdemServico);
        }

        // DELETE: api/ItemOrdemServico/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteItemOrdemServico([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var itemOrdemServico = await _context.ItemOrdemServico.FindAsync(id);
            if (itemOrdemServico == null)
            {
                return NotFound();
            }

            _context.ItemOrdemServico.Remove(itemOrdemServico);
            await _context.SaveChangesAsync();

            return Ok(itemOrdemServico);
        }

        private bool ItemOrdemServicoExists(int id)
        {
            return _context.ItemOrdemServico.Any(e => e.CdProduto == id);
        }
    }
}