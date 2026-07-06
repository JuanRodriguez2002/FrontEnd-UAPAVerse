"use client";

const API = "https://backend-uapaverse.onrender.com/api/uapaverse";

export async function getProjects() {
  const response = await fetch(`${API}/project/list`);

  if (!response.ok) {
    throw new Error("Error obteniendo proyectos");
  }

  return response.json();
}