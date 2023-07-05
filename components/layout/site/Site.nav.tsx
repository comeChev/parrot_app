"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import SiteNavContent from "./Site.nav.content";
import SiteNavContentDesktop from "./Site.nav.content.desktop";

export default function SiteNav() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <nav className="w-full text-neutral-100 text-title">
      {/* mobile */}
      <div className="bg-red-700 w-full md:hidden">
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
            <SiteNavContent session={session} setIsOpen={setIsOpen} />
          </div>
        )}
      </div>

      {/* desktop */}
      <div className="bg-red-700 hidden md:flex flex-row w-full h-full">
        <SiteNavContentDesktop />
      </div>
    </nav>
  );
}
