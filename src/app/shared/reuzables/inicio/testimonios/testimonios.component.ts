import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-testimonios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonios.component.html',
  styleUrls: ['./testimonios.component.scss']
})
export class TestimoniosComponent {
  stars = Array(5).fill(0);

  testimonios = [
    {
      mensaje:
        'AgendaSof me ayudó a organizar mi clínica y reducir las ausencias.',
      nombre: 'Dra. Silvia Gómez',
      cargo: 'Pediatra',
      imagen: '/img/testimonios/tes1.svg'
    },
    {
      mensaje:
        'Ahora mis clientes reservan solos y yo solo me enfoco en atender.',
      nombre: 'Carlos Méndez',
      cargo: 'Peluquero',
      imagen: '/img/testimonios/test2.svg'
    },
    {
      mensaje: 'Ideal para negocios pequeños como el mío.',
      nombre: 'Laura Ríos',
      cargo: 'Dueña de spa',
      imagen: '/img/testimonios/test3.svg'
    }
  ];
}
