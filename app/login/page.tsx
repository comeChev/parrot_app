import Image from "next/image";
import Link from "next/link";
import LoginForm from "@/components/login/Login.form";
import TextMain from "@/components/dashboard/ui/text.main";
import logo from "@/assets/logo-parrot.png";
import { redirect } from "next/navigation";
import { verifySession } from "@/utils/nextAuth/nextAuth.protections";

export default async function LoginPage() {
  const hasSession = await verifySession();
  //redirect if already has a session
  hasSession && redirect("/dashboard");

  return (
    <div className="container mx-auto my-auto text-center flex flex-col h-screen justify-between py-10">
      <Image
        priority
        src={logo}
        alt="logo garage V. Parrot"
        className="w-3/4 max-w-[700px] mx-auto mb-10 mt-6 select-none"
      />
      <div className="mb-10 select-none">
        <TextMain text="Connexion" />
        <h2 className="text-xl">Connectez-vous à votre compte</h2>
      </div>

      <LoginForm />

      <Link
        href="/"
        className="text-gray-800 font-medium w-3/4 rounded-md mx-auto mb-12 transition-all duration-500 underline  underline-offset-4"
      >
        Retourner au site
      </Link>
    </div>
  );
}
