"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SiteNavLogoutButton() {
  const router = useRouter();
  return (
    <button
      className="text-start px-4 py-2 mt-16"
      onClick={async () => {
        const response = await signOut({ redirect: false });
        if (response) router.push("/login");
      }}
    >
      Se déconnecter
    </button>
  );
}
