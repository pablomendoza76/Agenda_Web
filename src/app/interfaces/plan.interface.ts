export interface Plan {
    idPlan: number;
    nombre: string;
    descripcion: string;
    precio: number;

    usuariosMax: number;
    citasMensualesMax: number;

    recordatoriosCorreo: boolean;
    recordatoriosWhatsapp: boolean;

    gestionCitasBasico: boolean;
    gestionPersonalServicios: boolean;

    reportesDetallados: boolean;
    integracionExterna: boolean;

    isActivo: boolean;
}
