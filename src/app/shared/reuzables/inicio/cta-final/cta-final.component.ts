import { Component, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cta-final',
  standalone: true,
  templateUrl: './cta-final.component.html',
  styleUrls: ['./cta-final.component.scss']
})
export class CtaFinalComponent implements AfterViewInit {

  constructor(
    private router: Router,
    private el: ElementRef
  ) {}

  ngAfterViewInit(): void {
    const imagen = this.el.nativeElement.querySelector('.cta-imagen img');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          imagen.classList.add('giro-entrada');   // activa animación
          observer.disconnect();                  // no se vuelve a ejecutar
        }
      });
    }, { threshold: 0.3 });

    observer.observe(imagen);
  }

  irRegistro() {
    this.router.navigate(['/registro']);
  }
}
