export interface CreateUsuarioDto {
  identificacion: string;
  nombres: string;
  apellidos: string;
  correo: string;
  celular: string;
  direccion: string;
  img?: string;             // opcional si todavía no sube foto
  alias: string;
  clave: string;
  negocioId: number;
  cargoId: number;
  estado: number;
}
