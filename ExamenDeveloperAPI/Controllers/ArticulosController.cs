using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ExamenDeveloperAPI.Data;
using ExamenDeveloperAPI.Entities;
using Microsoft.AspNetCore.Http;
using System.IO;
using System;

namespace ExamenDeveloperAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArticulosController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ArticulosController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("con-stock")]
        public async Task<ActionResult<IEnumerable<Articulo>>> GetArticulosConStock()
        {
             var articulos = await _context.Articulos
            .Where(a => a.Stock > 0)
            .Select(a => new {
                a.ArticuloId,
                a.Codigo,
                a.Descripcion,
                a.Precio,
                ImagenUrl = Url.Action("GetImage", "Images", new { filename = a.Imagen }),
                a.Stock
            })
            .ToListAsync();

        return Ok(articulos);
        }

        [HttpGet("todos")]
        public async Task<ActionResult<IEnumerable<object>>> GetAllArticulos()
        {
            var articulos = await _context.Articulos
                .Select(a => new {
                    a.ArticuloId,
                    a.Codigo,
                    a.Descripcion,
                    a.Precio,
                    a.Imagen,
                    a.Stock,
                    ImagenUrl = Url.Action("GetImage", "Images", new { filename = a.Imagen }),
                    Tienda = _context.ArticuloTiendas
                        .Where(at => at.ArticuloId == a.ArticuloId)
                        .Select(at => at.Tienda.Sucursal)
                        .FirstOrDefault()
                })
                .ToListAsync();

            return Ok(articulos);
        }

        [HttpPost("upload")]
        public async Task<IActionResult> Upload([FromForm] IFormFile file, [FromForm] string descripcion, [FromForm] decimal precio, [FromForm] int stock, [FromForm] int tiendaId)
        {
            if (file == null || file.Length == 0)
                return BadRequest("No file uploaded.");

            var maxArticuloId = await _context.Articulos.MaxAsync(a => (int?)a.ArticuloId) ?? 0;
            var codigo = "A" + (maxArticuloId + 1).ToString("D3");

            var directoryPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "assets", "productos");
            if (!Directory.Exists(directoryPath))
            {
                Directory.CreateDirectory(directoryPath);
            }

            var path = Path.Combine(directoryPath, codigo + ".jpg");

            using (var stream = new FileStream(path, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            var articulo = new Articulo
            {
                Codigo = codigo,
                Descripcion = descripcion,
                Precio = precio,
                Stock = stock,
                Imagen = codigo + ".jpg",
                TiendaId = tiendaId
            };

            _context.Articulos.Add(articulo);
            await _context.SaveChangesAsync();

            return Ok(articulo);
        }

        [HttpPost("asignar-tienda")]
        public async Task<IActionResult> AsignarTienda([FromBody] AssignTiendaDto asignarTiendaDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var articuloTienda = new ArticuloTienda
            {
                ArticuloId = asignarTiendaDto.ArticuloId,
                TiendaId = asignarTiendaDto.TiendaId,
                Fecha = DateTime.Now
            };

            _context.ArticuloTiendas.Add(articuloTienda);
            await _context.SaveChangesAsync();

            return Ok(articuloTienda);
        }
    }
}
