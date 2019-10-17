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
    public class ClienteFornecedorController : ControllerBase
    {
        private readonly BikeManagerContext _context;

        public ClienteFornecedorController(BikeManagerContext context)
        {
            _context = context;
        }

        // GET: api/ClienteFornecedor
        [HttpGet]
        public IEnumerable<ClienteFornecedor> GetClienteFornecedor()
        {
            return _context.ClienteFornecedor;
        }

        // GET: api/ClienteFornecedor/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetClienteFornecedor([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var clienteFornecedor = await _context.ClienteFornecedor.FindAsync(id);

            if (clienteFornecedor == null)
            {
                return NotFound();
            }

            return Ok(clienteFornecedor);
        }

        // PUT: api/ClienteFornecedor/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutClienteFornecedor([FromRoute] int id, [FromBody] ClienteFornecedor clienteFornecedor)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != clienteFornecedor.CdClienteFornecedor)
            {
                return BadRequest();
            }

            clienteFornecedor.DtAlteracao = DateTime.Now;

            _context.Entry(clienteFornecedor).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ClienteFornecedorExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(clienteFornecedor);
        }

        // POST: api/ClienteFornecedor
        [HttpPost]
        public async Task<IActionResult> PostClienteFornecedor([FromBody] ClienteFornecedor clienteFornecedor)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            clienteFornecedor.DtRegistro = DateTime.Now;

            _context.ClienteFornecedor.Add(clienteFornecedor);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ClienteFornecedorExists(clienteFornecedor.CdClienteFornecedor))
                {
                    return new StatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetClienteFornecedor", new { id = clienteFornecedor.CdClienteFornecedor }, clienteFornecedor);
        }

        // DELETE: api/ClienteFornecedor/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteClienteFornecedor([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var clienteFornecedor = await _context.ClienteFornecedor.FindAsync(id);
            if (clienteFornecedor == null)
            {
                return NotFound();
            }

            _context.ClienteFornecedor.Remove(clienteFornecedor);
            await _context.SaveChangesAsync();

            return Ok(clienteFornecedor);
        }

        private bool ClienteFornecedorExists(int id)
        {
            return _context.ClienteFornecedor.Any(e => e.CdClienteFornecedor == id);
        }
    }
}