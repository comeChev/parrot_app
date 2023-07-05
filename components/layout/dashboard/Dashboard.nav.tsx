"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import DashboardNavContent from "./Dashboard.nav.content";

export default function DashboardNav() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <nav className="w-full sm:w-60 text-neutral-100 text-title">
      {/* mobile */}
      <div className="bg-red-800 w-full sm:hidden">
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
            <DashboardNavContent session={session} setIsOpen={setIsOpen} />
          </div>
        )}
      </div>
      {/* desktop */}
      <div className="bg-red-800 hidden sm:flex w-full h-full">
        <DashboardNavContent session={session} setIsOpen={setIsOpen} />
      </div>
    </nav>
  );
}
