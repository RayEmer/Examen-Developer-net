using Microsoft.AspNetCore.Mvc;
using System.IO;

namespace ExamenDeveloperAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImagesController : ControllerBase
    {
        [HttpGet("{filename}")]
        public IActionResult GetImage(string filename)
        {
            var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/assets/productos", filename);

            if (!System.IO.File.Exists(path))
            {
                return NotFound();
            }

            var image = System.IO.File.OpenRead(path);
            return File(image, "image/jpeg");
        }
    }
}
