import { Injectable } from '@angular/core';
import { switchMap, map, tap } from 'rxjs/operators';
import { Observable, from } from 'rxjs';

import { NegocioService } from '../services/negocio.service';
import { UsuarioService } from '../services/usuario.service';
import { FirebaseService } from '../services/firebase-service';

import { CreateNegocioDto } from '../interfaces/create-negocio.interface';
import { CreateUsuarioDto } from '../interfaces/create-usuario.interface';
import { TipoNegocio } from '../interfaces/tipo-negocio.interface';
import { environment } from '../../environment/environment';

@Injectable({ providedIn: 'root' })
export class NegocioMapper {

  // Último logo subido en este flujo (para borrar si se reintenta)
  private ultimoLogoSubido: string | null = null;

  constructor(
    private negocioService: NegocioService,
    private usuarioService: UsuarioService,
    private firebase: FirebaseService
  ) {}

  obtenerTiposNegocio(): Observable<TipoNegocio[]> {
    return this.negocioService.listarTiposNegocio().pipe(
      map(resp => resp?.respuesta?.datos ?? [])
    );
  }

  obtenerProvincias(): Observable<any[]> {
  return this.negocioService.obtenerProvincias().pipe(
    map(resp => {
      const lista = resp?.respuesta?.datos?.datos ?? [];

      return lista.map((p: any) => ({
        id: p.idProvincia,
        nombre: p.descripProv,
        codigo: p.codigoProv,
        capital: p.capital
      }));
    })
  );
}

obtenerCantones(provinciaId: number): Observable<any[]> {
  return this.negocioService.obtenerCantones(provinciaId).pipe(
    map(resp => {
      const lista = resp?.respuesta?.datos?.datos ?? [];

      return lista.map((c: any) => ({
        id: c.idCanton,
        nombre: c.descripCtn,    // ← nombre REAL correcto
        codigo: c.codigoCtn      // ← código REAL correcto
      }));
    })
  );
}



  /** Sube el logo a Firebase y devuelve la URL pública */
  private subirLogoFirebase(file: File, razonSocial: string): Observable<string> {
    const slug = razonSocial.toLowerCase().replace(/\s+/g, '-');
    const path = `negocios/${slug}/logo/${Date.now()}_${file.name}`;
    const encoded = encodeURIComponent(path);

    return from(
      this.firebase.uploadImage(file, path).then(() => {
        return `${environment.firebaseUrl}${encoded}`;
      })
    );
  }

  /** Crear negocio + usuario, subiendo logo si existe */
  registrarNegocioYUsuario(
    datosNegocio: any,
    datosUsuario: any
  ): Observable<any> {

    let upload$: Observable<string | null>;

    if (datosNegocio.logo instanceof File) {

      // Si ya se subió un logo en este flujo, borrarlo antes de subir el nuevo
      if (this.ultimoLogoSubido) {
        const internalPath = decodeURIComponent(
          this.ultimoLogoSubido.split('/o/')[1].split('?')[0]
        );
        this.firebase.deleteImage(internalPath);
      }

      upload$ = this.subirLogoFirebase(datosNegocio.logo, datosNegocio.razonSocial).pipe(
        tap(url => this.ultimoLogoSubido = url)
      );

    } else {
      // Sin archivo: usar el último logo subido o null si nunca hubo
      upload$ = from(Promise.resolve(this.ultimoLogoSubido ?? null));
    }

    return upload$.pipe(

      // Ojo: logoUrl es string | null
      switchMap((logoUrl) => {

        const payloadNegocio: CreateNegocioDto = {
          tipoNegocioId: datosNegocio.tipoNegocioId,
          ruc: datosNegocio.ruc,
          razonSocial: datosNegocio.razonSocial,
          nombreComercial: datosNegocio.nombreComercial,
          subdominio: datosNegocio.subdominio,
          // si es null, mandamos '' para que cumpla tipo string
          logo: logoUrl ?? undefined,
          correoAdmin: datosUsuario.correo,
          claveAdmin: datosNegocio.ruc
        };

        return this.negocioService.crearNegocio(payloadNegocio);
      }),

      switchMap((respNegocio: any) => {
        const negocioCreado = respNegocio?.respuesta?.datos ?? null;
        const negocioId = negocioCreado?.id;

        if (!negocioId) throw new Error('No ID returned');

        const payloadUsuario: CreateUsuarioDto = {
          identificacion: datosUsuario.identificacion,
          nombres: datosUsuario.nombres,
          apellidos: datosUsuario.apellidos,
          correo: datosUsuario.correo,
          celular: datosUsuario.celular,
          direccion: datosUsuario.direccion,
          img: datosUsuario.img || null,
          alias: datosUsuario.alias,
          clave: '',
          negocioId,
          cargoId: datosUsuario.cargoId ?? 1,
          estado: 1
        };

        return this.usuarioService.crearUsuario(payloadUsuario).pipe(
          map(respUsuario => ({
            negocio: negocioCreado,
            usuario: respUsuario?.respuesta?.datos ?? null
          }))
        );
      })
    );
  }

  /**para validar subdomino */
  verificarSubdominio(subdominio: string): Observable<any> {
  return this.negocioService.verificarDisponibilidadSubdominio(subdominio).pipe(
    map(resp => {
      const disponible = resp?.available === true;

      return {
        disponible,
        mensaje: disponible
          ? 'Subdominio disponible'
          : 'Subdominio ocupado, por favor ingrese uno nuevo',
        raw: resp
      };
    })
  );
}


}
