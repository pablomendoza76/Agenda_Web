import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Plan } from '../../../../interfaces/plan.interface';
import { PlanesService } from '../../../../services/planes.service';
import { PlanStore } from '../../../../services/plan-store.service';

@Component({
  selector: 'app-precios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './precios.component.html',
  styleUrls: ['./precios.component.scss']
})
export class PreciosComponent implements OnInit {

  planes: Plan[] = [];
  loading = true;

  constructor(
    private planesService: PlanesService,
    private planStore: PlanStore,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.planStore.cargarDesdeStorage();
    this.cargarPlanes();
  }

  cargarPlanes(): void {
    this.planesService.listarPlanes().subscribe({
      next: (resp) => {
        const datos: Plan[] = resp?.respuesta?.datos || [];

        this.planes = datos.sort(
          (a, b) => Number(a.precio) - Number(b.precio)
        );

        this.loading = false;
      },
      error: (err) => {
        console.error('Error cargando planes', err);
        this.loading = false;
      }
    });
  }

  trackByPlanId(index: number, plan: Plan): number {
    return plan.idPlan;
  }

  seleccionarPlan(plan: Plan): void {
    this.planStore.setPlanSeleccionado(plan.idPlan);
    this.router.navigate(['/registro']);
  }
}
