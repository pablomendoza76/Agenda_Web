import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-beneficios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './beneficios.component.html',
  styleUrls: ['./beneficios.component.scss'],
})
export class BeneficiosComponent {
  hover: any = null;

  beneficios = [
    {
      titulo: 'Reserva online 24/7',
      descripcion:
        'Tus clientes reservan cuando quieran, sin llamadas ni complicaciones.',
    },
    {
      titulo: 'Recordatorios automáticos',
      descripcion:
        'Envía notificaciones por WhatsApp o correo para reducir ausencias.',
    },
    {
      titulo: 'Ahorro de tiempo',
      descripcion:
        'Menos mensajes, más organización y citas automáticas.',
    },
    {
      titulo: 'Gestión de personal',
      descripcion:
        'Asigna servicios, horarios y agenda a cada miembro del equipo.',
    },
    {
      titulo: 'Calendario inteligente',
      descripcion:
        'Visualiza, edita y gestiona todas tus citas en un solo lugar.',
    },
    {
      titulo: 'Flexible y personalizable',
      descripcion:
        'Se adapta a consultorios, talleres y cualquier servicio por hora.',
    },
  ];
}
