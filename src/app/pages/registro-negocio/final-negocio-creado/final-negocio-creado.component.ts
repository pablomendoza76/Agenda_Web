import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RegistroNegocioService } from '../registro-negocio.service';
import { NegocioMapper } from '../../../adapters/negocio.mapper';

@Component({
  selector: 'app-final-negocio-creado',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './final-negocio-creado.component.html',
  styleUrls: ['./final-negocio-creado.component.scss']
})
export class FinalNegocioCreadoComponent {

  private registro = inject(RegistroNegocioService);

  /* CAMPOS DEL FORM */
  emailAdmin: string = '';
  password: string = '';
  passwordConfirm: string = '';
  claveActual: string = '';


  mostrarPass = false;
  mostrarPass2 = false;

  constructor(  private mapper: NegocioMapper) {

  // Obtener contacto para mostrar el correo
  const contacto = this.registro.getDato('contacto');
  this.emailAdmin = contacto?.correo || '';

  // Obtener las credenciales temporales guardadas después de crear el negocio
  const cred = this.registro.getDato('credencialesTemp');

  this.claveActual = cred?.claveActual || '';   // ← El RUC
}


  /* MÉTODO PARA ENVIAR LA INFORMACIÓN */
  crearCuenta() {

  if (!this.password || !this.passwordConfirm) {
    alert('Completa las contraseñas.');
    return;
  }

  if (this.password !== this.passwordConfirm) {
    alert('Las contraseñas no coinciden.');
    return;
  }

  const claveNueva = this.password;

  // lamamos al mapper que usa NegocioService → cambiarClave()
  this.mapper.cambiarClaveAdmin(this.claveActual, claveNueva)
    .subscribe(resp => {

      console.log('RESP CAMBIO CLAVE →', resp);

      if (resp?.codigoEstado === 200 || resp?.ok !== false) {
        alert('¡Cuenta creada y contraseña actualizada exitosamente!');
        // this.router.navigate(['/login']);
      } else {
        alert('Error al actualizar la contraseña. Intenta nuevamente.');
      }

    });
}
}
