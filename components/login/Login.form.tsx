"use client";

import { ChangeEvent, FormEvent, RefObject, useRef, useState } from "react";

import { BsFillPersonFill } from "react-icons/bs";
import FormInput from "../ui/form/Form.input";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { verifyEmail } from "@/utils/regex";

type FormProps = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const [form, setForm] = useState<FormProps>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setErrors({ email: "", password: "" });
    setForm({ ...form, [e.currentTarget.name]: e.currentTarget.value });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!verifyEmail(form.email)) {
      setErrors({
        ...errors,
        email:
          "Cette valeur ne correspond pas à un mail (type : email@example.com)",
      });
    }
    setIsLoading(true);
    const result = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });

    if (result && (!result.ok || result.error)) {
      setIsLoading(false);
      toast.error("Erreur lors de la connexion, veuillez réessayer.");
    } else {
      setTimeout(() => {
        router.push("/dashboard");
        setIsLoading(false);
        toast.success("Vous êtes connecté !");
      }, 1000);
    }
  }

  return (
    <form
      className="w-3/4 mx-auto mb-2 font-text relative"
      onSubmit={handleSubmit}
    >
      {/* email input */}
      <div className="text-start">
        <FormInput
          labelClasses="text-2xl"
          handleFocus={() => {}}
          label="Votre identifiant"
          type="email"
          required
          name="email"
          error={errors.email}
          value={form.email}
          handleChange={handleChange}
          autocomplete="email"
          placeholder="Email"
          disabled={isLoading}
          info="Votre mail doit contenir un '.' et un '@'"
        />
        <FormInput
          labelClasses="text-2xl"
          handleFocus={() => {}}
          label="Votre mot de passe"
          type="password"
          isPassword
          required
          name="password"
          error={errors.password}
          value={form.password}
          handleChange={handleChange}
          autocomplete="current-password"
          placeholder="Mot de passe"
          disabled={isLoading}
          info="Votre mot de passe doit contenir au moins 8 caractères"
        />
      </div>

      {/* submit button */}
      <button
        className="text-white bg-red-700 text-2xl font-semibold w-full rounded-md py-4 hover:bg-red-800 disabled:opacity-50 disabled:cursor-not-allowed mt-10"
        disabled={form.email === "" || form.password === "" || isLoading}
      >
        Se connecter
      </button>

      {/* waiting screen */}
      {isLoading && (
        <div className="absolute top-0 left-0 w-full h-full bg-neutral bg-opacity-70 flex items-center justify-center">
          <div className="w-full h-full bg-white/75 rounded-md flex items-center justify-center">
            <BsFillPersonFill className="text-6xl text-neutral-700 animate-wait" />
          </div>
        </div>
      )}
    </form>
  );
}
