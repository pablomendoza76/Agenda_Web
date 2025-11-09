import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contacto-newsletter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contacto-newsletter.component.html',
  styleUrls: ['./contacto-newsletter.component.scss']
})
export class ContactoNewsletterComponent {

  email: string = '';
  acepta: boolean = false;

  suscribirse() {
    if (!this.email || !this.acepta) {
      console.warn('Completa los campos');
      return;
    }
    console.log('Email enviado:', this.email);
  }

}
