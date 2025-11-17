import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RegistroNegocioService } from '../registro-negocio.service';

@Component({
  selector: 'app-final-negocio-creado',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './final-negocio-creado.component.html',
  styleUrls: ['./final-negocio-creado.component.scss']
})
export class FinalNegocioCreadoComponent {

  private registro = inject(RegistroNegocioService);

  /* ============================================
     CAMPOS DEL FORM
  ============================================ */
  emailAdmin: string = '';
  password: string = '';
  passwordConfirm: string = '';

  mostrarPass = false;
  mostrarPass2 = false;

  constructor() {
    // Obtener el correo del paso 3 (contacto)
    const contacto = this.registro.getDato('contacto');
    this.emailAdmin = contacto?.correo || '';
  }

  /* ============================================
     MÉTODO PARA ENVIAR LA INFORMACIÓN
  ============================================ */
  crearCuenta() {
    if (!this.password || !this.passwordConfirm) {
      alert('Completa las contraseñas.');
      return;
    }

    if (this.password !== this.passwordConfirm) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    const payload = {
      email: this.emailAdmin,
      password: this.password,
      negocio: this.registro.getTodo()
    };

    console.log(' Enviando credenciales finales:', payload);

    // Aquí luego llamaremos al endpoint real
    // this.api.crearCuenta(payload).subscribe(...);
  }
}
