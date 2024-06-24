import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tienda } from '../../models/tienda.model';

@Component({
  selector: 'app-tiendas',
  templateUrl: './tiendas.component.html',
  styleUrls: ['./tiendas.component.css']
})
export class TiendasComponent implements OnInit {
  tiendas: Tienda[] = [];
  newTienda: Tienda = {
    sucursal: '',
    direccion: ''
  };

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getTiendas();
  }

  getTiendas() {
    this.http.get<Tienda[]>('/api/tiendas').subscribe((data: Tienda[]) => {
      this.tiendas = data;
    });
  }

  addTienda() {
    this.http.post('/api/tiendas', this.newTienda).subscribe(() => {
      this.getTiendas();
      this.newTienda = { sucursal: '', direccion: '' };
    });
  }
}