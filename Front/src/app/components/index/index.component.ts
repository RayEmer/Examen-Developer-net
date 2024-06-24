import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { ArticuloService } from '../../services/articulo.service';
import { Articulo } from '../../models/articulo.model';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  articulos: Articulo[] = [];
  notificationMessage: string = '';

  @ViewChild('notificacionModal', { static: true }) notificacionModal!: ElementRef;

  constructor(
    private articuloService: ArticuloService,
    private renderer: Renderer2,
    private appComponent: AppComponent // Inyecta AppComponent para actualizar el contador
  ) { }

  ngOnInit(): void {
    this.articuloService.getArticulosConStock().subscribe(data => {
      this.articulos = data;
    });
  }

  agregarAlCarrito(articulo: Articulo): void {
    const carrito = this.obtenerCarrito();
    const itemExistente = carrito.find(item => item.articuloId === articulo.articuloId);

    if (itemExistente) {
      if (itemExistente.cantidad < articulo.stock) {
        itemExistente.cantidad++;
        this.mostrarNotificacion('Artículo agregado al carrito.');
      } else {
        this.mostrarNotificacion('No puedes agregar más artículos de los que hay en stock.');
      }
    } else {
      carrito.push({ ...articulo, cantidad: 1 });
      this.mostrarNotificacion('Artículo agregado al carrito.');
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    this.appComponent.actualizarCarritoCount(); // Actualiza el contador en el navbar
  }

  obtenerCarrito(): any[] {
    const carrito = localStorage.getItem('carrito');
    return carrito ? JSON.parse(carrito) : [];
  }

  mostrarNotificacion(mensaje: string): void {
    this.notificationMessage = mensaje;
    this.renderer.setStyle(this.notificacionModal.nativeElement, 'display', 'block');
    this.renderer.addClass(document.body, 'modal-open');
  }

  closeNotificationModal(): void {
    this.renderer.setStyle(this.notificacionModal.nativeElement, 'display', 'none');
    this.renderer.removeClass(document.body, 'modal-open');
  }
}