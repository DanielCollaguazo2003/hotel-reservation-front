import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  constructor(private readonly _http: HttpClient) {}

  agregarServicio(servicio: any): Observable<any> {
    let url = `servicios`;

    let headers = new HttpHeaders();
    headers = headers.set('Auto-header', 'true');

    return this._http.post<any>(url, servicio,  { headers: headers });
  }

  obtenerServicios(): Observable<any[]> {
    let url = `servicios`;

    let headers = new HttpHeaders();
    headers = headers.set('Auto-header', 'true');

    return this._http.get<any[]>(url, { headers: headers });
  }

  addHabitacion(habitacion: any): Observable<{ idHabitacion: number }> {
    let apiUrl = `habitaciones`;

    let headers = new HttpHeaders();
    headers = headers.set('Auto-header', 'true');

    console.log('Realizando solicitud POST a:', habitacion);

    return this._http.post<{ idHabitacion: number }>(apiUrl, habitacion, { headers: headers });
  }

  getHabitaciones(): Observable<any[]> {
    let apiUrl = `habitaciones`;
    return this._http.get<any[]>(apiUrl);
  }

  addReserva(reserva: any): Observable<{ idReserva: number }> {
    let apiUrl = `reservas`;
    let headers = new HttpHeaders();
    headers = headers.set('Auto-header', 'true');

    return this._http.post<{ idReserva: number }>(apiUrl, reserva, { headers: headers });
  }

  getReservas(): Observable<any[]> {
    let apiUrl = `reservas`;

    return this._http.get<any[]>(apiUrl);
  }

  //Faturas
  addFactura(factura: any): Observable<{ idFactura: number }> {

    let apiUrl = `facturas`;

    let headers = new HttpHeaders();
    headers = headers.set('Auto-header', 'true');

    return this._http.post<{ idFactura: number }>(apiUrl, factura, { headers: headers });
  }

  getFacturas(): Observable<any[]> {
    let apiUrl = `facturas`;

    return this._http.get<any[]>(apiUrl);
  }

  //Pagos
  addPago(pago: any): Observable<{ idPago: number }> {
    let apiUrl = `pagos`;

    let headers = new HttpHeaders();
    headers = headers.set('Auto-header', 'true');

    return this._http.post<{ idPago: number }>(apiUrl, pago, { headers: headers });
  }

  getPagos(): Observable<any[]> {
    let apiUrl = `pagos`;

    return this._http.get<any[]>(apiUrl);
  }


}
