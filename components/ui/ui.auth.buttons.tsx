"use client";

import { signIn, signOut } from "next-auth/react";
import Link from "next/link";

export const LoginButton = () => {
  return (
    <button
      className="px-4 py-2 bg-sky-600 text-white rounded-md"
      onClick={() => signIn()}
    >
      Se connecter
    </button>
  );
};

export const RegisterButton = () => {
  return (
    <Link
      type="button"
      href="/register"
      className="px-4 py-2 bg-green-600 text-white rounded-md"
    >
      Inscription
    </Link>
  );
};

export const LogoutButton = () => {
  return (
    <button
      className="px-4 py-2 bg-red-600 text-white rounded-md"
      onClick={() => signOut()}
    >
      Déconnexion
    </button>
  );
};
