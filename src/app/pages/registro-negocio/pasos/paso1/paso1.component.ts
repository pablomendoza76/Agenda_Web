import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { RegistroNegocioService } from '../../registro-negocio.service';
import { AlertService } from '../../../../services/alert.service';
import { PlanesService } from '../../../../services/planes.service';
import { Plan } from '../../../../interfaces/plan.interface';
import { PlanStore } from '../../../../services/plan-store.service';

@Component({
  selector: 'app-paso1',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paso1.component.html',
  styleUrls: ['./paso1.component.scss']
})
export class Paso1Component implements OnInit {

  /** Lista de planes */
  planes: Plan[] = [];

  /** ID seleccionado */
  selectedPlanId: number | null = null;

  /** 👉 ESTE ES EL QUE USA EL HTML */
  planSeleccionado: Plan | null = null;

  /** 👉 SOLO para emitir al padre (NO se usa en HTML) */
  @Output() planSeleccionadoChange = new EventEmitter<number>();

  constructor(
    private registroService: RegistroNegocioService,
    private planesService: PlanesService,
    private planStore: PlanStore,
    private alert: AlertService
  ) {}

  ngOnInit(): void {
    // cargar plan desde store
    this.planStore.cargarDesdeStorage();
    const planIdGuardado = this.planStore.getPlanSeleccionado();

    this.planesService.listarPlanes().subscribe({
      next: (resp: any) => {
        const datos: Plan[] = resp?.respuesta?.datos || [];

        // ordenar: free primero
        this.planes = datos.sort(
          (a: Plan, b: Plan) => Number(a.precio) - Number(b.precio)
        );

        // restaurar selección si existe
        if (planIdGuardado) {
          const plan = this.planes.find(p => p.idPlan === planIdGuardado);
          if (plan) {
            this.selectedPlanId = plan.idPlan;
            this.planSeleccionado = plan;
            this.registroService.setDato('planId', plan.idPlan);
          }
        }
      }
    });
  }

  seleccionarPlan(plan: Plan): void {
    this.selectedPlanId = plan.idPlan;
    this.planSeleccionado = plan;

    // guardar en stores
    this.planStore.setPlanSeleccionado(plan.idPlan);
    this.registroService.setDato('planId', plan.idPlan);

    // emitir al padre
    this.planSeleccionadoChange.emit(plan.idPlan);

    // alerta
    this.alert.success(
      `Has seleccionado el plan ${plan.nombre}`,
      'Plan actualizado'
    );
  }
}
