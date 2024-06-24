using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ExamenDeveloperAPI.Entities
{
    public class Tienda
    {
        public int TiendaId { get; set; }
        public string Sucursal { get; set; }
        public string Direccion { get; set; }
        public ICollection<ArticuloTienda> ArticuloTiendas { get; set; }
    }
}
