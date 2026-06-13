//export function RegisterForm() {
  //return <div className="p-4 border rounded"> [Aquí el Desarrollador A programará el formulario de register] </div>;
//}

import React from 'react';
import Image from 'next/image';


// Interfaz para el componente de campos de entrada (Props)
interface InputFieldProps {
  label: string;
  id: string;
  type: 'text' | 'email' | 'password';
  placeholder: string;
}

// Componente reutilizable y tipado para los inputs del formulario
const InputField: React.FC<InputFieldProps> = ({ label, id, type, placeholder }) => (
  <div className="flex flex-col gap-1.5">
    <label htmlFor={id} className="text-sm font-medium text-gray-300">
      {label}
    </label>
    <input
      type={type}
      id={id}
      name={id}
      placeholder={placeholder}
      required
      className="w-full px-4 py-3.5 bg-[#0b132b] text-white placeholder-gray-500 rounded-xl border border-gray-700/60 transition-all duration-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
    />
  </div>
);

export default function RegistrationPage() {
  return (
    <div className="min-h-screen bg-[#030712] bg-gradient-to-b from-[#030712] via-[#050b18] to-[#02050c] text-white antialiased selection:bg-orange-500/30 font-sans">
      
      {/* Navbar */}
      <header className="border-b border-gray-800/60 backdrop-blur-md bg-[#030712]/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between 
        rounded-full border border-blue-500/20 shadow-lg shadow-blue-950/20">
          <div className="flex items-center gap-3">
            <div className="relative w-20 h-20">
              <Image 
                src="/images/image.png"  
                alt="UAPA VERSE Logo" 
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="text-xl font-black tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
              
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Explorar</a>
            <a href="#" className="hover:text-white transition-colors">Sobre Nosotros</a>
            <a href="#" className="hover:text-white transition-colors">Misión</a>
            <a href="#" className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-all border border-white/10">
              Iniciar Sesión
            </a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-[calc(100vh-5rem)]">
        
        {/* Columna Izquierda: Branding & Metaverso */}
        <div className="lg:col-span-6 space-y-8 lg:pr-8 text-center lg:text-left">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1]">
              Bienvenidos a <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500">
                UAPA VERSE
              </span>
            </h1>
            <p className="text-gray-400 text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
              La feria tecnológica virtual de próxima generación. Explora el futuro de la innovación y la colaboración digital en un entorno 3D inmersivo.
            </p>
          </div>

          {/* Tarjeta Informativa pequeña estilo la imagen */}
          <div className="p-6 bg-gradient-to-br from-blue-950/40 to-purple-950/30 rounded-2xl border border-blue-500/10 backdrop-blur-sm max-w-md mx-auto lg:mx-0 text-left">
            <div className="flex items-center gap-3 mb-2">
              <span className="p-2 bg-blue-500/10 rounded-lg text-blue-400 text-xs font-bold tracking-wider uppercase">
                Descubre tus Intereses
              </span>
            </div>
            <p className="text-sm text-gray-400">
              Explora zonas temáticas diseñadas para conectar a innovadores con las últimas tendencias: Inteligencia Artificial, Desarrollo de Software y Ciberseguridad.
            </p>
          </div>
        </div>

        {/* Columna Derecha: Formulario de Registro */}
        <div className="lg:col-span-6 w-full max-w-md mx-auto">
          <div className="bg-[#070d1e]/80 border border-gray-800/80 rounded-3xl p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden group">
            
            {/* Efecto de luz ambiental de fondo */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-blue-500/20 transition-all duration-500" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-purple-500/20 transition-all duration-500" />

            <div className="relative z-10 space-y-6">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Crear cuenta</h2>
                <p className="text-sm text-gray-400 mt-1">Empieza tu viaje en el metaverso tecnológico.</p>
              </div>

              <form className="space-y-5">
                <InputField 
                  label="Nombre Completo" 
                  id="name" 
                  type="text" 
                  placeholder="Ej. Alex Martínez" 
                />
                
                <InputField 
                  label="Correo Electrónico" 
                  id="email" 
                  type="email" 
                  placeholder="alex@uapaverse.com" 
                />

                <InputField 
                  label="Contraseña" 
                  id="password" 
                  type="password" 
                  placeholder="••••••••" 
                />

                <InputField 
                  label="Confirmar Contraseña" 
                  id="confirmPassword" 
                  type="password" 
                  placeholder="••••••••" 
                />

                <div className="flex items-center gap-2 pt-2">
                  <input 
                    type="checkbox" 
                    id="terms" 
                    required 
                    className="w-4 h-4 rounded border-gray-700 bg-[#0b132b] text-blue-500 focus:ring-blue-500/20"
                  />
                  <label htmlFor="terms" className="text-xs text-gray-400 select-none">
                    Acepto los <a href="#" className="text-blue-400 hover:underline">Términos de Servicio</a> y la <a href="#" className="text-blue-400 hover:underline">Política de Privacidad</a>.
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 py-3.5 px-4 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 hover:opacity-95 active:scale-[0.98] transition-all duration-200"
                >
                  Registrarse ahora
                </button>
              </form>

              <div className="text-center pt-2">
                <p className="text-sm text-gray-400">
                  ¿Ya tienes usuario?{' '}
                  <a href="#" className="text-blue-400 hover:text-blue-300 font-medium transition-colors hover:underline">
                    Inicia sesión
                  </a>
                </p>
              </div>
            </div>

          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-gray-900 bg-[#02050c] py-8 text-center text-xs text-gray-500">
        <p>© {new Date().getFullYear()} UAPA VERSE. Desarrollado para la próxima generación digital.</p>
      </footer>

    </div>
  );
}