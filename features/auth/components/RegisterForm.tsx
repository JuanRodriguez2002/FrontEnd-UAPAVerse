//export function RegisterForm() {
  //return <div className="p-4 border rounded"> [Aquí el Desarrollador A programará el formulario de register] </div>;
//}
"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// Interfaz para el componente de campos de entrada (Props)
interface InputFieldProps {
  label: string;
  id: string;
  type: 'text' | 'email' | 'password';
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// Componente reutilizable y tipado para los inputs del formulario
const InputField: React.FC<InputFieldProps> = ({
  label,
  id,
  type,
  placeholder,
  value,
  onChange,
}) => (
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
      value={value}
      onChange={onChange}
      className="w-full px-4 py-3.5 bg-[#041147] text-white placeholder-gray-500 rounded-xl border border-gray-700/60 transition-all duration-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
    />
  </div>
);

export default function RegistrationPage() {

  
  // FORM STATE
 
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  
  // ROLES STATE
  
  const [roles, setRoles] = useState<any[]>([]);
  const [roleId, setRoleId] = useState('');
  const router = useRouter();

  
  // LOAD ROLES API
  
  useEffect(() => {
    fetch('https://backend-uapaverse.onrender.com/api/uapaverse/role/list')
      .then(res => res.json())
      .then(data => setRoles(data))
      .catch(err => console.error(err));
  }, []);

  
  // SUBMIT REGISTER API
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    if (!roleId) {
      alert('Debes seleccionar un rol');
      return;
    }

    try {
      const res = await fetch(
        'https://backend-uapaverse.onrender.com/api/uapaverse/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
            fullName: name,
            roleId: Number(roleId),
          }),
        }
      );

      
      const data = await res.json();
      
      if (res.ok) {
        //alert('Usuario registrado correctamente');
        //console.log(data);
        router.push('/auth/login');
      } else {
        alert(data.message || 'Error al registrar');
      }

    } catch (error) {
      console.error(error);
      alert('Error de conexión');
    }
  };

  return (
    <div className="min-h-screen bg-[#041147] bg-gradient-to-b text-white antialiased selection:bg-orange-500/30 font-sans">

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-[calc(100vh-5rem)]">

        {/* Columna Izquierda  */}
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

          <div className="p-6 bg-gradient-to-br from-blue-950/40 to-purple-950/30 rounded-2xl border border-blue-500/10 backdrop-blur-sm max-w-md mx-auto lg:mx-0 text-left">
            <div className="flex items-center gap-3 mb-2">
              <span className="p-2 bg-blue-500/10 rounded-lg text-blue-400 text-xs font-bold tracking-wider uppercase">
                Descubre tus Intereses
              </span>
            </div>
            <p className="text-sm text-gray-400">
              Explora zonas temáticas diseñadas para conectar a innovadores con las últimas tendencias.
            </p>
          </div>
        </div>

        {/* FORM */}
        <div className="lg:col-span-6 w-full max-w-md mx-auto">
          <div className="bg-[#041147]/80 border border-gray-800/80 rounded-3xl p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden">

            <div className="relative z-10 space-y-6">

              <div>
                <h2 className="text-2xl font-bold tracking-tight">Crear cuenta</h2>
                <p className="text-sm text-gray-400 mt-1">
                  Empieza tu viaje en el metaverso tecnológico.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">

                <InputField
                  label="Nombre Completo"
                  id="name"
                  type="text"
                  placeholder="Ej. Alex Martínez"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <InputField
                  label="Correo Electrónico"
                  id="email"
                  type="email"
                  placeholder="alex@uapaverse.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <InputField
                  label="Contraseña"
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <InputField
                  label="Confirmar Contraseña"
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />

                {/*  SOLO AGREGADO: SELECT DE ROLES */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm text-gray-300">
                    Rol de usuario
                  </label>

                  <select
                    value={roleId}
                    onChange={(e) => setRoleId(e.target.value)}
                    className="w-full px-4 py-3.5 bg-[#041147] text-white rounded-xl border border-gray-700/60"
                    required
                  >
                    <option value="">Selecciona un rol</option>
                    {roles.map((role: any) => (
                      <option key={role.id} value={role.id}>
                        {role.name_rol}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input type="checkbox" id="terms" required />
                  <label htmlFor="terms" className="text-xs text-gray-400">
                    Acepto los términos de servicio
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 py-3.5 px-4 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg"
                >
                  Registrarse ahora
                </button>

              </form>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}