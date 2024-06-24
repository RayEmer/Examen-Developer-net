using ExamenDeveloperAPI.Data;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace ExamenDeveloperAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PruebaController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PruebaController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var clientes = _context.Clientes.ToList();
            return Ok(clientes);
        }
    }
}
