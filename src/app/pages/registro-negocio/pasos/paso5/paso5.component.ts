import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RegistroNegocioService } from '../../registro-negocio.service';
import { NegocioMapper } from '../../../../adapters/negocio.mapper';

import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-paso5',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './paso5.component.html',
  styleUrls: ['./paso5.component.scss']
})
export class Paso5Component {

  subdominio = '';
  urlPreview = 'https://.billagenda.com';

  estadoSubdominio: 'vacio' | 'validando' | 'disponible' | 'ocupado' = 'vacio';

  private cambiosSubdominio$ = new Subject<string>();

  @Output() subdominioChange = new EventEmitter<string>();

  constructor(
    private registroService: RegistroNegocioService,
    private mapper: NegocioMapper
  ) {}

  ngOnInit() {
    const guardado = this.registroService.getDato('subdominio');
    if (guardado) {
      this.subdominio = guardado;
      this.actualizarURL();
    }

    // AUTO-VALIDACIÓN CON DEBOUNCE
    this.cambiosSubdominio$
      .pipe(
        debounceTime(400),            // Espera que deje de escribir
        distinctUntilChanged(),
        switchMap(valor =>
          this.mapper.verificarSubdominio(valor) // Llama a tu método del mapper
        )
      )
      .subscribe(resp => {
        if (!this.subdominio) {
          this.estadoSubdominio = 'vacio';
          return;
        }

        this.estadoSubdominio = resp.disponible ? 'disponible' : 'ocupado';
      });
  }

  actualizarURL() {
    const limpio = this.subdominio
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, '');

    this.subdominio = limpio;
    this.urlPreview = `https://${limpio}.billagenda.com`;

    this.registroService.setDato('subdominio', limpio);
    this.subdominioChange.emit(limpio);

    // Notificar que el usuario escribió algo
    if (limpio) {
      this.estadoSubdominio = 'validando';
      this.cambiosSubdominio$.next(limpio);
    } else {
      this.estadoSubdominio = 'vacio';
    }
  }
}
