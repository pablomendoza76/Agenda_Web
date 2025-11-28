import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer-simple',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer-simple.component.html',
  styleUrls: ['./footer-simple.component.scss']
})
export class FooterSimpleComponent {

  redes = [
    { icono: 'fa-brands fa-facebook-f', url: 'https://facebook.com' },
    { icono: 'fa-brands fa-instagram', url: 'https://instagram.com' },
    { icono: 'fa-brands fa-tiktok', url: 'https://tiktok.com' },
    { icono: 'fa-brands fa-youtube', url: 'https://youtube.com' },
    { icono: 'fa-brands fa-linkedin-in', url: 'https://linkedin.com' }
  ];

}
