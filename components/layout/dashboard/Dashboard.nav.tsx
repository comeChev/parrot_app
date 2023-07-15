"use client";

import { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import DashboardNavContent from "./Dashboard.nav.content";
import { Session } from "next-auth";
import { usePathname } from "next/navigation";

type DashboardNavProps = {
  session: Session;
};

export default function DashboardNav({ session }: DashboardNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="w-full sm:w-60 text-neutral-100 text-title select-none min-h-screen">
      {/* mobile */}
      <div className="bg-red-800 w-full sm:hidden z-50 fixed">
        <div className="w-full flex justify-end py-4 px-3">
          {isOpen ? (
            <AiOutlineClose
              aria-label="fermer le menu"
              type="button"
              className="text-4xl cursor-pointer "
              onClick={() => setIsOpen(false)}
            />
          ) : (
            <AiOutlineMenu
              aria-label="ouvrir le menu"
              type="button"
              className="text-4xl cursor-pointer"
              onClick={() => setIsOpen(true)}
            />
          )}
        </div>
        {isOpen && (
          <div className="min-h-screen">
            <DashboardNavContent
              isAdmin={session.user.role === "ADMIN"}
              session={session}
              setIsOpen={setIsOpen}
              pathname={pathname}
            />
          </div>
        )}
      </div>
      {/* desktop */}
      <div className="bg-red-800 hidden sm:flex w-60 h-full">
        <DashboardNavContent
          isAdmin={session.user.role === "ADMIN"}
          session={session}
          setIsOpen={setIsOpen}
          pathname={pathname}
        />
      </div>
    </nav>
  );
}
