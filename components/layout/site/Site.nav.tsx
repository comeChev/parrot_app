"use client";

import { useState } from "react";
import Image from "next/image";
import { Session } from "next-auth";
import { Hour } from "@prisma/client";

import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import logo from "@/assets/logo-parrot.png";

import SiteNavContent from "./Site.nav.content";
import SiteNavContentDesktop from "./Site.nav.content.desktop";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SiteNav({
  session,
  hours,
}: {
  session: Session | null;
  hours: Hour[];
}) {
  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname();

  return (
    <header className="w-full text-neutral-100 text-title">
      {/* mobile */}
      <div className="bg-red-800 w-full md:hidden">
        {isOpen ? (
          <div className="w-full flex justify-end items-center h-[80px]">
            <AiOutlineClose
              aria-label="fermer le menu"
              type="button"
              className="text-4xl cursor-pointer mr-4 "
              onClick={() => setIsOpen(false)}
            />
          </div>
        ) : (
          <div className="w-full flex justify-between items-center h-[80px]">
            <Link href="/" aria-label="Retour à l'accueil">
              <Image
                src={logo}
                alt="logo garage V. Parrot"
                className="w-[190px] object-cover h-[80px]"
              />
            </Link>
            <AiOutlineMenu
              aria-label="ouvrir le menu"
              type="button"
              className="text-4xl cursor-pointer mr-4"
              onClick={() => setIsOpen(true)}
            />
          </div>
        )}{" "}
        {isOpen && (
          <div className="min-h-screen">
            <SiteNavContent
              session={session}
              setIsOpen={setIsOpen}
              hours={hours}
              pathname={pathname}
            />
          </div>
        )}
      </div>

      {/* desktop */}
      <div className="bg-red-800 hidden md:flex flex-row w-full h-full">
        <SiteNavContentDesktop pathName={pathname} />
      </div>
    </header>
  );
}
