using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System;

namespace ExamenDeveloperAPI.Entities
{
public class Articulo
{
    public int ArticuloId { get; set; }
    public string Codigo { get; set; }
    public string Descripcion { get; set; }
    public decimal Precio { get; set; }
    public string Imagen { get; set; }
    public int Stock { get; set; }
    public int TiendaId { get; set; }  // Agregar esta propiedad
}

}
