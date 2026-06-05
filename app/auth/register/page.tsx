import { RegisterForm } from "@/features/auth/components/RegisterForm";

   export default function RegisterPage() {
     return (
       <main className="flex min-h-screen items-center justify-center bg-gray-50">
         {/* La ruta solo renderiza el componente del feature */}
         <RegisterForm />
       </main>
     );
   }