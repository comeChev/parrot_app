"use client";

import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

import { Hour } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { Session } from "next-auth";
import SiteNavContent from "./Site.nav.content";
import SiteNavContentDesktop from "./Site.nav.content.desktop";
import logo from "@/assets/logo-parrot.png";
import { usePathname } from "next/navigation";
import { useState } from "react";

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
    <header className="container mx-auto text-neutral-100 text-title relative">
      {/* mobile */}
      <div className="bg-red-800 w-full md:hidden">
        <div className="w-full flex justify-between items-center h-[80px] overflow-hidden">
          <div className="h-full bg-white items-center flex px-5 -skew-x-12 -translate-x-3 ">
            <Link href="/" aria-label="Retour à l'accueil">
              <Image
                src={logo}
                height={81}
                width={190.5}
                alt="logo garage V. Parrot"
                className="w-auto object-cover h-[50px] pl-2"
              />
            </Link>
          </div>
          <button
            aria-label="ouvrir le menu"
            type="button"
            className="text-4xl cursor-pointer mr-4"
            onClick={() => setIsOpen(true)}
          >
            <AiOutlineMenu />
          </button>
        </div>

        <div
          className={`h-screen overflow-y-scroll fixed top-0 -left-[calc(100vw+10rem)] transition-transform duration-200 bg-red-800 z-50 
          ${isOpen && "translate-x-[calc(100vw+10rem)]"}`}
        >
          <SiteNavContent
            session={session}
            setIsOpen={setIsOpen}
            hours={hours}
            pathname={pathname}
          />
        </div>
      </div>

      {/* desktop */}
      <div className="bg-red-800 hidden md:flex flex-row w-full h-full">
        <SiteNavContentDesktop pathName={pathname} />
      </div>
    </header>
  );
}
