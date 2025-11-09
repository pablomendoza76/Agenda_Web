import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-faq-section',
  imports:[CommonModule],
  templateUrl: './faq-section.component.html',
  styleUrls: ['./faq-section.component.scss']
})
export class FaqSectionComponent {

  activo: number | null = null;

  faqs = [
    {
      pregunta: '¿Qué pasa si no tengo personal?',
      respuesta: 'Puedes usar AgendaSof tú solo sin problema.'
    },
    {
      pregunta: '¿Puedo cancelar cuando quiera?',
      respuesta: 'Sí, sin contratos ni penalizaciones.'
    },
    {
      pregunta: '¿Cómo funcionan los recordatorios?',
      respuesta: 'Se envían automáticamente por correo o WhatsApp.'
    },
    {
      pregunta: '¿Puedo tener varios servicios?',
      respuesta: 'Claro, puedes crear todos los que necesites.'
    }
  ];

  togglePregunta(i: number) {
    this.activo = this.activo === i ? null : i;
  }
}
