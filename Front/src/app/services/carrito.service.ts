import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private apiUrl = 'http://localhost:5000/api/carrito'; // Cambia esta URL según tu configuración

  constructor(private http: HttpClient) { }

  finalizarCompra(clienteId: number, articulos: any[]): Observable<any> {
    const items = articulos.reduce((acc, articulo) => {
        const existingItem = acc.find((item: any) => item.articuloId === articulo.articuloId);
        if (existingItem) {
            existingItem.cantidad += articulo.cantidad;
        } else {
            acc.push({
                clienteId: clienteId*1,
                articuloId: articulo.articuloId,
                cantidad: articulo.cantidad,
                fecha: new Date().toISOString()
            });
        }
        return acc;
    }, [] as any[]);

    console.log("Items a enviar:", items); // Verificar los datos antes de enviar

    return this.http.post(`${this.apiUrl}/finalizar-compra`, items);
}



}
