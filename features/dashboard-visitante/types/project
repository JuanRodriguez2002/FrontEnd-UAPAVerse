"use client";

export interface Resource {
  id: number;
  name_recurso: string;
  type_recurso: string;
  route_recurso: string;
}

export interface Category {
  id: number;
  name_categoria: string;
  description_categoria: string;
}

export interface User {
  id: number;
  name_usuario: string;
  email_usuario: string;
}

export interface Project {
  id: number;
  name_proyecto: string;
  descripcion_proyecto: string;
  estado_proyecto: string;
  carrera_asociada: string;
  tecnologias_utilizadas: string;
  demo_url: string;
  category: Category;
  user: User;
  resources: Resource[];
}