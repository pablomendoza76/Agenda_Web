import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError, of } from 'rxjs';
import { CreateNegocioDto } from '../interfaces/create-negocio.interface';
import { TipoNegocio } from '../interfaces/tipo-negocio.interface';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class NegocioService {

  private baseUrl = `${environment.apiUrl}negocios/`;
  private baseTipo = `${environment.apiUrl}tipo-negocio/`;

  // Nuevas bases:
  private baseProvincia = `${environment.apiUrl}bill-provincia/`;
  private baseCanton = `${environment.apiUrl}bill-canton/`;

  constructor(private http: HttpClient) {}

  private getHeadersPublicos() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'x-api-key': environment.apiKey
      })
    };
  }

  private getHeadersPrivados() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'x-api-key': environment.apiKey
      })
    };
  }

  /** CREAR NEGOCIO*/
  crearNegocio(payload: CreateNegocioDto) {
    const url = `${this.baseUrl}crear`;

    return this.http.post<any>(url, payload, this.getHeadersPrivados()).pipe(
      map(resp => resp),
      catchError(err => of(err))
    );
  }

  /** LISTAR TIPOS DE NEGOCIO*/
  listarTiposNegocio() {
    const url = `${this.baseTipo}listar`;

    return this.http.get<any>(url, this.getHeadersPublicos()).pipe(
      map(resp => resp),
      catchError(() => of(null))
    );
  }

  /** OBTENER PROVINCIAS
 * GET → /bill-provincia/obtener-todos-provincia?page=1&limit=1000
 */
obtenerProvincias() {
  const url = `${this.baseProvincia}obtener-todos-provincia?page=1&limit=1000`;

  return this.http.get<any>(url, this.getHeadersPublicos()).pipe(
    map(resp => resp),  // ← YA NO CORTES LA RESPUESTA
    catchError(() => of(null))
  );
}

obtenerCantones(provinciaId: number) {
  const url = `${this.baseCanton}obtener-todos-canton?page=1&limit=1000&provinciaId=${provinciaId}`;

  return this.http.get<any>(url, this.getHeadersPublicos()).pipe(
    map(resp => resp),  // ← TAMPOCO CORTES AQUÍ
    catchError(() => of(null))
  );
}

/** VERIFICAR DISPONIBILIDAD DE SUBDOMINIO
 * GET → /negocios/disponibilidad-subdominio/{subdominio}
 */
verificarDisponibilidadSubdominio(subdominio: string) {
  const url = `${this.baseUrl}disponibilidad-subdominio/${subdominio}`;

  return this.http.get<any>(url, this.getHeadersPublicos()).pipe(
    map(resp => resp),
    catchError(() => of({ available: false, reason: 'ERROR' }))
  );
}

/** CAMBIAR CLAVE
 * PATCH → /bill-auth/cambiar-clave
 */
cambiarClave(claveActual: string, claveNueva: string) {

  const url = `${environment.apiUrl}bill-auth/cambiar-clave`;

  const payload = {
    claveActual,
    claveNueva
  };

  return this.http.patch<any>(url, payload, this.getHeadersPrivados()).pipe(
    map(resp => resp),
    catchError(err => of(err))
  );
}


}
