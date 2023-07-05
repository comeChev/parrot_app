import React, { Dispatch, SetStateAction } from "react";
import { BsFillCarFrontFill } from "react-icons/bs";
import { Session } from "next-auth";
import Link from "next/link";
import DashboardNavLogoutButton from "./Site.nav.logout.button";
import SiteNavLink from "./Site.nav.link";
import SiteNavContentHours from "./Site.nav.content.hours";

const navItems = [
  { url: "/", text: "Accueil" },
  { url: "/services", text: "Nos services" },
  { url: "/reviews", text: "Témoignages" },
  { url: "/pictures", text: "Galerie photos" },
  { url: "/contact", text: "Nous contacter" },
  { url: "/cars", text: "Nos occasions", Icon: BsFillCarFrontFill },
];

type SiteNavContentProps = {
  session: Session | null;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export default function SiteNavContent({
  session,
  setIsOpen,
}: SiteNavContentProps) {
  return (
    <div className="flex flex-col w-full">
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
      <div className="mt-10 flex-1">
        {navItems.map((item) => (
          <SiteNavLink
            url={item.url}
            text={item.text}
            Icon={item.Icon ? item.Icon : null}
            isCurrent={item.url === "/cars"}
            setIsOpen={setIsOpen}
          />
        ))}
      </div>

      {/* opening hours */}
      <SiteNavContentHours />
      {/* logout button */}
      <DashboardNavLogoutButton />
    </div>
  );
}
