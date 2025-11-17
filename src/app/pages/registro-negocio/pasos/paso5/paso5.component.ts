import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RegistroNegocioService } from '../../registro-negocio.service';

@Component({
  selector: 'app-paso5',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './paso5.component.html',
  styleUrls: ['./paso5.component.scss']
})
export class Paso5Component {

  subdominio = '';
  urlPreview = 'https://.agendasoft.com';

  @Output() subdominioChange = new EventEmitter<string>();

  constructor(private registroService: RegistroNegocioService) {}

  ngOnInit() {
    const guardado = this.registroService.getDato('subdominio');
    if (guardado) {
      this.subdominio = guardado;
      this.actualizarURL();
    }
  }

  actualizarURL() {
    // Limpia caracteres no válidos para un subdominio
    const limpio = this.subdominio
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, '');

    this.subdominio = limpio;

    this.urlPreview = `https://${limpio}.agendasoft.com`;

    this.registroService.setDato('subdominio', limpio);
    this.subdominioChange.emit(limpio);
  }
}
