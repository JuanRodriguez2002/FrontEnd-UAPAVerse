export type StandStatus = "activo" | "borrador" | "revision";

export type Stand = {
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
