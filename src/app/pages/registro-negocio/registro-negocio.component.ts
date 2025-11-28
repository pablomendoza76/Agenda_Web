import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BarraNavegacionComponent } from '../../shared/reuzables/barra-navegacion.component/barra-navegacion.component.component';
import { Paso1Component } from './pasos/paso1/paso1.component';
import { Paso2Component } from './pasos/paso2/paso2.component';
import { Paso3Component } from './pasos/paso3/paso3.component';
import { Paso4Component } from './pasos/paso4/paso4.component';
import { Paso5Component } from './pasos/paso5/paso5.component';

import { RegistroNegocioService } from './registro-negocio.service';
import { FinalNegocioCreadoComponent } from './final-negocio-creado/final-negocio-creado.component';
import { FooterSimpleComponent } from '../../shared/reuzables/footer-simple/footer-simple.component';
import { NegocioMapper } from '../../adapters/negocio.mapper';

import { AlertService } from '../../services/alert.service';

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
    FinalNegocioCreadoComponent,
    FooterSimpleComponent,
  ],
  templateUrl: './registro-negocio.component.html',
  styleUrls: ['./registro-negocio.component.scss']
})
export class RegistroNegocioComponent {

  pasoActual = 1;
  negocioCreado = false;
  cargando = false;

  // Referencia al componente Paso 3 para validar correctamente
  @ViewChild(Paso3Component) paso3Comp!: Paso3Component;

  constructor(
    private registroService: RegistroNegocioService,
    private negocioMapper: NegocioMapper,
    private alert: AlertService
  ) {}

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

  getProgressBackground(): string {
    const porcentaje = (this.pasoActual / 5) * 360;
    return `conic-gradient(#22c6a3 ${porcentaje}deg, #e6e6e6 ${porcentaje}deg 360deg)`;
  }

  /* ============================================================
     VALIDACIÓN GENERAL POR PASO
  ============================================================ */
  puedeContinuar(): boolean {

    if (this.pasoActual === 1) {
      return this.registroService.getDato('plan') !== null;
    }

    if (this.pasoActual === 2) {
      const data = this.registroService.getDato('infoNegocio');
      if (!data) return false;

      return (
        !!data.tipoNegocioId &&
        !!data.ruc &&
        !!data.razonSocial &&
        !!data.nombreComercial
      );
    }

    // Validación del PASO 3
    if (this.pasoActual === 3) {
      if (!this.paso3Comp) return false;
      return this.paso3Comp.camposCompletos();
    }

    return true;
  }

  /* ============================================================
     NAVEGACIÓN ENTRE PASOS
  ============================================================ */
  siguiente() {

    if (this.pasoActual < 5) {

      if (!this.puedeContinuar()) {

        if (this.pasoActual === 1) {
          this.alert.warning('Selecciona un plan para continuar.', 'Dato incompleto');
        }

        if (this.pasoActual === 2) {
          this.alert.warning('Completa todos los campos obligatorios *', 'Datos incompletos');
        }

        if (this.pasoActual === 3) {
          this.alert.warning('Completa y corrige todos los datos del contacto.', 'Datos inválidos');
        }

        return;
      }

      this.cargando = true;

      setTimeout(() => {
        this.cargando = false;
        this.pasoActual++;
      }, 400);

      return;
    }

    if (this.pasoActual === 5) {
      this.crearNegocio();
    }
  }

  anterior() {
    if (this.pasoActual > 1) this.pasoActual--;
  }

  /* ============================================================
     CREAR NEGOCIO FINAL
  ============================================================ */
  crearNegocio() {

    this.cargando = true;

    const data = this.registroService.getTodo();

    const datosNegocio = {
      tipoNegocioId: data.infoNegocio?.tipoNegocioId,
      ruc: data.infoNegocio?.ruc,
      razonSocial: data.infoNegocio?.razonSocial,
      nombreComercial: data.infoNegocio?.nombreComercial,
      subdominio: data.subdominio ?? null,
      logo: data.infoNegocio?.logoUrl ?? null
    };

    const datosUsuario = {
      identificacion: data.contacto?.identificacion,
      nombres: data.contacto?.nombres,
      apellidos: data.contacto?.apellidos,
      correo: data.contacto?.correo,
      celular: data.contacto?.celular,
      direccion: data.contacto?.direccion,
      img: data.contacto?.imgUrl ?? null,
      alias: data.contacto?.alias,
      cargoId: 1,
      estado: 1
    };

    this.negocioMapper.registrarNegocioYUsuario(datosNegocio, datosUsuario)
      .subscribe({
        next: () => {
          this.cargando = false;
          this.negocioCreado = true;
        },
        error: () => {
          this.cargando = false;
          this.alert.error('Error al crear el negocio. Intenta nuevamente.', 'Error');
        }
      });
  }
}
