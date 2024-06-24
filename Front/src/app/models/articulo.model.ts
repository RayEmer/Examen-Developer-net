export interface Articulo {
  articuloId: number;
  codigo: string;
  descripcion: string;
  precio: number;
  imagen: string;
  stock: number;
  tienda: Tienda;  // Asumiendo que la tienda está incluida en el modelo
  imagenUrl: string;  // Agrega esta línea
}

export interface Tienda {
  tiendaId: number;
  sucursal: string;
  direccion: string;
}
