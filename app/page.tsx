"use client";

import React from "react";
import {
  Globe,
  Cpu,
  ShieldCheck,
  Layers,
  BarChart3,
  Users2,
  ArrowRight,
  Sparkles,
  Bot,
  User,
  Eye,
  Target,
  Award,
} from "lucide-react";
import Image from "next/image";

import NavbarLanding from "@/app/components/NavbarLanding";

export default function Home() {
  return (
    <>
      {/* Inyección de una pequeña animación nativa para el logo flotante */}
      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        html {
          scroll-behavior: smooth;
        }
      `}</style>

      <div className="min-h-screen bg-[#000c43] text-[#dee1ff] font-sans antialiased selection:bg-[#98cbff]/30">
        {/* 1. HEADER / NAVBAR FIJO SUPERIOR */}
        <div className="sticky top-0 z-50 w-full bg-[#000c43]/40 backdrop-blur-md py-2">
          <header className="w-[90%] max-w-[1440px] mx-auto px-6 py-2 flex items-center justify-between border border-blue-300/40 rounded-full bg-[#0e1a4f]/80 shadow-[0_0_20px_rgba(147,197,253,0.3),inset_0_1px_1px_rgba(255,255,255,0.2)]">
            <div className="flex items-center gap-2">
              <div className="text-xl font-extrabold tracking-wider text-[#f7f7f7] uppercase font-mono">
                <Image
                  src="/images/logo.png"
                  alt="UAPAVerse"
                  width={70}
                  height={250}
                  priority
                />
              </div>
            </div>

            <NavbarLanding />

            <div className="flex items-center gap-2 text-blue-400">
              <Bot className="w-5 h-5 hover:scale-110 hover:text-white transition-all cursor-pointer duration-300" />
              <User className="w-5 h-5 hover:scale-110 hover:text-white transition-all cursor-pointer duration-300" />
            </div>
          </header>
        </div>

        {/* 2. HERO SECTION (#inicio) */}
        <section
          id="inicio"
          className="max-w-[1440px] mx-auto px-12 pt-20 pb-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center scroll-mt-28"
        >
          {/* Lado Izquierdo */}
          <div className="space-y-6 transform transition-all duration-700 ease-out">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#98cbff]/20 bg-[#09164b]/60 text-xs font-mono tracking-wider text-[#98cbff]">
              <Sparkles className="w-3.5 h-3.5 animate-pulse text-purple-400" />{" "}
              FERIA TECNOLÓGICA VIRTUAL DE PRÓXIMA GENERACIÓN
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-[#f7f7f7] tracking-tight leading-tight uppercase">
              Bienvenidos a <br />
              <span className="bg-gradient-to-r from-[#98cbff] via-[#e6b4ff] to-[#5AA8FF] bg-clip-text text-transparent">
                UAPA VERSE
              </span>
            </h1>
            <p className="text-base text-[#bfc7d3] max-w-lg leading-relaxed">
              Explora el futuro de la innovación y la colaboración digital en un
              entorno 3D inmersivo. Un espacio virtual donde las ideas cobran
              vida.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <button className="px-6 py-3 bg-gradient-to-r from-[#1f97e7] to-[#a300ec] text-[#f7f7f7] rounded-full text-sm font-semibold tracking-wide hover:shadow-[0_0_25px_rgba(31,151,231,0.6)] transition-all duration-300 flex items-center gap-2 group">
                Ingresar al Metaverso
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              <button className="px-6 py-3 border border-[#bfc7d3]/30 text-[#f7f7f7] rounded-full text-sm font-semibold tracking-wide hover:bg-white/5 hover:border-white/40 transition-all duration-300">
                Ver Proyectos
              </button>
            </div>
          </div>

          {/* Lado derecho */}
          <div className="relative flex justify-center items-center">
            <div className="absolute w-72 h-72 bg-[#a300ec]/20 rounded-full blur-[80px] animate-pulse duration-[4000ms]" />
            <div className="absolute w-60 h-60 bg-[#1f97e7]/20 rounded-full blur-[60px] translate-x-12 -translate-y-12 animate-pulse duration-[5000ms]" />

            <div className="relative w-80 h-80 md:w-[420px] md:h-[420px] bg-[#0e1a4f]/40 backdrop-blur-md border border-white/10 rounded-full flex flex-col justify-center items-center p-8 shadow-[0_0_20px_rgba(147,197,253,0.3),inset_0_1px_1px_rgba(255,255,255,0.2)] animate-float">
              <Image
                src="/images/logo.png"
                alt="UAPAVerse"
                width={600}
                height={350}
                priority
                className="transform transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>
        </section>

        {/* 3. GALERÍA DE PREVIEW (Disposición vertical basada en image_b97028.jpg) */}
        <section className="max-w-[1440px] mx-auto px-6 py-20 border-t border-white/5">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <h2 className="text-3xl font-bold text-[#f7f7f7] uppercase tracking-wide">
              Vista Previa de Funcionalidades
            </h2>
            <p className="text-sm text-cyan-400 font-mono tracking-wider">
              Explora la interfaz interna del ecosistema
            </p>
          </div>

          {/* Grid de 3 Columnas Verticales de Aspecto Estilizado */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Foto 1: Dashboards Interactivos */}
            <div className="group relative rounded-2xl border border-white/10 bg-[#0e1a4f]/40 overflow-hidden aspect-[3/4] shadow-[0_0_20px_rgba(147,197,253,0.1)] transition-all duration-500">
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80"
                  alt="Dashboards Interactivos"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 filter brightness-90 group-hover:brightness-100"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#000c43] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-0 left-0 right-0 p-6 transform transition-transform duration-300">
                <h3 className="text-lg font-bold text-white uppercase tracking-wider group-hover:text-[#98cbff] transition-colors">
                  Dashboards Interactivos
                </h3>
              </div>
            </div>

            {/* Foto 2: Metaverso */}
            <div className="group relative rounded-2xl border border-white/10 bg-[#0e1a4f]/40 overflow-hidden aspect-[3/4] shadow-[0_0_20px_rgba(147,197,253,0.1)] transition-all duration-500">
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?auto=format&fit=crop&w=600&q=80"
                  alt="Metaverso"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 filter brightness-90 group-hover:brightness-100"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#000c43] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-0 left-0 right-0 p-6 transform transition-transform duration-300">
                <h3 className="text-lg font-bold text-white uppercase tracking-wider group-hover:text-[#e6b4ff] transition-colors">
                  Metaverso
                </h3>
              </div>
            </div>

            {/* Foto 3: Proyectos Innovadores */}
            <div className="group relative rounded-2xl border border-white/10 bg-[#0e1a4f]/40 overflow-hidden aspect-[3/4] shadow-[0_0_20px_rgba(147,197,253,0.1)] transition-all duration-500">
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80"
                  alt="Proyectos Innovadores"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 filter brightness-90 group-hover:brightness-100"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#000c43] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-0 left-0 right-0 p-6 transform transition-transform duration-300">
                <h3 className="text-lg font-bold text-white uppercase tracking-wider group-hover:text-[#5AA8FF] transition-colors">
                  Proyectos Innovadores
                </h3>
              </div>
            </div>
          </div>
        </section>

        {/* 4. SECCIÓN: SOBRE NOSOTROS (#nosotros) */}
        <section
          id="nosotros"
          className="max-w-[1440px] mx-auto px-6 py-20 border-t border-white/5 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center scroll-mt-28"
        >
          {/* Lado izquierdo */}
          <div className="bg-[#000837] border border-white/5 rounded-2xl p-6 font-mono text-xs text-[#bfc7d3] shadow-inner space-y-3 hover:border-purple-500/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(163,0,236,0.15)]">
            <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-4">
              <span className="text-[#98cbff]">🎨 ALIANZA_ESTRATEGICA_LOG</span>
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              </div>
            </div>
            <p>
              <span className="text-purple-400">const</span> Alianza = &#123;
            </p>
            <p className="pl-4">
              institucion: <span className="text-green-300">"UAPA"</span>,
            </p>
            <p className="pl-4">
              desarrollo: <span className="text-green-300">"CADESOFT"</span>,
            </p>
            <p className="pl-4">
              ecosistema:{" "}
              <span className="text-green-300">"Metaverso Inmersivo"</span>,
            </p>
            <p className="pl-4">
              status: <span className="text-amber-300">"ONLINE"</span>
            </p>
            <p>&#125;;</p>
          </div>

          {/* Lado derecho */}
          <div className="space-y-4">
            <span className="text-xs font-mono tracking-widest text-[#a300ec] uppercase">
              Alianza Estratégica
            </span>
            <h2 className="text-3xl font-bold text-[#f7f7f7] uppercase tracking-wide">
              UAPA & CADESOFT
            </h2>
            <p className="text-sm text-[#bfc7d3] leading-relaxed">
              UAPA VERSE es el resultado directo de la visión compartida entre
              la Universidad Abierta para Adultos (UAPA) y CADESOFT. Una
              plataforma de vanguardia diseñada para trascender las barreras
              físicas y fundar un ecosistema digital nativo donde la educación,
              la investigación tecnológica avanzada y el sector comercial
              convergen.
            </p>
          </div>
        </section>

        {/* 5. SECCIÓN: MISIÓN, VISIÓN Y VALORES (#mision) */}
        <section
          id="mision"
          className="max-w-[1440px] mx-auto px-6 py-20 border-t border-white/5 scroll-mt-28"
        >
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl font-bold text-[#f7f7f7] uppercase tracking-wide">
              Filosofía Institucional
            </h2>
            <p className="text-sm text-[#bfc7d3]">
              Los pilares estratégicos que sustentan el desarrollo de nuestro
              entorno inmersivo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Misión */}
            <div className="bg-[#0e1a4f]/40 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:border-[#98cbff]/40 transition-all duration-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
              <div className="w-12 h-12 rounded-xl bg-[#1f97e7]/10 flex items-center justify-center text-[#98cbff] mb-6">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#f7f7f7] mb-3 uppercase tracking-wide">
                Misión
              </h3>
              <p className="text-xs text-[#bfc7d3] leading-relaxed">
                Ofrecer un espacio virtual interactivo de vanguardia que permita
                la divulgación científica, la exposición de proyectos
                tecnológicos y la interconexión global entre estudiantes,
                docentes y el sector empresarial.
              </p>
            </div>

            {/* Visión */}
            <div className="bg-[#0e1a4f]/40 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:border-[#e6b4ff]/40 transition-all duration-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
              <div className="w-12 h-12 rounded-xl bg-[#a300ec]/10 flex items-center justify-center text-[#e6b4ff] mb-6">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#f7f7f7] mb-3 uppercase tracking-wide">
                Visión
              </h3>
              <p className="text-xs text-[#bfc7d3] leading-relaxed">
                Convertirnos en el ecosistema de ferias virtuales referente a
                nivel internacional, destacando por el uso de tecnologías de
                renderizado tridimensional avanzadas y la automatización
                estructurada de datos.
              </p>
            </div>

            {/* Valores */}
            <div className="bg-[#0e1a4f]/40 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:border-[#5AA8FF]/40 transition-all duration-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
              <div className="w-12 h-12 rounded-xl bg-[#5AA8FF]/10 flex items-center justify-center text-[#5AA8FF] mb-6">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#f7f7f7] mb-3 uppercase tracking-wide">
                Valores
              </h3>
              <ul className="text-xs text-[#bfc7d3] space-y-2 leading-relaxed list-disc list-inside">
                <li>
                  <strong className="text-white">Innovación:</strong> Evolución
                  tecnológica continua.
                </li>
                <li>
                  <strong className="text-white">Colaboración:</strong> Trabajo
                  en red sin barreras geográficas.
                </li>
                <li>
                  <strong className="text-white">Excelencia:</strong> Desarrollo
                  bajo estándares de alta calidad.
                </li>
                <li>
                  <strong className="text-white">Inclusión:</strong> Acceso
                  global descentralizado.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 6. SECCIÓN: INTERESES */}
        <section className="max-w-[1440px] mx-auto px-6 py-20 border-t border-white/5">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl font-bold text-[#f7f7f7] uppercase tracking-wide">
              Áreas Temáticas
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#0e1a4f]/50 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:border-[#98cbff]/50 hover:bg-[#0e1a4f]/30 hover:-translate-y-2 transition-all duration-300 group shadow-[0_0_20px_rgba(147,197,253,0.3)] cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-[#1f97e7]/10 flex items-center justify-center text-[#98cbff] mb-6 group-hover:bg-[#1f97e7]/20 group-hover:scale-110 transition-all duration-300">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#f7f7f7] mb-2 uppercase tracking-wide group-hover:text-[#98cbff] transition-colors duration-300">
                Inteligencia Artificial
              </h3>
              <p className="text-xs text-[#bfc7d3] leading-relaxed">
                Descubre proyectos de Aprendizaje Automático, automatización de
                sistemas y soluciones inteligentes orientadas a industrias de
                gran escala.
              </p>
            </div>

            <div className="bg-[#0e1a4f]/50 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:border-[#e6b4ff]/50 hover:bg-[#0e1a4f]/30 hover:-translate-y-2 transition-all duration-300 group shadow-[0_0_20px_rgba(147,197,253,0.3)] cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-[#a300ec]/10 flex items-center justify-center text-[#e6b4ff] mb-6 group-hover:bg-[#a300ec]/20 group-hover:scale-110 transition-all duration-300">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#f7f7f7] mb-2 uppercase tracking-wide group-hover:text-[#e6b4ff] transition-colors duration-300">
                Desarrollo de Software
              </h3>
              <p className="text-xs text-[#bfc7d3] leading-relaxed">
                Conoce soluciones empresariales móviles, web modernas y
                arquitecturas modulares diseñadas y orquestadas por ingenieros
                de la academia.
              </p>
            </div>

            <div className="bg-[#0e1a4f]/50 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:border-[#5AA8FF]/50 hover:bg-[#0e1a4f]/30 hover:-translate-y-2 transition-all duration-300 group shadow-[0_0_20px_rgba(147,197,253,0.3)] cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-[#5AA8FF]/10 flex items-center justify-center text-[#5AA8FF] mb-6 group-hover:bg-[#5AA8FF]/20 group-hover:scale-110 transition-all duration-300">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#f7f7f7] mb-2 uppercase tracking-wide group-hover:text-[#5AA8FF] transition-colors duration-300">
                Ciberseguridad
              </h3>
              <p className="text-xs text-[#bfc7d3] leading-relaxed">
                Sistemas e infraestructura digital protegida contra
                vulnerabilidades complejas, auditorías automatizadas y
                protocolos de encriptación cuántica.
              </p>
            </div>
          </div>
        </section>

        {/* 7. SECCIÓN: VENTAJAS */}
        <section className="max-w-[1440px] mx-auto px-6 py-20 border-t border-white/5">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl font-bold text-[#f7f7f7] uppercase tracking-wide">
              Ventajas de la Plataforma
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: <Globe className="w-5 h-5" />,
                title: "Stands Virtuales Inmersivos",
                color: "text-[#98cbff]",
                bg: "bg-[#1f97e7]/10",
                desc: "Espacios tridimensionales hiper-personalizados que le permiten a los expositores proyectar material multimedia.",
              },
              {
                icon: <Users2 className="w-5 h-5" />,
                title: "Alcance Global Efectivo",
                color: "text-[#e6b4ff]",
                bg: "bg-[#a300ec]/10",
                desc: "Conéctate con inversionistas, reclutadores corporativos y desarrolladores desde cualquier terminal.",
              },
              {
                icon: <BarChart3 className="w-5 h-5" />,
                title: "Análisis de Datos en Tiempo Real",
                color: "text-[#5AA8FF]",
                bg: "bg-[#5AA8FF]/10",
                desc: "Métricas granulares de retención y volumen de tráfico por zona del stand de manera instantánea.",
              },
              {
                icon: <Sparkles className="w-5 h-5" />,
                title: "Networking Avanzado Estructurado",
                color: "text-emerald-400",
                bg: "bg-emerald-500/10",
                desc: "Salas privadas integradas para ruedas de negocios y reclutamiento corporativo inmediato.",
              },
            ].map((ventaja, index) => (
              <div
                key={index}
                className="flex gap-4 p-6 bg-[#0e1a4f]/30 border border-white/5 rounded-xl items-start hover:border-white/20 hover:bg-[#0e1a4f]/50 transition-all duration-300 group"
              >
                <div
                  className={`p-2.5 rounded-lg ${ventaja.bg} ${ventaja.color} group-hover:scale-110 transition-transform duration-300 shrink-0`}
                >
                  {ventaja.icon}
                </div>
                <div>
                  <h4 className="text-base font-bold text-[#f7f7f7] uppercase tracking-wide mb-1">
                    {ventaja.title}
                  </h4>
                  <p className="text-xs text-[#bfc7d3] leading-relaxed">
                    {ventaja.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 8. FOOTER */}
        <footer className="w-full border-t border-white/5 bg-[#000837] py-12 text-center text-xs text-[#bfc7d3] space-y-4">
          <div className="text-sm font-bold text-[#f7f7f7] tracking-wider uppercase">
            UAPA<span className="text-[#98cbff]">VERSE</span>
          </div>
          <p className="text-[#bfc7d3]/40 pt-2">
            © {new Date().getFullYear()} UAPA x CADESOFT. Información en Órbita.
          </p>
        </footer>
      </div>
    </>
  );
}
