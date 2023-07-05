"use client";

import { signOut } from "next-auth/react";

export default function DashboardNavLogoutButton() {
  return (
    <button
      className="text-start px-4 py-2 mt-16"
      onClick={() => signOut({ callbackUrl: "/" })}
    >
      Se déconnecter
    </button>
  );
}
