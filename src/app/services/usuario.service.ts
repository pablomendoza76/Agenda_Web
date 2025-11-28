import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { CreateUsuarioDto } from '../interfaces/create-usuario.interface';
import { catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private api = `${environment.apiUrl}usuarios/`;

  private getHeaders() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'x-api-key': environment.apiKey   // CORREGIDO
      })
    };
  }

  constructor(private http: HttpClient) {}

  /** ============================================
   *   CREAR USUARIO
   *   Devuelve la respuesta COMPLETA (p/ interceptor)
   * ============================================= */
  crearUsuario(payload: CreateUsuarioDto) {
    const url = `${this.api}crear`;

    return this.http
      .post<any>(url, payload, this.getHeaders())
      .pipe(
        map(resp => resp),   // devolver todo para que el interceptor lea "mensaje"
        catchError(err => of(err))
      );
  }
}
