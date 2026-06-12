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
  User
} from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="min-h-screen bg-[#000c43] text-[#dee1ff] font-sans antialiased selection:bg-[#98cbff]/30">
        {/* 1. HEADER / NAVBAR DE LA LANDING */}
        <header className="w-[90%] max-w-[1440px] mx-auto my-7 px-6 py-2 flex items-center justify-between border border-blue-300/40 rounded-full bg-[#0e1a4f]/60 backdrop-blur-md shadow-[0_0_20px_rgba(147,197,253,0.3),inset_0_1px_1px_rgba(255,255,255,0.2)]">
          <div className="flex items-center gap-2">
            {/* Reemplazar con el logo oficial de UAPA VERSE si lo tienes en public/ */}
            <div className="text-xl font-extrabold tracking-wider text-[#f7f7f7] uppercase font-mono">
              <Image
                src="/images/image.png"
                alt="UAPAVerse"
                width={70}
                height={250}
                priority
              />
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#bfc7d3]">
            <a href="#about" className="hover:text-[#f7f7f7] transition-colors">
              Explore
            </a>
            <a
              href="#interests"
              className="hover:text-[#f7f7f7] transition-colors"
            >
              About
            </a>
            <a
              href="#mission"
              className="hover:text-[#f7f7f7] transition-colors"
            >
              Mission
            </a>
            <a
              href="/login"
              className="px-5 py-2 border border-[#98cbff]/30 rounded-full text-[#f7f7f7] hover:bg-[#98cbff]/10 transition-all"
            >
              Log in
            </a>
          </nav>

          <div className="flex items-center gap-2 text-blue-400" >
            <Bot/>
            <User/>

            
          </div>
        </header>

        {/* 2. HERO SECTION */}
        <section className="max-w-[1440px] mx-auto px-12 pt-16 pb-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#98cbff]/20 bg-[#09164b]/60 text-xs font-mono tracking-wider text-[#98cbff]">
              <Sparkles className="w-3.5 h-3.5" /> FERIA TECNOLÓGICA VIRTUAL DE
              PRÓXIMA GENERACIÓN
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
              <button className="px-6 py-3 bg-gradient-to-r from-[#1f97e7] to-[#a300ec] text-[#f7f7f7] rounded-full text-sm font-semibold tracking-wide hover:shadow-[0_0_20px_rgba(31,151,231,0.4)] transition-all flex items-center gap-2 group">
                Ingresar al Metaverso
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-6 py-3 border border-[#bfc7d3]/30 text-[#f7f7f7] rounded-full text-sm font-semibold tracking-wide hover:bg-white/5 transition-all">
                Ver Proyectos
              </button>
            </div>
          </div>

          {/* Lado derecho: Placeholder o Gráfico del Universo */}
          <div className="relative flex justify-center items-center">
            {/* Efecto de resplandor trasero */}
            <div className="absolute w-72 h-72 bg-[#a300ec]/20 rounded-full blur-[80px]" />
            <div className="absolute w-60 h-60 bg-[#1f97e7]/20 rounded-full blur-[60px] translate-x-12 -translate-y-12" />

            {/* Aquí puedes renderizar la ilustración del planeta/logo flotante de tu captura */}
            <div className="relative w-80 h-80 md:w-[420px] md:h-[420px] bg-[#0e1a4f]/40 backdrop-blur-md border border-white/10 rounded-full flex flex-col justify-center items-center p-8  shadow-[0_0_20px_rgba(147,197,253,0.3),inset_0_1px_1px_rgba(255,255,255,0.2)]">
              <Image
                src="/images/image.png"
                alt="UAPAVerse"
                width={600}
                height={350}
                priority
              />
            </div>
          </div>
        </section>

        {/* 3. SECCIÓN: DESCUBRE TUS INTERESES */}
        <section
          id="interests"
          className="max-w-[1440px] mx-auto px-6 py-20 border-t border-white/5"
        >
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl font-bold text-[#f7f7f7] uppercase tracking-wide">
              Descubre tus Intereses
            </h2>
            <p className="text-sm text-[#bfc7d3]">
              Explora áreas temáticas diseñadas para conectar la innovación con
              las últimas tendencias tecnológicas mundiales.
            </p>
          </div>

          {/* Grid de 3 Columnas para Intereses */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Tarjeta 1 */}
            <div className="bg-[#0e1a4f]/50 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:border-[#98cbff]/40 transition-all hover:bg-[#0e1a4f]/10 group shadow-[0_0_20px_rgba(147,197,253,0.3),inset_0_1px_1px_rgba(255,255,255,0.2)] " >
              <div className="w-10 h-10 rounded-xl bg-[#1f97e7]/10 flex items-center justify-center text-[#98cbff] mb-6 group-hover:bg-[#1f97e7]/20 transition-colors">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#f7f7f7] mb-2 uppercase tracking-wide">
                Inteligencia Artificial
              </h3>
              <p className="text-xs text-[#bfc7d3] leading-relaxed">
                Descubre proyectos de Aprendizaje Automático, automatización de
                sistemas y soluciones inteligentes orientadas a industrias de
                gran escala.
              </p>
            </div>

            {/* Tarjeta 2 */}
            <div className="bg-[#0e1a4f]/50 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:border-[#e6b4ff]/40 transition-all group shadow-[0_0_20px_rgba(147,197,253,0.3),inset_0_1px_1px_rgba(255,255,255,0.2)]">
              <div className="w-10 h-10 rounded-xl bg-[#a300ec]/10 flex items-center justify-center text-[#e6b4ff] mb-6 group-hover:bg-[#a300ec]/20 transition-colors">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#f7f7f7] mb-2 uppercase tracking-wide">
                Desarrollo de Software
              </h3>
              <p className="text-xs text-[#bfc7d3] leading-relaxed">
                Conoce soluciones empresariales móviles, web modernas y
                arquitecturas modulares diseñadas y orquestadas por ingenieros
                de la academia.
              </p>
            </div>

            {/* Tarjeta 3 */}
            <div className="bg-[#0e1a4f]/50 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:border-[#5AA8FF]/40 transition-all group shadow-[0_0_20px_rgba(147,197,253,0.3),inset_0_1px_1px_rgba(255,255,255,0.2)]">
              <div className="w-10 h-10 rounded-xl bg-[#5AA8FF]/10 flex items-center justify-center text-[#5AA8FF] mb-6 group-hover:bg-[#5AA8FF]/20 transition-colors">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#f7f7f7] mb-2 uppercase tracking-wide">
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

        {/* 4. SECCIÓN: ALIANZA UAPA & CADESOFT */}
        <section
          id="about"
          className="max-w-[1440px] mx-auto px-6 py-20 border-t border-white/5 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Lado izquierdo: Simulación de la paleta de colores/código de tu captura */}
          <div className="bg-[#000837] border border-white/5 rounded-2xl p-6 font-mono text-xs text-[#bfc7d3] shadow-inner space-y-3">
            <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-4">
              <span className="text-[#98cbff]">🎨 ALIANZA_ESTRATEGICA_LOG</span>
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                <div className="w-2 h-2 rounded-full bg-yellow-500" />
                <div className="w-2 h-2 rounded-full bg-green-500" />
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

          {/* Lado derecho: Información de la Alianza */}
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
            <p className="text-sm text-[#bfc7d3] leading-relaxed">
              Nuestro objetivo fundamental es proporcionar un entorno
              interactivo y colaborativo de alta fidelidad, donde estudiantes,
              académicos y corporaciones globales puedan auditar, exponer y
              desplegar proyectos tecnológicos de alto impacto.
            </p>
          </div>
        </section>

        {/* 5. SECCIÓN: VENTAJAS DE LA PLATAFORMA */}
        <section className="max-w-[1440px] mx-auto px-6 py-20 border-t border-white/5">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl font-bold text-[#f7f7f7] uppercase tracking-wide">
              Ventajas de la Plataforma
            </h2>
            <p className="text-sm text-[#bfc7d3]">
              Por qué UAPA VERSE es el destino ideal para incubar, auditar y
              descubrir el software del mañana.
            </p>
          </div>

          {/* Grid de 2x2 para las ventajas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Ventaja 1 */}
            <div className="flex gap-4 p-6 bg-[#0e1a4f]/30 border border-white/5 rounded-xl items-start ">
              <div className="p-2.5 rounded-lg bg-[#1f97e7]/10 text-[#98cbff] shrink-0">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-[#f7f7f7] uppercase tracking-wide mb-1">
                  Stands Virtuales Inmersivos
                </h4>
                <p className="text-xs text-[#bfc7d3] leading-relaxed">
                  Espacios tridimensionales hiper-personalizados que le permiten
                  a los expositores proyectar material multimedia, salas de chat
                  dedicadas y maquetas interactivas.
                </p>
              </div>
            </div>

            {/* Ventaja 2 */}
            <div className="flex gap-4 p-6 bg-[#0e1a4f]/30 border border-white/5 rounded-xl items-start">
              <div className="p-2.5 rounded-lg bg-[#a300ec]/10 text-[#e6b4ff] shrink-0">
                <Users2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-[#f7f7f7] uppercase tracking-wide mb-1">
                  Alcance Global Efectivo
                </h4>
                <p className="text-xs text-[#bfc7d3] leading-relaxed">
                  Derriba los muros territoriales. Conéctate con inversionistas,
                  reclutadores corporativos, desarrolladores y entusiastas desde
                  cualquier terminal en el mundo.
                </p>
              </div>
            </div>

            {/* Ventaja 3 */}
            <div className="flex gap-4 p-6 bg-[#0e1a4f]/30 border border-white/5 rounded-xl items-start">
              <div className="p-2.5 rounded-lg bg-[#5AA8FF]/10 text-[#5AA8FF] shrink-0">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-[#f7f7f7] uppercase tracking-wide mb-1">
                  Análisis de Datos en Tiempo Real
                </h4>
                <p className="text-xs text-[#bfc7d3] leading-relaxed">
                  Métricas granulares de retención y volumen de tráfico por zona
                  del stand. Monitorea el interés de los inversionistas y la
                  interacción de tus leads al instante.
                </p>
              </div>
            </div>

            {/* Ventaja 4 */}
            <div className="flex gap-4 p-6 bg-[#0e1a4f]/30 border border-white/5 rounded-xl items-start">
              <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-[#f7f7f7] uppercase tracking-wide mb-1">
                  Networking Avanzado Estructurado
                </h4>
                <p className="text-xs text-[#bfc7d3] leading-relaxed">
                  Salas privadas integradas para ruedas de negocios y
                  reclutamiento inmediato, optimizando la pasarela de contacto
                  directo entre expositores y empresas.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 6. FOOTER */}
        <footer className="w-full border-t border-white/5 bg-[#000837] py-12 text-center text-xs text-[#bfc7d3] space-y-4">
          <div className="text-sm font-bold text-[#f7f7f7] tracking-wider uppercase">
            UAPA<span className="text-[#98cbff]">VERSE</span>
          </div>
          <div className="flex justify-center gap-6 text-[#bfc7d3]/60">
            <a href="#" className="hover:text-[#f7f7f7] transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-[#f7f7f7] transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-[#f7f7f7] transition-colors">
              Tech Support
            </a>
          </div>
          <p className="text-[#bfc7d3]/40 pt-2">
            © {new Date().getFullYear()} UAPA x CADESOFT. Information in Orbit.
          </p>
        </footer>
      </div>
    </>
  );
}
