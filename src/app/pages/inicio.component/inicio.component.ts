import { AfterViewInit, Component, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BarraNavegacionComponent } from '../../shared/reuzables/barra-navegacion.component/barra-navegacion.component.component';
import { HeroComponent } from '../../shared/reuzables/inicio/hero/hero.component';
import { BeneficiosComponent } from '../../shared/reuzables/inicio/beneficios.component/beneficios.component';
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
export class InicioComponent implements AfterViewInit {

  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {

    // Selecciona todas las secciones animadas
    const sections = document.querySelectorAll<HTMLElement>('.scroll-section');

    // Observer para detectar entrada y salida de secciones
    const observer = new IntersectionObserver(
      (entries) => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {
            // Cuando la sección entra:
            // - se activa la animación
            // - se centra automáticamente
            entry.target.classList.add('is-active');

            entry.target.scrollIntoView({
              behavior: 'smooth',
              block: 'center'
            });

          } else {
            // Cuando la sección sale:
            // - se vuelve a difuminar
            entry.target.classList.remove('is-active');
          }

        });
      },
      {
        // Se dispara cuando el 40% de la sección es visible
        threshold: 0.4
      }
    );

    // Comienza a observar cada sección
    sections.forEach(section => observer.observe(section));
  }
}
