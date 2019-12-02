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

        // GET: api/ItemList
        [HttpGet]
        public IEnumerable<ItemOrdemServico> GetItemOrdemServico()
        {
            return _context.ItemOrdemServico;
        }

        // GET: api/ItemList/5
        [HttpGet("{cdProduto}/{cdOrdemServico}")]
        public async Task<IActionResult> GetItemOrdemServico([FromRoute] int cdProduto, [FromRoute] int cdOrdemServico)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var itemOrdemServico = await _context.ItemOrdemServico.FindAsync(cdProduto, cdOrdemServico);

            if (itemOrdemServico == null)
            {
                return NotFound();
            }

            return Ok(itemOrdemServico);
        }

        // PUT: api/ItemList/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutItemOrdemServico([FromRoute] int cdProduto, [FromRoute] int cdOrdemServico, [FromBody] ItemOrdemServico itemOrdemServico)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (cdProduto != itemOrdemServico.CdProduto && cdOrdemServico != itemOrdemServico.CdOrdemServico)
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
                if (!ItemOrdemServicoExists(cdProduto, cdOrdemServico))
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

        // POST: api/ItemList
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
                if (ItemOrdemServicoExists(itemOrdemServico.CdProduto, itemOrdemServico.CdOrdemServico))
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

        // DELETE: api/ItemList/5
        [HttpDelete("{cdProduto}/{cdOrdemServico}")]
        public async Task<IActionResult> DeleteItemOrdemServico([FromRoute] int cdProduto, [FromRoute] int cdOrdemServico)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var itemOrdemServico = await _context.ItemOrdemServico.FindAsync(cdProduto, cdOrdemServico);
            if (itemOrdemServico == null)
            {
                return NotFound();
            }

            _context.ItemOrdemServico.Remove(itemOrdemServico);
            await _context.SaveChangesAsync();

            return Ok(itemOrdemServico);
        }

        private bool ItemOrdemServicoExists(int cdProduto, int cdOrdemServico)
        {
            return _context.ItemOrdemServico.Any(e => e.CdProduto == cdProduto && e.CdOrdemServico == cdOrdemServico);
        }
    }
}