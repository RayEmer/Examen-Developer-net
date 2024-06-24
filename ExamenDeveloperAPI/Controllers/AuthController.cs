using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using ExamenDeveloperAPI.Data;
using ExamenDeveloperAPI.Entities;
using ExamenDeveloperAPI.Services;

namespace ExamenDeveloperAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly TokenService _tokenService;

        public AuthController(ApplicationDbContext context, TokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] Cliente cliente)
        {
            var user = await _context.Clientes
                .FirstOrDefaultAsync(c => c.Email == cliente.Email);

            if (user == null || user.Password != cliente.Password)
                return Unauthorized();

            var token = _tokenService.GenerateToken(user);
            return Ok(new { token });
        }

    [HttpPost("register")]
public async Task<IActionResult> Register([FromBody] Cliente cliente)
{
    _context.Clientes.Add(cliente);
    await _context.SaveChangesAsync();
    return Ok(cliente);
}

    }
}
