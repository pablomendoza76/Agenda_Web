import { inject, NgZone } from '@angular/core';
import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpErrorResponse,
  HttpEvent,
  HttpResponse
} from '@angular/common/http';

import { AlertService } from '../services/alert.service';
import { catchError, mergeMap, of, throwError } from 'rxjs';

const API_PREFIX = 'https://api.billagenda.com/';

// Evita spam de múltiples alertas por llamadas paralelas
let bloqueoToast = false;
let unlockTimer: any = null;

function desbloquearAlertas() {
  clearTimeout(unlockTimer);
  unlockTimer = setTimeout(() => (bloqueoToast = false), 500);
}

export const alertInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
) => {
  const alertService = inject(AlertService);
  const ngZone = inject(NgZone);

  const url = req.url.toLowerCase();

  // Interceptamos SOLO peticiones a BillAgenda API
  if (!url.startsWith(API_PREFIX.toLowerCase())) {
    return next(req);
  }

  return next(req).pipe(

    /* RESPUESTA EXITOSA (200–299)*/
    mergeMap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        const body: any = event.body;
        const mensaje = body?.respuesta?.mensaje || null;
        const codigo = body?.codigoEstado;

        // 🔥 Caso: backend envía "error" dentro de 200 (códigoEstado = 500)
        if (codigo === 500 && mensaje) {
          if (!bloqueoToast) {
            ngZone.run(() => alertService.error(mensaje, 'Error'));
            bloqueoToast = true;
            desbloquearAlertas();
          }

          const err = new HttpErrorResponse({
            status: 500,
            statusText: 'AppError',
            url: req.urlWithParams,
            error: { respuesta: { mensaje } }
          });

          return throwError(() => err);
        }

        // ✔ Éxito normal
        if (codigo >= 200 && codigo < 300 && mensaje) {
          if (!bloqueoToast) {
            ngZone.run(() => alertService.success(mensaje, 'Éxito'));
            bloqueoToast = true;
            desbloquearAlertas();
          }
        }
      }

      return of(event);
    }),

    /* ERRORES HTTP REALES*/
    catchError((error: HttpErrorResponse) => {
      // Usa tu propio método apiError()
      if (!bloqueoToast) {
        ngZone.run(() => alertService.apiError(error));
        bloqueoToast = true;
        desbloquearAlertas();
      }

      return throwError(() => error);
    })
  );
};
