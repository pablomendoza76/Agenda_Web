import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { RegistroNegocioService } from '../../registro-negocio.service';

@Component({
  selector: 'app-paso1',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paso1.component.html',
  styleUrls: ['./paso1.component.scss']
})
export class Paso1Component implements OnInit {

  /** Valor actual seleccionado */
  selectedPlan: 'starter' | 'pro' | null = null;

  /** Emitimos al padre cuando se selecciona un plan */
  @Output() planSeleccionado = new EventEmitter<'starter' | 'pro'>();

  constructor(private registroService: RegistroNegocioService) {}

  /** 🔥 Recuperamos el plan guardado al entrar al paso */
  ngOnInit(): void {
    const planGuardado = this.registroService.getDato('plan');
    if (planGuardado) {
      this.selectedPlan = planGuardado;
    }
  }

  /** Método para seleccionar un plan */
  seleccionarPlan(plan: 'starter' | 'pro') {
    this.selectedPlan = plan;

    // Guardamos en el servicio global
    this.registroService.setDato('plan', plan);

    // Emitimos al padre
    this.planSeleccionado.emit(plan);
  }

  /** Getters de estado */
  get esEstadoInicial(): boolean {
    return this.selectedPlan === null;
  }

  get starterActivo(): boolean {
    return this.selectedPlan === 'starter';
  }

  get proActivo(): boolean {
    return this.selectedPlan === 'pro';
  }
}
