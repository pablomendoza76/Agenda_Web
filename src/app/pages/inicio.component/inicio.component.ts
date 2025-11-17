import { AfterViewInit, Component, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarraNavegacionComponent } from '../../shared/reuzables/barra-navegacion.component/barra-navegacion.component.component';
import { BeneficiosComponent } from '../../shared/reuzables/inicio/beneficios.component/beneficios.component';
import { HeroComponent } from '../../shared/reuzables/inicio/hero/hero.component';
import { PreciosComponent } from '../../shared/reuzables/inicio/precios/precios.component';
import { TestimoniosComponent } from '../../shared/reuzables/inicio/testimonios/testimonios.component';
import { ParaQuienComponent } from '../../shared/reuzables/inicio/para-quien/para-quien.component';
import { PasosComponent } from '../../shared/reuzables/inicio/pasos/pasos.component';
import { FaqSectionComponent } from '../../shared/reuzables/inicio/faq-section/faq-section.component';
import { CtaFinalComponent } from '../../shared/reuzables/inicio/cta-final/cta-final.component';
import { ContactoNewsletterComponent } from '../../shared/reuzables/inicio/contacto-newsletter/contacto-newsletter.component';
import { FooterComponent } from '../../shared/reuzables/inicio/footer/footer.component';
@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [
    CommonModule,
    BarraNavegacionComponent,
    HeroComponent,
    BeneficiosComponent,
    PreciosComponent,
    TestimoniosComponent,
    ParaQuienComponent,
    PasosComponent,
    FaqSectionComponent,
    CtaFinalComponent,
    ContactoNewsletterComponent,
    FooterComponent
  ],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent implements AfterViewInit { // Usa AfterViewInit

  constructor(private el: ElementRef) {} // Inyecta ElementRef

  ngAfterViewInit(): void {
    // Implementa la animación de entrada al centrarse
    this.setupSectionAnimations();
  }

  setupSectionAnimations(): void {
    // Selecciona todas las secciones dentro del componente
    const secciones = this.el.nativeElement.querySelectorAll('section');

    // Configuración: Detectar cuando el 50% de la sección es visible (centrada)
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5 // Dispara cuando el 50% del elemento es visible (centrado)
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Agregar la clase de animación (ej. 'slide-in')
          entry.target.classList.add('slide-in');
          // (Opcional) Si quieres que la animación solo ocurra una vez:
          // observer.unobserve(entry.target);
        } else {
          // Opcional: remover la clase si sale de pantalla (para re-animar si vuelve)
          // entry.target.classList.remove('slide-in');
        }
      });
    }, options);

    secciones.forEach((section: HTMLElement) => {
      // Excluye las secciones que no quieres animar o son muy pequeñas
      if (section.id !== 'hero' && section.id !== 'contacto' && section.id !== 'cta') {
         observer.observe(section);
      }
    });
  }
}
