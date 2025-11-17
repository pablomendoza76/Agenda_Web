import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RegistroNegocioService } from '../../registro-negocio.service';

@Component({
  selector: 'app-paso3',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './paso3.component.html',
  styleUrls: ['./paso3.component.scss']
})
export class Paso3Component {

  /* ============================================================
     FORM PRINCIPAL
  ============================================================ */
  form = {
    correo: '',
    telMovil: '',
    telFijo: '',
    provincia: '',
    canton: '',
    callePrincipal: '',
    calleSecundaria: '',
    referencia: ''
  };

  /* ============================================================
     SELECTS DE PAÍSES (bandera + código)
  ============================================================ */
  paises = [
    { name: 'Ecuador', flag: 'assets/flags/ec.svg', code: '+593' },
    { name: 'Perú', flag: 'assets/flags/pe.svg', code: '+51' },
    { name: 'Colombia', flag: 'assets/flags/co.svg', code: '+57' },
    { name: 'Chile', flag: 'assets/flags/cl.svg', code: '+56' },
    { name: 'México', flag: 'assets/flags/mx.svg', code: '+52' },
    { name: 'España', flag: 'assets/flags/es.svg', code: '+34' }
  ];

  // Valores por defecto
  paisMovil = this.paises[0];
  paisFijo = this.paises[0];

  dropdownPaisMovil = false;
  dropdownPaisFijo = false;

  /* ============================================================
     SELECTS PROVINCIA / CANTÓN
  ============================================================ */
  dropdownProvincia = false;
  dropdownCanton = false;

  provincias = ['Loja', 'El Oro', 'Azuay', 'Pichincha', 'Guayas'];
  cantones = ['Loja', 'Catamayo', 'Saraguro', 'Macará', 'Cariamanga'];

  @Output() infoContactoChange = new EventEmitter<any>();

  constructor(private registroService: RegistroNegocioService) {}

  ngOnInit() {
    const guardado = this.registroService.getDato('contacto');
    if (guardado) {
      this.form = { ...this.form, ...guardado };
    }
  }

  /* ============================================================
     GUARDAR CAMBIOS
  ============================================================ */
  guardar() {
    this.registroService.setDato('contacto', this.form);
    this.infoContactoChange.emit(this.form);
  }

  /* ============================================================
     MANEJO DE SELECT PAÍS - TELÉFONO MÓVIL
  ============================================================ */
  togglePaisMovil() {
    this.dropdownPaisMovil = !this.dropdownPaisMovil;
  }

  selectPaisMovil(p: any) {
    this.paisMovil = p;
    this.dropdownPaisMovil = false;
  }

  /* ============================================================
     MANEJO DE SELECT PAÍS - TELÉFONO FIJO
  ============================================================ */
  togglePaisFijo() {
    this.dropdownPaisFijo = !this.dropdownPaisFijo;
  }

  selectPaisFijo(p: any) {
    this.paisFijo = p;
    this.dropdownPaisFijo = false;
  }

  /* ============================================================
     PROVINCIA / CANTÓN
  ============================================================ */
  toggleProvincia() {
    this.dropdownProvincia = !this.dropdownProvincia;
  }

  toggleCanton() {
    this.dropdownCanton = !this.dropdownCanton;
  }

  selectProvincia(p: string) {
    this.form.provincia = p;
    this.dropdownProvincia = false;
    this.guardar();
  }

  selectCanton(c: string) {
    this.form.canton = c;
    this.dropdownCanton = false;
    this.guardar();
  }

  /* ============================================================
     CERRAR TODOS LOS DROPDOWNS AL HACER CLICK FUERA
  ============================================================ */
  @HostListener('document:click', ['$event'])
  closeDropdowns(event: Event) {
    const t = event.target as HTMLElement;

    if (!t.closest('.phone-country')) {
      this.dropdownPaisMovil = false;
      this.dropdownPaisFijo = false;
    }

    if (!t.closest('.dropdown')) {
      this.dropdownProvincia = false;
      this.dropdownCanton = false;
    }
  }
}
