import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { AuthService } from '../../services/auth.service';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  carrito: any[] = [];
  total: number = 0;

  constructor(
    private carritoService: CarritoService,
    private authService: AuthService,
    private appComponent: AppComponent
  ) { }

  ngOnInit(): void {
    this.cargarCarrito();
  }

  cargarCarrito(): void {
    this.carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
    this.actualizarResumen();
  }

  eliminarDelCarrito(articulo: any): void {
    const index = this.carrito.findIndex((item) => item.articuloId === articulo.articuloId);
    if (index > -1) {
      this.carrito.splice(index, 1);
      localStorage.setItem('carrito', JSON.stringify(this.carrito));
      this.actualizarResumen();
      this.appComponent.actualizarCarritoCount();
    }
  }

  actualizarResumen(): void {
    this.total = this.carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
  }

  finalizarCompra(): void {
    const clienteId = this.authService.getUserIdFromToken();
    console.log("clienteId: ", clienteId); // Verifica el clienteId
    if (clienteId !== null) {
      this.carritoService.finalizarCompra(clienteId, this.carrito).subscribe(() => {
        alert('Compra finalizada');
        localStorage.removeItem('carrito');
        this.cargarCarrito();
        this.appComponent.actualizarCarritoCount();
      }, error => {
        console.error('Error al finalizar la compra', error);
        alert('Error al finalizar la compra');
      });
    } else {
      alert('Error: No se pudo obtener el ID del cliente');
    }
  }
}