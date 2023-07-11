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
    <div className="flex flex-col w-full justify-between ">
      <div className="flex flex-col min-h-[93vh] sm:h-[99vh] fixed w-full sm:w-60">
        {/* session name & link to profile page */}
        {session && (
          <div className="flex items-center md:flex-col md:items-start px-2 mt-10 ml-5">
            <div className="flex items-center w-full">
              <div className="mr-3">
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
                    className="bg-neutral-700 h-10 w-10 flex items-center justify-center rounded-full text-md text-neutral-100"
                  >
                    {session.user.name[0].toLocaleUpperCase()}
                    {session.user.lastName !== "" &&
                      session.user.lastName[0].toLocaleUpperCase()}
                  </Link>
                )}
              </div>
              <div className="group flex-1 flex w-full cursor-pointer">
                <div className="group-hover:flex hidden justify-end w-full">
                  <DashboardNavLogoutButton />
                </div>
                <h2 className="flex-1 text-lg md:text-base group-hover:hidden">
                  {`Bienvenue, ${session.user.name}`}
                </h2>
              </div>
            </div>
          </div>
        )}

        {/* nav links */}
        <div className="mt-10 flex-1">
          {navItems.map((item, index) => (
            <DashboardNavLink
              key={index}
              url={item.url}
              text={item.text}
              Icon={item.Icon}
              isCurrent={item.url === "/dashboard/cars"}
              setIsOpen={setIsOpen}
            />
          ))}
        </div>
        <DashboardNavLogoutButton />
      </div>
    </div>
  );
}
