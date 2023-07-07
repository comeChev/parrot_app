import React, { Dispatch, SetStateAction } from "react";
import {
  BsCalendarDate,
  BsFillBoxSeamFill,
  BsFillCarFrontFill,
  BsFillPersonFill,
  BsFillStarFill,
  BsImages,
} from "react-icons/bs";
import DashboardNavLink from "./Dashboard.nav.link";
import { Session } from "next-auth";
import Link from "next/link";
import DashboardNavLogoutButton from "./Dashboard.nav.logout.button";

const navItems = [
  { url: "/dashboard/cars", text: "Voitures", Icon: BsFillCarFrontFill },
  { url: "/dashboard/services", text: "Prestations", Icon: BsFillBoxSeamFill },
  { url: "/dashboard/reviews", text: "Commentaires", Icon: BsFillStarFill },
  { url: "/dashboard/hours", text: "Horaires", Icon: BsCalendarDate },
  { url: "/dashboard/users", text: "Utilisateurs", Icon: BsFillPersonFill },
  { url: "/dashboard/pictures", text: "Galerie photos", Icon: BsImages },
];

type DashboardNavMobileProps = {
  session: Session | null;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export default function DashboardNavContent({
  session,
  setIsOpen,
}: DashboardNavMobileProps) {
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col min-h-[93vh] md:h-[99vh] md:fixed md:w-60">
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
            <DashboardNavLink
              url={item.url}
              text={item.text}
              Icon={item.Icon}
              isCurrent={item.url === "/dashboard/cars"}
              setIsOpen={setIsOpen}
            />
          ))}
        </div>

        {/* logout button */}
        <DashboardNavLogoutButton />
      </div>
    </div>
  );
}
