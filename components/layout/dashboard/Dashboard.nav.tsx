"use client";

import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

import DashboardNavContent from "./Dashboard.nav.content";
import { Session } from "next-auth";
import { usePathname } from "next/navigation";
import { useState } from "react";

type DashboardNavProps = {
  session: Session;
};

export default function DashboardNav({ session }: DashboardNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="w-full md:w-60 text-neutral-100 text-title select-none md:min-h-screen">
      {/* mobile */}
      <div className="bg-red-800 w-full md:hidden z-50 fixed">
        <div className="w-full flex justify-end py-4 px-3">
          <AiOutlineMenu
            aria-label="ouvrir le menu"
            type="button"
            className="text-4xl cursor-pointer"
            onClick={() => setIsOpen(true)}
          />
        </div>

        <div
          className={`h-screen  fixed top-0 -left-[calc(100vw+10rem)] transition-transform duration-500 bg-red-800 z-50 
          ${isOpen && "translate-x-[calc(100vw+10rem)]"}`}
        >
          <DashboardNavContent
            isAdmin={session.user.role === "ADMIN"}
            session={session}
            setIsOpen={setIsOpen}
            pathname={pathname}
          />
        </div>
      </div>
      {/* desktop */}
      <div className="bg-red-800 hidden md:flex w-60 h-full">
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
