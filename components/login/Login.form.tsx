"use client";

import { verifyEmail } from "@/utils/regex";
import { ChangeEvent, FormEvent, useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { BsFillPersonFill, BsFillKeyFill } from "react-icons/bs";
import { signIn } from "next-auth/react";

type FormProps = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const [form, setForm] = useState<FormProps>({
    email: "",
    password: "",
  });
  const [infos, setInfos] = useState<{ email: boolean; password: boolean }>({
    email: false,
    password: false,
  });
  const [errors, setErrors] = useState({ email: "", password: "" });

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setErrors({ email: "", password: "" });
    setForm({ ...form, [e.currentTarget.name]: e.currentTarget.value });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(verifyEmail(form.email));
    if (!verifyEmail(form.email)) {
      setErrors({
        ...errors,
        email:
          "Cette valeur ne correspond pas à un mail (type : email@example.com)",
      });
    }

    signIn("credentials", {
      email: form.email,
      password: form.password,
      callbackUrl: "http://localhost:3000/dashboard",
    });
  }

  return (
    <form className="w-3/4 mx-auto mb-2 font-text" onSubmit={handleSubmit}>
      {/* email input */}
      <div className="mb-10">
        <div className="flex items-center mb-2">
          <label
            htmlFor="email"
            className="flex-1 text-start text-2xl font-semibold "
          >
            Votre identifiant
          </label>
          <AiOutlineInfoCircle
            className="text-gray-800 text-2xl cursor-pointer"
            onMouseEnter={() =>
              setInfos({
                ...infos,
                email: true,
              })
            }
            onMouseLeave={() =>
              setInfos({
                ...infos,
                email: false,
              })
            }
          />
        </div>
        <div
          className={`flex items-center space-x-2 border-2 rounded-md ${
            errors.email !== ""
              ? "border-red-500 bg-red-200"
              : "border-neutral-300 bg-neutral-200"
          }`}
        >
          <BsFillPersonFill className="text-4xl ml-2" />
          <input
            required
            onChange={handleChange}
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            className="w-full bg-neutral-200 text-xl outline-none placeholder-neutral-500 py-2 px-2"
          />
        </div>
        {errors.email !== "" && (
          <p className="text-red-600 text-start w-full">{errors.email}</p>
        )}
        {infos.email && (
          <p className="text-start w-full">
            {"Votre mail doit contenir un '.' et un '@'"}
          </p>
        )}
      </div>
      {/* password input */}
      <div className="mb-10">
        <div className="flex items-center mb-2">
          <label
            htmlFor="password"
            className="flex-1 text-start text-2xl font-semibold "
          >
            Votre mot de passe
          </label>
          <AiOutlineInfoCircle
            className="text-gray-800 text-2xl cursor-pointer"
            onMouseEnter={() => setInfos({ ...infos, password: true })}
            onMouseLeave={() => setInfos({ ...infos, password: false })}
          />
        </div>
        <div
          className={`flex items-center space-x-2 border-2 rounded-md ${
            errors.password !== ""
              ? "border-red-500 bg-red-100"
              : "border-neutral-300 bg-neutral-200"
          }`}
        >
          <BsFillKeyFill className="text-4xl ml-2" />
          <input
            required
            value={form.password}
            onChange={handleChange}
            type="password"
            name="password"
            id="password"
            placeholder="Mot de passe"
            className={`w-full bg-neutral-200 text-xl outline-none placeholder-neutral-500 py-2 px-2`}
          />
        </div>
        {infos.password && (
          <p className="text-start w-full">
            {"Votre mot de passe doit contenir au moins 8 caractères"}
          </p>
        )}
      </div>

      {/* submit button */}
      <button
        className="text-white bg-red-700 text-2xl font-semibold w-full rounded-md py-4 hover:bg-red-800 disabled:bg-neutral-200"
        disabled={form.email === "" || form.password === ""}
      >
        Se connecter
      </button>
    </form>
  );
}
