import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Articulo } from '../models/articulo.model';

@Injectable({
  providedIn: 'root'
})
export class ArticuloService {
  private apiUrl = 'http://localhost:5000/api/articulos';

  constructor(private http: HttpClient) { }

  getArticulosConStock(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/con-stock`);
  }

  getAllArticulos(): Observable<Articulo[]> {
    return this.http.get<Articulo[]>(`${this.apiUrl}/todos`);
  }

  createArticulo(formData: FormData): Observable<Articulo> {
    return this.http.post<Articulo>(`${this.apiUrl}/upload`, formData);
  }

  asignarTienda(data: any): Observable<any> {
    return this.http.post<Articulo>(`${this.apiUrl}/asignar-tienda`, data);
  }
}