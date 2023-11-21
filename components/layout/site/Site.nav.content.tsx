import { BsFillCarFrontFill, BsGearFill } from "react-icons/bs";
import { Dispatch, SetStateAction } from "react";

import { AiOutlineClose } from "react-icons/ai";
import { Hour } from "@prisma/client";
import Link from "next/link";
import { Session } from "next-auth";
import SiteNavContentHours from "./Site.nav.content.hours";
import SiteNavLink from "./Site.nav.link";
import SiteNavLogoutButton from "./Site.nav.logout.button";

const navItems = [
  { url: "/", text: "Accueil" },
  { url: "/#services", text: "Nos services" },
  { url: "/reviews", text: "Témoignages" },
  { url: "/gallery", text: "Galerie photos" },
  { url: "/contact", text: "Nous contacter" },
  { url: "/cars", text: "Nos occasions", Icon: BsFillCarFrontFill },
];

type SiteNavContentProps = {
  session: Session | null;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  hours: Hour[];
  pathname: string;
};

export default function SiteNavContent({
  session,
  setIsOpen,
  hours,
  pathname,
}: SiteNavContentProps) {
  return (
    <div className="flex flex-col w-[100vw] justify-between select-none relative overflow-y-scroll">
      <button
        aria-label="fermer le menu"
        type="button"
        className="text-4xl cursor-pointer z-[60] top-[1.33rem] right-[1rem] absolute"
        onClick={() => setIsOpen(false)}
      >
        <AiOutlineClose />
      </button>
      <div className="flex flex-col items-stretch min-h-[90vh] pb-24 py-10">
        <div className="flex-1 flex flex-col">
          {/* session name & link to profile page */}
          {session && (
            <div>
              <div className="flex items-center px-4 mt-10">
                <h2 className="flex-1 text-md">{`Bienvenue, ${session.user.name}`}</h2>
                {session.user.picture ? (
                  <Link href="/dashboard/me">
                    <img
                      className="h-10 w-10 rounded-full object-cover"
                      src={session.user.picture}
                      alt={`image de profil de ${session.user.name}`}
                    />
                  </Link>
                ) : (
                  <Link
                    href="/dashboard/me"
                    className="bg-neutral-700 h-10 w-10 flex items-center justify-center rounded-full font-text"
                  >
                    {session.user.name[0].toLocaleUpperCase()}
                    {session.user.lastName !== "" &&
                      session.user.lastName[0].toLocaleUpperCase()}
                  </Link>
                )}
              </div>
              <Link href={"/dashboard"} className="px-4">
                Administration du site
              </Link>
            </div>
          )}

          {/* nav links */}
          <div className="my-10">
            {navItems.map((item, index) => (
              <SiteNavLink
                key={index}
                url={item.url}
                text={item.text}
                Icon={item.Icon ? item.Icon : null}
                isCurrent={item.url === pathname}
                setIsOpen={setIsOpen}
              />
            ))}
          </div>

          {/* opening hours */}
          <SiteNavContentHours hours={hours} />
        </div>

        {/* logout button */}
        {session ? (
          <SiteNavLogoutButton />
        ) : (
          <Link
            href="/login"
            className="px-4 font-light font-title flex hover:underline underline-offset-2"
          >
            <BsGearFill className="text-2xl mr-2" />
            <span>Espace administrateur</span>
          </Link>
        )}
      </div>
    </div>
  );
}
