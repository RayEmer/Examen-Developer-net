using Microsoft.AspNetCore.Mvc;
using ExamenDeveloperAPI.Data;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using ExamenDeveloperAPI.Entities;

namespace ExamenDeveloperAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TiendasController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TiendasController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("todos")]
        public async Task<ActionResult<IEnumerable<Tienda>>> GetTiendas()
        {
            return await _context.Tiendas.ToListAsync();
        }

        [HttpGet("hello")]
        public IActionResult GetHello()
        {
            return Ok("Hola mundo");
        }
    }
}
