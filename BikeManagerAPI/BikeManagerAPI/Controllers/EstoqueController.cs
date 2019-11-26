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
    public class EstoqueController : ControllerBase
    {
        private readonly BikeManagerContext _context;

        public EstoqueController(BikeManagerContext context)
        {
            _context = context;
        }

        // GET: api/Estoque
        [HttpGet]
        public IEnumerable<Estoque> GetEstoque()
        {
            return _context.Estoque;
        }

        // GET: api/Estoque/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetEstoque([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var estoque = await _context.Estoque.FindAsync(id);

            if (estoque == null)
            {
                return NotFound();
            }

            return Ok(estoque);
        }

        // PUT: api/Estoque/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEstoque([FromRoute] int id, [FromBody] Estoque estoque)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != estoque.CdProduto)
            {
                return BadRequest();
            }

            estoque.DtAlteracao = DateTime.Now;

            _context.Entry(estoque).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EstoqueExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(estoque);
        }

        // POST: api/Estoque
        [HttpPost]
        public async Task<IActionResult> PostEstoque([FromBody] Estoque estoque)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            estoque.DtRegistro = DateTime.Now;

            _context.Estoque.Add(estoque);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (EstoqueExists(estoque.CdProduto))
                {
                    return new StatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetEstoque", new { id = estoque.CdProduto }, estoque);
        }

        // DELETE: api/Estoque/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEstoque([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var estoque = await _context.Estoque.FindAsync(id);
            if (estoque == null)
            {
                return NotFound();
            }

            _context.Estoque.Remove(estoque);
            await _context.SaveChangesAsync();

            return Ok(estoque);
        }

        private bool EstoqueExists(int id)
        {
            return _context.Estoque.Any(e => e.CdProduto == id);
        }

        [HttpGet("FindStockByProduct/{id}")]
        public IEnumerable<Estoque> FindStockByProduct(int id)
        {
            return _context.Estoque.Where(e => e.CdProduto == id);
        }

        [HttpGet("GetLastId")]
        public int GetLastId()  
        {
            return _context.Estoque.Count() + 1;
        }

        [HttpGet("GetLastStockOfProduct/{id}")]
        public Estoque GetLastStockOfProduct(int id)
        {
            return _context.Estoque.Where(e => e.CdProduto == id).LastOrDefault();
        }
    }
}