import { Component } from '@angular/core';
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
export class InicioComponent {}
