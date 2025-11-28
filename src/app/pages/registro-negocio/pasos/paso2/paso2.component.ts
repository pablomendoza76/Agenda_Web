import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RegistroNegocioService } from '../../registro-negocio.service';
import { NegocioMapper } from '../../../../adapters/negocio.mapper';
import { AlertService } from '../../../../services/alert.service';

@Component({
  selector: 'app-paso2',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './paso2.component.html',
  styleUrls: ['./paso2.component.scss']
})
export class Paso2Component {

  // Formulario
  form = {
    tipoNegocioId: null as number | null,
    ruc: '',
    razonSocial: '',
    nombreComercial: '',
    logo: null as File | null,
    logoURL: null as string | null
  };

  // Preview del logo
  logoPreview: string | null = null;
  rucSoloNumeros = true;
  rucLongitudCorrecta = true;


  @Output() infoNegocioChange = new EventEmitter<any>();

  // Dropdown de tipo de negocio
  dropdownOpen = false;
  tiposNegocio: { id: number; nombre: string }[] = [];

  constructor(
    private registroService: RegistroNegocioService,
    private negocioMapper: NegocioMapper,
    private alert: AlertService
  ) { }

  ngOnInit(): void {
    // Cargar tipos de negocio
    this.negocioMapper.obtenerTiposNegocio().subscribe({
      next: (resp) => this.tiposNegocio = resp
    });

    // Recuperar datos guardados
    const guardado = this.registroService.getDato('infoNegocio');
    if (guardado) {
      this.form = { ...this.form, ...guardado };
      this.logoPreview = guardado.logoURL || null;
    }
  }

  // Abrir/cerrar dropdown
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  // Seleccionar tipo
  selectTipo(id: number) {
    this.form.tipoNegocioId = id;
    this.dropdownOpen = false;
    this.emitirCambio();
  }

  // Texto visible del select
  getLabel(id: number | null): string {
    return this.tiposNegocio.find(t => t.id === id)?.nombre || 'Selecciona una categoría de negocio';
  }

  // Cerrar dropdown al hacer click afuera
  @HostListener('document:click', ['$event'])
  closeDropdownOutside(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown')) this.dropdownOpen = false;
  }

  // Selección de archivo
  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.procesarLogo(file);
  }

  // Drag over
  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  // Drop logo
  onDrop(event: DragEvent) {
    event.preventDefault();
    const file = event.dataTransfer?.files[0];
    if (file) this.procesarLogo(file);
  }

  // Procesar logo
  procesarLogo(file: File) {
    if (!file) return;

    this.form.logo = file;

    const reader = new FileReader();
    reader.onload = () => {
      this.logoPreview = reader.result as string;
      this.form.logoURL = this.logoPreview;
      this.emitirCambio();
    };

    reader.readAsDataURL(file);
  }

  // Validar campos
  camposCompletos(): boolean {
    return (
      !!this.form.tipoNegocioId &&
      !!this.form.ruc &&
      this.rucSoloNumeros &&        //  evita letras
      this.rucLongitudCorrecta &&   //  evita menos o más de 13 dígitos
      !!this.form.razonSocial &&
      !!this.form.nombreComercial
    );
  }



  // Mostrar alertas
  validarAntesDeContinuar(): boolean {
    if (!this.camposCompletos()) {
      this.alert.warning(
        'Completa todos los datos obligatorios para continuar.',
        'Dato incompleto'
      );
      return false;
    }
    return true;
  }

  // Guardar cambios en el servicio
  emitirCambio() {
    this.registroService.setDato('infoNegocio', this.form);
    this.infoNegocioChange.emit(this.form);
  }

  // Guardado automático para inputs
  onChange() {
    this.emitirCambio();
  }

  validarRuc() {
    const ruc = this.form.ruc || '';

    // Solo números
    this.rucSoloNumeros = /^[0-9]*$/.test(ruc);

    // Longitud exacta
    this.rucLongitudCorrecta = ruc.length === 13;
  }

}
