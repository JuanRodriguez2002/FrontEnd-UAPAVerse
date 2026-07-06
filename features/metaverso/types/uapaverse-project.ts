export interface UapaverseCategory {
  id: number;
  name_categoria: string;
  description_categoria: string;
}

export interface UapaverseUserRole {
  id: number;
  name_rol: string;
}

export interface UapaverseUser {
  id: number;
  name_usuario: string;
  email_usuario: string;
  role: UapaverseUserRole;
}

export interface UapaverseResource {
  id: number;
  name_recurso: string;
  type_recurso: string;
  route_recurso: string;
}

export interface UapaverseProject {
  id: number;
  name_proyecto: string;
  descripcion_proyecto: string;
  fecha_registro_proyecto: string;
  estado_proyecto: string;
  carrera_asociada: string;
  tecnologias_utilizadas: string;
  nivel_madurez_tecnologica: string;
  estado_desarrollo: string;
  informacion_tecnica: string;
  informacion_comercial: string;
  demo_url: string;
  contacto_nombre: string;
  contacto_telefono: string;
  contacto_correo: string;
  nombre_grupo: string;
  contacto_rol: string;
  id_categoria: number;
  id_usuario: number;
  created_at: string;
  updated_at: string;
  category: UapaverseCategory;
  user: UapaverseUser;
  resources: UapaverseResource[];
}
