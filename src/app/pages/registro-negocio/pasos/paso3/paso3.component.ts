import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RegistroNegocioService } from '../../registro-negocio.service';
import { NegocioMapper } from '../../../../adapters/negocio.mapper';
import { AlertService } from '../../../../services/alert.service';

@Component({
  selector: 'app-paso3',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './paso3.component.html',
  styleUrls: ['./paso3.component.scss']
})
export class Paso3Component {

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

  paises = [
    { name: 'Ecuador', flag: '/img/banderas/ecuador.png', code: '+593' },
    { name: 'Perú', flag: '/img/banderas/peru.png', code: '+51' },
    { name: 'Colombia', flag: '/img/banderas/colombia.png', code: '+57' },
    { name: 'Chile', flag: '/img/banderas/chile.png', code: '+56' },
    { name: 'México', flag: '/img/banderas/mexico.png', code: '+52' },
    { name: 'España', flag: '/img/banderas/españa.png', code: '+34' }
  ];

  paisMovil = this.paises[0];
  paisFijo = this.paises[0];

  dropdownPaisMovil = false;
  dropdownPaisFijo = false;

  dropdownProvincia = false;
  dropdownCanton = false;

  provincias: any[] = [];
  cantones: any[] = [];

  @Output() infoContactoChange = new EventEmitter<any>();

  constructor(
    private registroService: RegistroNegocioService,
    private mapper: NegocioMapper,
    private alert: AlertService
  ) { }

  ngOnInit() {
    this.mapper.obtenerProvincias().subscribe({
      next: (resp) => this.provincias = resp,
      error: () => this.alert.error('No se pudieron cargar las provincias', 'Error')
    });

    const guardado = this.registroService.getDato('contacto');

    if (guardado) {
      this.form = { ...this.form, ...guardado };

      if (this.form.provincia) {
        this.cargarCantones(+this.form.provincia);
      }
    }
  }

  guardar() {
    this.registroService.setDato('contacto', this.form);
    this.infoContactoChange.emit(this.form);
  }

  togglePaisMovil() { this.dropdownPaisMovil = !this.dropdownPaisMovil; }
  selectPaisMovil(p: any) { this.paisMovil = p; this.dropdownPaisMovil = false; }

  togglePaisFijo() { this.dropdownPaisFijo = !this.dropdownPaisFijo; }
  selectPaisFijo(p: any) { this.paisFijo = p; this.dropdownPaisFijo = false; }

  toggleProvincia() { this.dropdownProvincia = !this.dropdownProvincia; }
  selectProvincia(p: any) {
    this.form.provincia = p.id;
    this.dropdownProvincia = false;
    this.cargarCantones(p.id);
    this.guardar();
  }

  cargarCantones(provinciaId: number) {
    this.mapper.obtenerCantones(provinciaId).subscribe({
      next: (resp) => this.cantones = resp,
      error: () => this.alert.error('No se pudieron cargar los cantones', 'Error')
    });
  }

  toggleCanton() { this.dropdownCanton = !this.dropdownCanton; }
  selectCanton(c: any) {
    this.form.canton = c.id;
    this.dropdownCanton = false;
    this.guardar();
  }

  @HostListener('document:click', ['$event'])
  closeDropdowns(event: Event) {
    const t = event.target as HTMLElement;

    if (!t.closest('.phone-country')) {
      this.dropdownPaisMovil = false;
      this.dropdownPaisFijo = false;
    }

    if (!t.closest('.dropdown-provincia')) {
      this.dropdownProvincia = false;
    }

    if (!t.closest('.dropdown-canton')) {
      this.dropdownCanton = false;
    }
  }

  obtenerNombreProvincia(id: number | string) {
    return this.provincias.find((p) => p.id == id)?.nombre || '';
  }

  obtenerNombreCanton(id: number | string) {
    return this.cantones.find((c) => c.id == id)?.nombre || '';
  }

  // Validación de correo
  esCorreoValido(correo: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(correo);
  }

  // Validación numérica
  esSoloNumeros(valor: string): boolean {
    return /^[0-9]+$/.test(valor);
  }

  // Validación de texto con mínimo 3 caracteres
  esTextoValido(valor: string): boolean {
    return !!valor && valor.trim().length >= 3;
  }


  // Validación completa
  camposCompletos(): boolean {
    return (
      this.esCorreoValido(this.form.correo) &&

      this.esSoloNumeros(this.form.telMovil) &&
      this.form.telMovil.length === 10 &&

      (this.form.telFijo === '' ||
        (this.esSoloNumeros(this.form.telFijo) && this.form.telFijo.length === 9)
      ) &&

      !!this.form.provincia &&
      !!this.form.canton &&

      this.esTextoValido(this.form.callePrincipal) &&
      this.esTextoValido(this.form.calleSecundaria) &&
      this.esTextoValido(this.form.referencia)
    );
  }

  soloNumeros(campo: 'telMovil' | 'telFijo') {
    const valor = this.form[campo] || '';
    this.form[campo] = valor.replace(/[^0-9]/g, '');
    this.guardar();
  }


  validar(): boolean {
    if (!this.camposCompletos()) {
      this.alert.warning('Completa correctamente todos los campos obligatorios.', 'Datos inválidos');
      return false;
    }
    return true;
  }
}
