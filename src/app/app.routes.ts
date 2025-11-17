import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio.component/inicio.component';
import { RegistroNegocioComponent } from './pages/registro-negocio/registro-negocio.component';

export const routes: Routes = [
  // Ruta principal
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },

  // Página de inicio (con Hero, Beneficios, etc.)
  { path: 'inicio', component: InicioComponent },

   // Página de inicio (con Hero, Beneficios, etc.)
  { path: 'registro', component: RegistroNegocioComponent },

  // Si el usuario intenta una ruta no existente
  { path: '**', redirectTo: 'inicio' },
];
