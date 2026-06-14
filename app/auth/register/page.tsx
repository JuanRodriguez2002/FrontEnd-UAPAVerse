import RegisterForm from "@/features/auth/components/RegisterForm";

   export default function RegisterPage() {
     return (
       <main className="min-h-screen bg-gray-50">
         {/* La ruta solo renderiza el componente del feature */}
         <RegisterForm />
       </main>
     );
   }