using System;

namespace ExamenDeveloperAPI.Entities
{
    public class ClienteArticulo
    {
        public int ClienteId { get; set; }
        public int ArticuloId { get; set; }
        public DateTime Fecha { get; set; }
        public int Cantidad { get; set; } 
        public Cliente Cliente { get; set; }
        public Articulo Articulo { get; set; }
    }
}