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

export default function SiteNav({ session, hours }: { session: Session | null; hours: Hour[] }) {
  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname();

  return (
    <header className="container relative mx-auto text-neutral-100 text-title">
      {/* mobile */}
      <div className="w-full bg-red-800 md:hidden">
        <div className="w-full flex justify-between items-center h-[80px] overflow-hidden">
          <div className="flex items-center h-full px-5 -translate-x-3 -skew-x-12 bg-white ">
            <Link href="/" aria-label="Retour à l'accueil">
              <Image
                src={logo}
                height={164}
                width={384}
                alt="logo garage V. Parrot"
                className="w-auto object-cover h-[50px] pl-2"
                loading="lazy"
              />
            </Link>
          </div>
          <button
            aria-label="ouvrir le menu"
            type="button"
            className="mr-4 text-4xl cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            <AiOutlineMenu />
          </button>
        </div>

        <div
          className={`h-screen overflow-y-scroll fixed top-0 -left-[calc(100vw+10rem)] transition-transform duration-500 bg-red-800 z-50 
          ${isOpen && "translate-x-[calc(100vw+10rem)]"}`}
        >
          <SiteNavContent session={session} setIsOpen={setIsOpen} hours={hours} pathname={pathname} />
        </div>
      </div>

      {/* desktop */}
      <div className="flex-row hidden w-full h-full bg-red-800 md:flex">
        <SiteNavContentDesktop pathName={pathname} />
      </div>
    </header>
  );
}
