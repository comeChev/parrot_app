"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { BsBoxArrowLeft } from "react-icons/bs";

export default function DashboardNavLogoutButton() {
  const router = useRouter();
  return (
    <button
      className="text-end py-2 flex items-center justify-end group flex-1"
      onClick={async () => {
        const response = await signOut({ redirect: false });
        if (response) window.location.reload();
      }}
    >
      <BsBoxArrowLeft className="mr-4 text-xl" />
      <span className="text-md">Déconnexion</span>
    </button>
  );
}
