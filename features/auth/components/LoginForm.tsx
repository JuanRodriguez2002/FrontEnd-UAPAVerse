"use client";

import { useState } from "react";
//para ir al siguiente link 
import Link from "next/link";
//para tomar la siguiente imagen
import Image from "next/image";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
  console.log("Email:", email);
  console.log("Password:", password);
};

return (
  <div
     className="min-h-screen bg-cover bg-center"
  style={{
    backgroundImage: "url('/images/fondo-login.webp')",
  }}
  >
    <div className="min-h-screen flex items-center justify-center bg-white/30">
    <div className="w-[90%] max-w-7xl min-h-[650px] bg-white/70 backdrop-blur-md rounded-3xl shadow-xl p-12">
      <div className="grid md:grid-cols-2 gap-8 items-center justify-items-center min-h-[500px]">

        {/* Logo */}
        <div className="flex items-center justify-center h-full">
          <Image
            src="/images/logo-uapaverse.png"
            alt="UAPAVerse"
            width={600}
            height={350}
            priority
          />
        </div>

        {/* Formulario */}
         <div className="w-full max-w-md flex flex-col justify-center">
        <div>
          <h1 className="text-3xl font-bold text-center mb-6">
            ¡Bienvenidos!
          </h1>

          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Correo Electrónico
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-2 border-blue-700 rounded-full p-3 focus:outline-none focus:border-blue-900"
              placeholder="correo@ejemplo.com"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Contraseña
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-2 border-blue-700 rounded-full p-3 focus:outline-none focus:border-blue-900"
              placeholder="********"
            />
          </div>

          <div className="text-center mb-4">
            <Link
              href="/auth/confirm-password"
              className="text-sm text-blue-700 hover:underline "
            >
              ¿Olvidaste tu contraseña?
            </Link>
            
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleLogin}
              className="flex-1 bg-blue-700 text-white py-3 rounded-full shadow-[0_5px_15px_rgba(0,0,0,0.25)] hover:scale-[1.02] transition-all duration-300"
            >
              Iniciar Sesión
            </button>

            <Link
              href="/auth/register"
              className="flex-1 text-center bg-gray-200 py-3 rounded-full shadow-[0_5px_15px_rgba(0,0,0,0.25)] hover:scale-[1.02] transition-all duration-300"
            >
              Crear Cuenta
            </Link>
            
          </div>
          
        </div>
        </div>
      </div>
    </div>
    </div>
  </div>
);  

}

