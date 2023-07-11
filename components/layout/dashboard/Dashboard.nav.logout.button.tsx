"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { BsBoxArrowLeft } from "react-icons/bs";

export default function DashboardNavLogoutButton() {
  const router = useRouter();
  return (
    <button
      className="text-end px-4 py-2 flex items-center justify-end group w-full"
      onClick={async () => {
        const response = await signOut({ redirect: false });
        if (response) router.push("/login");
      }}
    >
      <BsBoxArrowLeft className="mr-4 text-4xl md:text-2xl" />
      <span className="text-xl">Déconnexion</span>
    </button>
  );
}
