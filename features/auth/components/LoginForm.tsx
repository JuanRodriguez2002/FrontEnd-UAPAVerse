"use client";

import { useState } from "react";
//para ir al siguiente link
import Link from "next/link";
//para tomar la siguiente imagen
import Image from "next/image";
import { Mail, Lock } from "lucide-react";

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
        <div className="w-[90%]  xl:w-[70%] max-w-7xl  bg-white/50 backdrop-blur-md rounded-3xl shadow-xl p-12 min-h-12">
          <div className="grid md:grid-cols-2 gap-8 items-center justify-items-center ">
            {/* Logo */}
            <div className="flex items-center justify-center w-full">
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
                  

                  <div className="relative w-full flex items-center">
                    {/* 2. El icono posicionado de forma absoluta */}
                    <Mail className="absolute left-4 text-blue-950 w-5 h-5 pointer-events-none" />

                    {/* 3. Tu input con 'pl-11' agregado para dar espacio al icono */}
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border-2 border-blue-950 rounded-full py-2 pl-11 pr-4 focus:outline-none focus:border-blue-950 text-blue-950 placeholder:text-blue-950 font-bold "
                      placeholder="Correo"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  

                  <div className="relative w-full flex items-center">
                    {/* 2. El icono posicionado de forma absoluta */}
                    <Lock className="absolute left-4 text-blue-950 w-5 h-5 pointer-events-none" />

                    {/* 3. Tu input con 'pl-11' agregado para dar espacio al icono */}
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border-2 border-blue-950 rounded-full py-2 pl-11 pr-4 focus:outline-none focus:border-blue-950 text-blue-950 placeholder:text-blue-950 font-bold "
                    placeholder="Contraseña"
                  />

                  </div>
                </div>

                <div className="text-center mb-4">
                  <Link
                    href="/auth/confirm-password"
                    className="text-sm text-blue-950 hover:underline font-bold "
                  >
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleLogin}
                    className="flex-1 bg-blue-950 font-bold text-white py-3 rounded-full shadow-[0_5px_15px_rgba(0,0,0,0.25)] hover:scale-[1.02] transition-all duration-300"
                  >
                    Iniciar Sesión
                  </button>

                  <Link
                    href="/auth/register"
                    className="flex-1 text-center text-blue-950 font-bold bg-gray-200 py-3 rounded-full shadow-[0_5px_15px_rgba(0,0,0,0.25)] hover:scale-[1.02] transition-all duration-300"
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
