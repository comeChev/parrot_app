import LoginForm from "@/components/login/Login.form";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo-parrot.png";
import { verifySession } from "@/utils/nextAuth/nextAuth.protections";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const hasSession = await verifySession();
  //redirect if already has a session
  hasSession && redirect("/dashboard");

  return (
    <div className="container mx-auto my-auto text-center flex flex-col min-h-screen justify-between py-10 mb-24">
      <Image
        priority
        src={logo}
        alt="logo garage V. Parrot"
        className="w-3/4 max-w-[700px] mx-auto mb-10 mt-6 select-none"
      />
      <div className="mb-10 select-none">
        <h1 className="text-4xl font-extrabold font-title">Connexion</h1>
        <h2 className="text-xl font-text">Connectez-vous à votre compte</h2>
      </div>

      <LoginForm />

      <Link
        href="/"
        className="text-neutral-600 bg-neutral-100 text-2xl font-medium w-3/4 rounded-md py-4 mx-auto mt-10 border border-neutral-400 hover:border-slate-600"
      >
        Retourner au site
      </Link>
    </div>
  );
}
