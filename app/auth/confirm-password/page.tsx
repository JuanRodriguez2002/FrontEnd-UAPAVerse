import { ConfirmPasswordForm } from "@/features/auth/components/ConfirmPasswordForm";

   export default function ConfirmPasswordPage() {
     return (
       <main className="flex min-h-screen items-center justify-center bg-gray-50">
         {/* La ruta solo renderiza el componente del feature */}
         <ConfirmPasswordForm />
       </main>
     );
   }