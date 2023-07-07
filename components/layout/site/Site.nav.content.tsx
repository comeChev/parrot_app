import { Dispatch, SetStateAction } from "react";
import { Session } from "next-auth";
import Link from "next/link";
import { Hour } from "@prisma/client";

import { BsFillCarFrontFill } from "react-icons/bs";

import SiteNavLink from "./Site.nav.link";
import SiteNavContentHours from "./Site.nav.content.hours";
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
};

export default function SiteNavContent({
  session,
  setIsOpen,
  hours,
}: SiteNavContentProps) {
  return (
    <div className="flex flex-col w-full justify-between select-none">
      <div className="flex flex-col items-stretch min-h-[90vh]">
        <div className="flex-1 flex flex-col">
          {/* session name & link to profile page */}
          {session && (
            <div className="flex items-center px-2 mt-10">
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
          )}

          {/* nav links */}
          <div className="my-10">
            {navItems.map((item, index) => (
              <SiteNavLink
                key={index}
                url={item.url}
                text={item.text}
                Icon={item.Icon ? item.Icon : null}
                isCurrent={item.url === "/cars"}
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
          <Link href="/login" className="px-4 font-light text-red-300">
            Espace administrateur
          </Link>
        )}
      </div>
    </div>
  );
}
