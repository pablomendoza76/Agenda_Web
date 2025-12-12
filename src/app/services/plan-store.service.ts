import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlanStore {

  private planSeleccionadoSignal = signal<number | null>(null);

  setPlanSeleccionado(idPlan: number) {
    this.planSeleccionadoSignal.set(idPlan);
    localStorage.setItem('planSeleccionadoId', String(idPlan));
  }

  getPlanSeleccionado() {
    return this.planSeleccionadoSignal();
  }

  cargarDesdeStorage() {
    const id = localStorage.getItem('planSeleccionadoId');
    if (id) {
      this.planSeleccionadoSignal.set(Number(id));
    }
  }

  /* NUEVO: limpiar plan (opcional, pero correcto) */
  limpiarPlan() {
    this.planSeleccionadoSignal.set(null);
    localStorage.removeItem('planSeleccionadoId');
  }

  /* NUEVO: saber si hay plan seleccionado */
  tienePlanSeleccionado(): boolean {
    return this.planSeleccionadoSignal() !== null;
  }
}
