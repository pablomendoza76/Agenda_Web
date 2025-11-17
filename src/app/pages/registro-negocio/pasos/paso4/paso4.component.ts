import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RegistroNegocioService } from '../../registro-negocio.service';

@Component({
  selector: 'app-paso4',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './paso4.component.html',
  styleUrls: ['./paso4.component.scss']
})
export class Paso4Component {

  form = {
    clase: '',
    contabilidad: '',
    resolucion: '',
    codigoArtesano: ''
  };

  @Output() paso4Change = new EventEmitter<any>();

  constructor(private registro: RegistroNegocioService) {}

  ngOnInit() {
    const saved = this.registro.getDato('paso4');
    if (saved) this.form = { ...this.form, ...saved };
  }

  seleccionarClase(valor: string) {
    this.form.clase = valor;
    this.guardar();
  }

  seleccionarContabilidad(valor: string) {
    this.form.contabilidad = valor;
    this.guardar();
  }

  guardar() {
    this.registro.setDato('paso4', this.form);
    this.paso4Change.emit(this.form);
  }
}
