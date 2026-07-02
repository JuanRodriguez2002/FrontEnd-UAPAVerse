export type StandStatus = "activo" | "borrador" | "revision";

export type Stand = {
  estado_desarrollo: string;
  name_proyecto: string;
  descripcion_proyecto: string;
  id_categoria: any;
  demo_url: string;
  contacto_nombre: string;
  contacto_telefono: string;
  contacto_correo: string;
  informacion_comercial: string;
  tecnologias_utilizadas: string;
  estado_proyecto: string;
  id: string;
  nombre: string;
  descripcion: string;
  tecnologia: string;
  categoria: string;
  tagline: string;
  tags: string[];
  sitioWeb: string;
  contacto: string;
  stackPrincipal: string;
  requisitosHardware: string;
  enlaceRepositorio: string;
  representante: string;
  emailHolograma: string;
  logoNombre: string;
  bannerNombre: string;
  demoNombre: string;
  status: StandStatus;
  colorAcento: string;
  visitas: number;
  empresasInteresadas: number;
};

export type StandFormData = Omit<Stand, "id" | "visitas" | "empresasInteresadas">;
