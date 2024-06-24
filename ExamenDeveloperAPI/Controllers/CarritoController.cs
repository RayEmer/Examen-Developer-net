using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ExamenDeveloperAPI.Data;
using ExamenDeveloperAPI.Entities;

namespace ExamenDeveloperAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CarritoController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CarritoController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost("finalizar-compra")]
        public async Task<IActionResult> FinalizarCompra([FromBody] List<ClienteArticulo> items)
        {
            if (items == null || items.Count == 0)
            {
                return BadRequest("No hay artículos en el carrito.");
            }

            foreach (var item in items)
            {
                var existingEntity = await _context.ClienteArticulos
                    .FirstOrDefaultAsync(e => e.ClienteId == item.ClienteId && e.ArticuloId == item.ArticuloId);

                if (existingEntity != null)
                {
                    existingEntity.Cantidad += item.Cantidad;
                    existingEntity.Fecha = DateTime.UtcNow;
                    _context.ClienteArticulos.Update(existingEntity);
                }
                else
                {
                    item.Fecha = DateTime.UtcNow;
                    _context.ClienteArticulos.Add(item);
                }

                // Actualizar el stock del artículo
                var articulo = await _context.Articulos.FirstOrDefaultAsync(a => a.ArticuloId == item.ArticuloId);
                if (articulo != null)
                {
                    articulo.Stock -= item.Cantidad;
                    if (articulo.Stock < 0)
                    {
                        return BadRequest($"No hay suficiente stock para el artículo con ID {articulo.ArticuloId}.");
                    }
                    _context.Articulos.Update(articulo);
                }
            }

            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
