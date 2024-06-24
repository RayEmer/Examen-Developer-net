import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ExamenPractico';
  showNavbar = true;
  carritoCount: number = 0;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showNavbar = !(event.url === '/login' || event.url === '/registro');
        if (event.url === '/login' && this.authService.isAuthenticated()) {
          this.router.navigate(['/index']);
        } else if (!this.authService.isAuthenticated() && event.url !== '/login' && event.url !== '/registro') {
          this.router.navigate(['/login']);
        }
      }
    });
    this.actualizarCarritoCount();
  }

  actualizarCarritoCount(): void {
    const carrito = this.obtenerCarrito();
    this.carritoCount = carrito.reduce((count, item) => count + Number(item.cantidad), 0);
  }

  obtenerCarrito(): any[] {
    const carrito = localStorage.getItem('carrito');
    return carrito ? JSON.parse(carrito) : [];
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
