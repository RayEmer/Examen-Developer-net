using System.ComponentModel.DataAnnotations;

namespace ExamenDeveloperAPI.Entities
{
    public class Cliente
    {
        [Key]
        public int ClienteId { get; set; }
        public string Nombre { get; set; }
        public string Apellidos { get; set; }
        public string Direccion { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}