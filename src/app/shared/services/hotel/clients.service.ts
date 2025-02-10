import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from 'src/app/models/client';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private readonly _http: HttpClient) {}

  addClient(client: Cliente): Observable<{ idClient: number }> {
    let url = `clientes`;

    let headers = new HttpHeaders();
    headers = headers.set('Auto-header', 'true');

    return this._http.post<{ idClient: number }>(url, client, { headers: headers });
  }

  getClients(): Observable<Cliente[]> {
    let url = `clientes`;
    console.log('Realizando solicitud GET a:', url);

    let headers = new HttpHeaders();
    headers = headers.set('Auto-header', 'true');

    return this._http.get<Cliente[]>(url, { headers: headers });
  }
}
