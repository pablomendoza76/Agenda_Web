import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BarraNavegacionComponent } from '../../shared/reuzables/barra-navegacion.component/barra-navegacion.component.component';

import { Paso1Component } from './pasos/paso1/paso1.component';
import { Paso2Component } from './pasos/paso2/paso2.component';
import { Paso3Component } from './pasos/paso3/paso3.component';
import { Paso4Component } from './pasos/paso4/paso4.component';
import { Paso5Component } from './pasos/paso5/paso5.component';

import { RegistroNegocioService } from './registro-negocio.service';
import { FinalNegocioCreadoComponent } from './final-negocio-creado/final-negocio-creado.component';

@Component({
  selector: 'app-registro-negocio',
  standalone: true,
  imports: [
    CommonModule,
    BarraNavegacionComponent,
    Paso1Component,
    Paso2Component,
    Paso3Component,
    Paso4Component,
    Paso5Component,
    FinalNegocioCreadoComponent
  ],
  templateUrl: './registro-negocio.component.html',
  styleUrls: ['./registro-negocio.component.scss']
})
export class RegistroNegocioComponent {

  pasoActual = 1;
  negocioCreado = false;   // ← para mostrar la vista final

  constructor(private registroService: RegistroNegocioService) {}

  /* =====================================================
       TEXTOS POR PASO
  ======================================================= */
  titulosPaso: Record<number, string> = {
    1: 'Selecciona tu plan',
    2: 'Información de tu negocio',
    3: 'Configura tu horario de atención',
    4: 'Agrega los servicios que ofreces',
    5: 'Confirma tu información'
  };

  subtitulosPaso: Record<number, string> = {
    1: 'Elige el plan que mejor se adapte a las necesidades de tu negocio.',
    2: 'Completa la información básica de tu negocio.',
    3: 'Define tus horarios disponibles para recibir citas.',
    4: 'Añade los servicios que tu negocio ofrece.',
    5: 'Revisa y confirma toda la información antes de finalizar.'
  };

  get tituloPasoActual() {
    return this.titulosPaso[this.pasoActual];
  }

  get subtituloPasoActual() {
    return this.subtitulosPaso[this.pasoActual];
  }

  /* =====================================================
       CÍRCULO / PROGRESO
  ======================================================= */
  getProgressBackground(): string {
    const porcentaje = (this.pasoActual / 5) * 360;
    return `conic-gradient(#22c6a3 ${porcentaje}deg, #e6e6e6 ${porcentaje}deg 360deg)`;
  }

  /* =====================================================
       RECIBIR DATOS DE PASOS HIJOS
  ======================================================= */
  recibirPlan(plan: 'starter' | 'pro') {
    this.registroService.setDato('plan', plan);
  }

  /* =====================================================
       VALIDACIONES POR PASO
  ======================================================= */
  puedeContinuar(): boolean {
    if (this.pasoActual === 1) {
      return this.registroService.getDato('plan') !== null;
    }
    return true;
  }

  /* =====================================================
       NAVEGACIÓN ENTRE PASOS
  ======================================================= */
  siguiente() {

    // Si NO está en el último paso → avanza normalmente
    if (this.pasoActual < 5) {
      if (!this.puedeContinuar()) {
        alert('Selecciona un plan para continuar.');
        return;
      }
      this.pasoActual++;
      return;
    }

    // Si ya está en paso 5 → crear negocio
    if (this.pasoActual === 5) {
      this.crearNegocio();
    }
  }

  anterior() {
    if (this.pasoActual > 1) this.pasoActual--;
  }

  /* =====================================================
       CREAR NEGOCIO (FINAL)
  ======================================================= */
  crearNegocio() {
    const data = this.registroService.getTodo();

    console.log('📌 DATA COMPLETA DEL NEGOCIO: ', data);

    // Espera 400ms para simular el envío
    setTimeout(() => {
      this.negocioCreado = true; // Muestra la vista final
    }, 400);
  }
}
