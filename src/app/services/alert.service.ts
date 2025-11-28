import { Injectable } from '@angular/core';
import { ToastrService, ActiveToast } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private loadingToast: ActiveToast<any> | null = null;

  constructor(private toastr: ToastrService) {}

  /* ===========================================================
        LOADING INDICADOR GLOBAL
  ============================================================ */
  loading(message: string = 'Procesando...') {
    if (this.loadingToast) return;

    this.loadingToast = this.toastr.info(message, '', {
      disableTimeOut: true,
      tapToDismiss: false,
      closeButton: false,
      progressBar: true,
      positionClass: 'toast-top-right',   // 🔥 ahora también arriba derecha
      toastClass: 'toast toast-info-custom'
    });
  }

  closeLoading() {
    if (this.loadingToast) {
      this.toastr.clear(this.loadingToast.toastId);
      this.loadingToast = null;
    }
  }

  /* ===========================================================
        ALERTAS DISEÑO CUSTOM (tipo la imagen)
  ============================================================ */

  success(msg: string, title: string = 'Éxito') {
    this.toastr.success(msg, title, {
      toastClass: 'toast toast-success-custom',  // ← aplica el SCSS
      positionClass: 'toast-top-right',
      closeButton: true,          // ← activa la X
      enableHtml: true
    });
  }

  error(msg: string, title: string = 'Error') {
    this.toastr.error(msg, title, {
      toastClass: 'toast toast-error-custom',
      positionClass: 'toast-top-right',
      closeButton: true,
      enableHtml: true
    });
  }

  warning(msg: string, title: string = 'Advertencia') {
    this.toastr.warning(msg, title, {
      toastClass: 'toast toast-warning-custom',
      positionClass: 'toast-top-right',
      closeButton: true,
      enableHtml: true
    });
  }

  info(msg: string, title: string = 'Información') {
    this.toastr.info(msg, title, {
      toastClass: 'toast toast-info-custom',
      positionClass: 'toast-top-right',
      closeButton: true,
      enableHtml: true
    });
  }

  /* ===========================================================
        ALERTAS INFERIORES (LEFT)
  ============================================================ */
  successBottom(msg: string, title: string = 'Éxito') {
    this.toastr.success(msg, title, {
      positionClass: 'toast-bottom-left',
      toastClass: 'toast toast-success-custom'
    });
  }

  errorBottom(msg: string, title: string = 'Error') {
    this.toastr.error(msg, title, {
      positionClass: 'toast-bottom-left',
      toastClass: 'toast toast-error-custom'
    });
  }

  warningBottom(msg: string, title: string = 'Advertencia') {
    this.toastr.warning(msg, title, {
      positionClass: 'toast-bottom-left',
      toastClass: 'toast toast-warning-custom'
    });
  }

  infoBottom(msg: string, title: string = 'Info') {
    this.toastr.info(msg, title, {
      positionClass: 'toast-bottom-left',
      toastClass: 'toast toast-info-custom'
    });
  }

  /* ===========================================================
        ERRORES DESDE EL BACKEND
  ============================================================ */
  apiError(error: any) {
    const msg =
      error?.error?.respuesta?.mensaje ||
      error?.error?.mensaje ||
      error?.message ||
      'Error desconocido';

    this.error(msg, 'Error de servidor');
  }
}
