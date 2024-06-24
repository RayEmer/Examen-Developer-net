using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ExamenDeveloperAPI.Entities
{
    public class ArticuloTienda
    {
        public int ArticuloId { get; set; }
        public Articulo Articulo { get; set; }
        public int TiendaId { get; set; }
        public Tienda Tienda { get; set; }
        public DateTime Fecha { get; set; }
    }
}
