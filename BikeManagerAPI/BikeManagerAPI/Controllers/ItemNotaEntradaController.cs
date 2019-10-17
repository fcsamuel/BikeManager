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
    public class ItemNotaEntradaController : ControllerBase
    {
        private readonly BikeManagerContext _context;

        public ItemNotaEntradaController(BikeManagerContext context)
        {
            _context = context;
        }

        // GET: api/ItemNotaEntrada
        [HttpGet]
        public IEnumerable<ItemNotaEntrada> GetItemNotaEntrada()
        {
            return _context.ItemNotaEntrada;
        }

        // GET: api/ItemNotaEntrada/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetItemNotaEntrada([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var itemNotaEntrada = await _context.ItemNotaEntrada.FindAsync(id);

            if (itemNotaEntrada == null)
            {
                return NotFound();
            }

            return Ok(itemNotaEntrada);
        }

        // PUT: api/ItemNotaEntrada/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutItemNotaEntrada([FromRoute] int id, [FromBody] ItemNotaEntrada itemNotaEntrada)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != itemNotaEntrada.CdProduto)
            {
                return BadRequest();
            }

            itemNotaEntrada.DtAlteracao = DateTime.Now;

            _context.Entry(itemNotaEntrada).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ItemNotaEntradaExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(itemNotaEntrada);
        }

        // POST: api/ItemNotaEntrada
        [HttpPost]
        public async Task<IActionResult> PostItemNotaEntrada([FromBody] ItemNotaEntrada itemNotaEntrada)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            itemNotaEntrada.DtRegistro = DateTime.Now;

            _context.ItemNotaEntrada.Add(itemNotaEntrada);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ItemNotaEntradaExists(itemNotaEntrada.CdProduto))
                {
                    return new StatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetItemNotaEntrada", new { id = itemNotaEntrada.CdProduto }, itemNotaEntrada);
        }

        // DELETE: api/ItemNotaEntrada/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteItemNotaEntrada([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var itemNotaEntrada = await _context.ItemNotaEntrada.FindAsync(id);
            if (itemNotaEntrada == null)
            {
                return NotFound();
            }

            _context.ItemNotaEntrada.Remove(itemNotaEntrada);
            await _context.SaveChangesAsync();

            return Ok(itemNotaEntrada);
        }

        private bool ItemNotaEntradaExists(int id)
        {
            return _context.ItemNotaEntrada.Any(e => e.CdProduto == id);
        }
    }
}