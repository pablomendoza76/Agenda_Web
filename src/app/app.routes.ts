import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio.component/inicio.component';
import { BeneficiosComponent } from './shared/reuzables/inicio/beneficios.component/beneficios.component';
import { PreciosComponent } from './shared/reuzables/inicio/precios/precios.component';
import { TestimoniosComponent } from './shared/reuzables/inicio/testimonios/testimonios.component';

export const routes: Routes = [
  // Ruta principal
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },

  // Página de inicio (con Hero, Beneficios, etc.)
  { path: 'inicio', component: InicioComponent },

  // Secciones independientes (opcional, por si quieres cargarlas solas)
  { path: 'beneficios', component: BeneficiosComponent },
  { path: 'precios', component: PreciosComponent },
  { path: 'testimonios', component: TestimoniosComponent },

  // Si el usuario intenta una ruta no existente
  { path: '**', redirectTo: 'inicio' },
];
