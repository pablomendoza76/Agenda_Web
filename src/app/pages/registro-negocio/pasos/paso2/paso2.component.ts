import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RegistroNegocioService } from '../../registro-negocio.service';

@Component({
  selector: 'app-paso2',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './paso2.component.html',
  styleUrls: ['./paso2.component.scss']
})
export class Paso2Component {

  /* =====================================
        FORMULARIO
  ====================================== */
  form = {
    tipoNegocio: '',
    ruc: '',
    razonSocial: '',
    nombreComercial: '',
    logo: null as File | null,
    logoURL: null as string | null
  };

  logoPreview: string | null = null;

  /* =====================================
        OUTPUT PARA EL PADRE
  ====================================== */
  @Output() infoNegocioChange = new EventEmitter<any>();

  /* =====================================
        DROPDOWN
  ====================================== */
  dropdownOpen = false;

  opciones = [
    { value: 'salud', label: 'Centro de salud' },
    { value: 'belleza', label: 'Centro de belleza' },
    { value: 'mascotas', label: 'Veterinaria' },
    { value: 'educacion', label: 'Academia / Tutoría' },
    { value: 'otro', label: 'Otro' }
  ];

  constructor(private registroService: RegistroNegocioService) {}


  /* =====================================
        CARGAR DATOS GUARDADOS
  ====================================== */
  ngOnInit(): void {
    const guardado = this.registroService.getDato('infoNegocio');

    if (guardado) {
      this.form = { ...this.form, ...guardado };
      this.logoPreview = guardado.logoURL || null;
    }
  }


  /* =====================================
        DROPDOWN: ABRIR / CERRAR
  ====================================== */
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectTipo(value: string) {
    this.form.tipoNegocio = value;
    this.dropdownOpen = false;
    this.emitirCambio();
  }

  getLabel(value: string): string {
    return this.opciones.find(o => o.value === value)?.label || '';
  }

  @HostListener('document:click', ['$event'])
  closeDropdownOutside(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown')) this.dropdownOpen = false;
  }


  /* =====================================
        MANEJO DE ARCHIVOS
  ====================================== */
  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.procesarLogo(file);
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const file = event.dataTransfer?.files[0];
    if (file) this.procesarLogo(file);
  }

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


  /* =====================================
        GUARDAR Y EMITIR AL PADRE
  ====================================== */
  emitirCambio() {
    this.registroService.setDato('infoNegocio', this.form);
    this.infoNegocioChange.emit(this.form);
  }
}
