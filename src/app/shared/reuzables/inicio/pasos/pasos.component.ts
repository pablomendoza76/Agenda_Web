import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-pasos',
  imports:[CommonModule],
  templateUrl: './pasos.component.html',
  styleUrls: ['./pasos.component.scss'],
})
export class PasosComponent {
  
  pasoActual = 0;

  pasos = [
    {
      titulo: 'Configura tu agenda en minutos',
      descripcion:
        'Crea tu perfil profesional, define tus servicios y establece horarios de trabajo. Todo listo en menos de 5 minutos.',
      puntos: [
        'Selecciona el tamaño de tu negocio',
        'Define si trabajas con servicios',
        'Establece tu disponibilidad'
      ]
    },
    {
      titulo: 'Tus clientes reservan automáticamente',
      descripcion:
        'Comparte tu enlace personalizado y permite que tus clientes reserven 24/7 con disponibilidad actualizada.',
      puntos: [
        'Reservas online sin intervención',
        'Enlace personalizable para compartir',
        'Confirmaciones automáticas por email/SMS'
      ]
    },
    {
      titulo: 'Gestiona todo desde un solo lugar',
      descripcion:
        'Visualiza tus citas, tu equipo, servicios y reportes detallados desde un dashboard limpio e intuitivo.',
      puntos: [
        'Dashboard centralizado e intuitivo',
        'Gestión completa de equipo y servicios',
        'Reportes en tiempo real'
      ]
    }
  ];

  imagenes = [
    '/img/pasos/paso-1.svg',
    '/img/pasos/paso-2.svg',
    '/img/pasos/paso-3.svg'
  ];

  cambiarPaso(i: number) {
    this.pasoActual = i;
  }

  /** Opcional: detectar scroll interno de la columna */
 onScroll(event: any) {
  const scrollTop = event.target.scrollTop;
  const itemHeight = 330; // debe coincidir con el alto aproximado del paso

  this.pasoActual = Math.round(scrollTop / itemHeight);
}

}
