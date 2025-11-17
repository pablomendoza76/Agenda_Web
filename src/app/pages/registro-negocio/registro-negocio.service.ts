import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegistroNegocioService {

  /* ==========================================================
     ESTRUCTURA COMPLETA DE LOS DATOS DEL REGISTRO
  ========================================================== */
  private datos: any = {
    plan: null,             // paso 1
    infoNegocio: {},        // paso 2
    contacto: {},           // paso 3
    horario: {},            // paso 4
    servicios: [],          // paso 4 (si aplica)
    subdominio: null        // paso 5
  };

  /* ==========================================================
     GUARDAR DATO GENÉRICO
  ========================================================== */
  setDato(key: string, value: any) {
    this.datos[key] = value;

    console.log('📌 Guardado:', key, value);
    console.log('📦 Estado actual del registro:', this.datos);
  }

  /* ==========================================================
     OBTENER DATO
  ========================================================== */
  getDato(key: string) {
    return this.datos[key];
  }

  /* ==========================================================
     OBTENER TODO EL OBJETO SIN PROCESAR
  ========================================================== */
  getAll() {
    return this.datos;
  }

  /* ==========================================================
     OBJETO FINAL COMPILADO (LISTO PARA API)
  ========================================================== */
  getTodo() {
    return {
      plan: this.datos.plan,
      infoNegocio: this.datos.infoNegocio,
      contacto: this.datos.contacto,
      horario: this.datos.horario,
      servicios: this.datos.servicios,
      subdominio: this.datos.subdominio
    };
  }
}
