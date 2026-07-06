"use client";

import { ArrowRight, Heart, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { getProjects } from "../services/projectService";
import type { Project } from "../types/project";


// editar las categorias a las que se tienen en base de datos, para que se muestren en el dashboard del visitante y empresa
// name es nombre del proyecto, category es la categoria a la que pertenece el proyecto y description es una breve descripcion del proyecto
/*const historial = [
 { name: "Pewdie Pie", category: "Biotecnologia", description: "Explora soluciones de visión artificial y automatización, en la salud." },
  { name: "Agustin Unaplay8", category: "Agrimensura", description: "Descubre experiencias inmersivas de agrimensura." },
  { name: "IBAI", category: "CloudComputing", description: "Una vista rápida de cloud computing." },
];*/


/*const stands = [
  //{ name: "Neural Labs", category: "IA y datos", description: "Explora soluciones de visión artificial y automatización." },
  //{ name: "EcoSphere", category: "Sostenibilidad", description: "Descubre experiencias inmersivas para negocios verdes." },
  //{ name: "CloudForge", category: "Cloud", description: "Una vista rápida de herramientas para escalar equipos." },
];*/


export function VisitorMainPage() {

  const [stands, setStands] = useState<Project[]>([]);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await getProjects();
        setStands(data);
      } catch (error) {
        console.error(error);
      }
    };

    loadProjects();
  }, []);
  if (!stands) return <div className="text-white">Cargando...</div>;
  return (
    <div className="space-y-6">
      <section className="rounded-[28px] border border-white/10 bg-gradient-to-br from-[#132a69] via-[#0a163e] to-[#060d2a]  py-20 p-10 shadow-[0_20px_70px_rgba(2,8,23,0.35)]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              Explora el universo de UAPAVerse
            </div>
            <h2 className="mt-4 text-2xl font-semibold text-white sm:text-3xl">
              Explora la feria desde una vista limpia y preparada para personalizar.
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-[#8f9bb8]">
              Este es el punto de partida para descubrir stands, charlas y experiencias que se alinean con tus intereses. Personaliza tu recorrido y saca el máximo provecho de la feria.
            </p>
          </div>

          <button className="inline-flex items-center justify-center gap-2 rounded-2xl border border-primary/30 bg-gradient-to-r from-primary to-cyan-400 px-6 py-4 text-base font-semibold text-white shadow-[0_12px_35px_rgba(34,211,238,0.28)] transition hover:scale-[1.02] hover:shadow-[0_16px_40px_rgba(34,211,238,0.35)]">
            Entrar a la feria
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </section>


      <section className="grid gap-6 ">

        <div className="rounded-[24px] border border-white/10 bg-[#0d1c4f]/65 p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Stands que podrían interesarte</h3>
            <button className="text-sm font-medium text-primary gap-2 rounded-2xl  px-4 py-3 text-sm font-semibold transition hover:bg-cyan-300/10 hover:text-cyan-300">Explorar</button>
          </div>

          <div className="mt-5 space-y-3">
            {stands.map((stand) => (
              <div key={stand.id ?? Math.random()} className="rounded-2xl border border-white/10 bg-white/5 p-4  hover:border-white/15 hover:bg-white/[0.045]">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-white">{stand.name_proyecto ?? "Sin nombre"}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.2em] text-primary">{stand.category?.name_categoria ?? "Sin categoría"}</p>
                  </div>
                  <button className="rounded-full border border-white/10 p-2 text-[#8f9bb8] transition hover:bg-red-800/10 hover:text-red-300">
                    <Heart className="h-4 w-4" />
                  </button>
                </div>
                <p className="mt-3 text-sm text-[#8f9bb8]">{stand.descripcion_proyecto ?? ""}</p>
              
              </div>
            ))}
          </div>
        </div>

      </section>
    </div>
  );
}
