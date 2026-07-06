"use client";


import { notifyMetaversoSessionChanged } from "@/features/metaverso";

import { useState } from "react";
//para ir al siguiente link
import Link from "next/link";
//para tomar la siguiente imagen
import Image from "next/image";
import { Mail, Lock } from "lucide-react";
//para navegar a la siguiente pagina dependiendo del rol del usuario
import { useRouter } from "next/navigation";

export function LoginForm() {
  
        {/* 1. Inicializa el router */}
   const router = useRouter(); 

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

    const handleLogin = async () => {
    try {
      const response = await fetch(
        "https://backend-uapaverse.onrender.com/api/uapaverse/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      console.log("Respuesta:", data);

      if (response.ok) {
       localStorage.setItem("token", data.access_token);
        localStorage.setItem("user", JSON.stringify(data.user));

        console.log(JSON.stringify(data.user, null, 2));
        notifyMetaversoSessionChanged();

        /*
        alerta del explorador de que el login fue exitoso **
       alert("Inicio de sesión exitoso");

       muestra los datos del usuario en la consola** 
       console.log(data.user);
       
       (removido a peticion)
       */

       switch (data.user.role) {
            case "ADMIN":
              router.push("/dashboard-admin");
              break;
        {/* hay que crear el dashboard para el rol 2 invitado */}
            case "ACADEMICO":
              router.push("/dashboard-invitado");
              break;
          {/* hay que crear el dashboard para el rol 3 empresario*/}
            case "EMPRESARIAL":
              router.push("/dashboard-presentador");
              break;
          {/* hay que crear el dashboard para el rol 4 expositor/presentador o miembro de cadesoft*/}
            case "EXPOSITOR":
              router.push("/dashboard-presentador");
              break;
            default:
              router.push("/");
          }
      } else {
        alert(data.message || "Credenciales incorrectas");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("No se pudo conectar con el servidor");
    }
  };
  
{/* loguearse por Google */}
  const handleGoogleLogin = () => {
        
          console.log("Login con Google");
  };
  
{/* loguearse por Facebook */} 
  const handleFacebookLogin = () => {
          console.log("Login con Facebook");
  };
          
{/* loguearse por LinkedIn */}
  const handleLinkedinLogin = () => {
          console.log("Login con LinkedIn");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#030712]  via-[#050b18] to-[#02050c]">
      <div className="fixed inset-0 z-[70] flex items-center justify-center bg-[#041147] p-4 backdrop-blur-md">
       <div className="w-[90%] xl:w-[70%] max-w-7xl bg-[#0e1a4f]/95 rounded-3xl border border-secondary/20 shadow-[0_25px_90px_rgba(0,0,0,0.55),0_0_35px_rgba(230,180,255,0.08),inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-md p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center justify-items-center ">
            {/* Logo */}
            <div className="flex items-center justify-center w-full">
              <Image
                src="/images/logo.png"
                alt="UAPAVerse"
                width={600}
                height={350}
                priority
              />
            </div>

            {/* Formulario */}
            <div className="w-full max-w-md flex flex-col justify-center">
              <div>
                <h1 className="text-3xl font-bold text-center text-white mb-6">
                  ¡Bienvenidos!
                </h1>

                <div className="mb-4">
                  

                  <div className="relative w-full flex items-center">
                    {/* 2. El icono posicionado de forma absoluta */}
                    <Mail className="absolute left-4 text-[#1292E2] w-5 h-5 pointer-events-none" />

                    {/* 3. Tu input con 'pl-11' agregado para dar espacio al icono */}
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-full border border-white/10 bg-white/[0.04] px-4 py-3 pl-11 text-white outline-none transition placeholder:text-[#f2f3f5] focus:border-secondary/40 focus:bg-secondary/5"
                      placeholder="Correo"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  

                  <div className="relative w-full flex items-center">
                    {/* 2. El icono posicionado de forma absoluta */}
                    <Lock className="absolute left-4 text-[#1292E2] w-5 h-5 pointer-events-none" />

                    {/* 3. Tu input con 'pl-11' agregado para dar espacio al icono */}
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-full border border-white/10 bg-white/[0.04] px-4 py-3 pl-11 text-white outline-none transition placeholder:text-[#f2f3f5] focus:border-secondary/40 focus:bg-secondary/5"
                    placeholder="Contraseña"
                  />

                  </div>
                </div>

                <div className="text-center mb-4">
                  <Link
                    href="/auth/confirm-password"
                    className="text-sm text-[#8f9bb8] hover:text-white hover:underline"
                  >
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>

                <div className="flex gap-3">
                 <button
                    type="button"
                    onClick={handleLogin}
                    className="flex-1 text-center bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 text-white px-4 py-3 rounded-full shadow-[0_8px_20px_rgba(0,0,0,0.4)] shadow-indigo-500/20 hover:shadow-indigo-500/30 hover:scale-[1.02] transition-all duration-300"
                  >
                    Iniciar Sesión
                  </button>

                  <Link
                    href="/auth/register"
                    
                   className="flex-1 text-center rounded-full border border-white/10 px-4 py-3 text-[#aeb8d0] transition hover:bg-white/5 hover:text-white hover:scale-[1.02]"
                  >
                    Crear Cuenta
                  </Link>
                </div>
                  
                <div className="text-center mt-4">
                  <p className="text-sm text-[#8f9bb8]"> Continuar con </p> 
                </div>

                  {/* loguearse por Google, Facebook, LinkedIn */}

                  <div className="flex justify-center gap-6 mt-6">
                    
                  <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="hover:scale-110 transition-transform"
                  >
                    <Image
                      src="/images/social/google.svg"
                      alt="Google"
                      width={40}
                      height={40} 
                    />
                  </button>

                  <button
                    type="button"
                    onClick={handleFacebookLogin}
                    className="hover:scale-110 transition-transform"
                  >
                    <Image
                      src="/images/social/facebook.svg"
                      alt="Facebook"
                      width={40}
                      height={40}
                    />
                  </button>

                  <button
                    type="button"
                    onClick={handleLinkedinLogin}
                    className="hover:scale-110 transition-transform"
                  >
                    <Image
                      src="/images/social/linkedin.svg"
                      alt="LinkedIn"
                      width={40}
                      height={40}
                    />
                  </button>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
