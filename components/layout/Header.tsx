"use client";

import { useSession } from "next-auth/react";
import {
  LoginButton,
  LogoutButton,
  RegisterButton,
} from "../ui/ui.auth.buttons";

export default function Header() {
  const { data: session } = useSession();

  return (
    <div className="w-full bg-red-200 flex py-4 px-2">
      <div className="flex-1">Garage V. Parrot</div>
      <div className="flex space-x-2">
        {session ? (
          <>
            <h3 className="flex-1">Bonjour {session.user?.name}</h3>
            <LogoutButton />
          </>
        ) : (
          <>
            <RegisterButton />
            <LoginButton />
          </>
        )}
      </div>
    </div>
  );
}
