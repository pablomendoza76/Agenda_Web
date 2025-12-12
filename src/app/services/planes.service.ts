import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError, of } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class PlanesService {

  private baseUrl = `${environment.apiUrl}planes/`;

  constructor(private http: HttpClient) {}

  /** HEADERS PRIVADOS (Bearer + API KEY) */
  private getHeadersPrivados() {
    const token = localStorage.getItem('token');

    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'x-api-key': environment.apiKey,
        Authorization: `Bearer ${token}`
      })
    };
  }

  /** LISTAR PLANES
   * GET → /planes/listar
   */
  listarPlanes() {
    const url = `${this.baseUrl}listar`;

    return this.http.get<any>(url, this.getHeadersPrivados()).pipe(
      map(resp => resp),
      catchError(err => {
        console.error('Error al listar planes', err);
        return of(null);
      })
    );
  }
}
