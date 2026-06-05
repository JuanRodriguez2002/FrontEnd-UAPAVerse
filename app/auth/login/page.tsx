import { LoginForm } from "@/features/auth/components/LoginForm";

   export default function LoginPage() {
     return (
       <main className="flex min-h-screen items-center justify-center bg-gray-50">
         {/* La ruta solo renderiza el componente del feature */}
         <LoginForm />
       </main>
     );
   }