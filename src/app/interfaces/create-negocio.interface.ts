export interface CreateNegocioDto {
  tipoNegocioId: number;
  ruc: string;
  razonSocial: string;
  nombreComercial?: string;
  subdominio: string;
  logo?: string | File;
  correoAdmin: string;
  claveAdmin: string;
}
