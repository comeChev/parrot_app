import React, { Dispatch, SetStateAction } from "react";
import {
  BsCalendarDate,
  BsEnvelopeAtFill,
  BsFillBoxSeamFill,
  BsFillCarFrontFill,
  BsFillPersonFill,
  BsFillStarFill,
  BsHouseExclamation,
  BsImages,
  BsPatchPlusFill,
  BsTagsFill,
} from "react-icons/bs";
import DashboardNavLink from "./Dashboard.nav.link";
import { Session } from "next-auth";
import Link from "next/link";
import DashboardNavLogoutButton from "./Dashboard.nav.logout.button";
import Image from "next/image";

const navItems = [
  {
    url: "/dashboard/cars",
    text: "Voitures",
    Icon: BsFillCarFrontFill,
    access: "ALL",
  },
  {
    url: "/dashboard/strengths",
    text: "Points forts",
    Icon: BsPatchPlusFill,
    access: "ALL",
  },
  {
    url: "/dashboard/services",
    text: "Prestations",
    Icon: BsFillBoxSeamFill,
    access: "ADMIN",
  },
  {
    url: "/dashboard/categories",
    text: "Catégories",
    Icon: BsTagsFill,
    access: "ADMIN",
  },
  {
    url: "/dashboard/reviews",
    text: "Commentaires",
    Icon: BsFillStarFill,
    access: "ALL",
  },
  {
    url: "/dashboard/messages",
    text: "Messages",
    Icon: BsEnvelopeAtFill,
    access: "ALL",
  },
  {
    url: "/dashboard/hours",
    text: "Horaires",
    Icon: BsCalendarDate,
    access: "ADMIN",
  },
  {
    url: "/dashboard/users",
    text: "Utilisateurs",
    Icon: BsFillPersonFill,
    access: "ADMIN",
  },
  {
    url: "/dashboard/pictures",
    text: "Galerie photos",
    Icon: BsImages,
    access: "ADMIN",
  },
];

type DashboardNavMobileProps = {
  session: Session | null;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  pathname: string;
  isAdmin: boolean;
};

export default function DashboardNavContent({
  session,
  setIsOpen,
  pathname,
  isAdmin,
}: DashboardNavMobileProps) {
  return (
    <div className="flex flex-col w-full justify-between ">
      <div className="flex flex-col min-h-[85vh] sm:h-[99vh] fixed w-full md:w-60">
        {/* session name & link to profile page */}
        {session && (
          <div className="flex items-center md:flex-col md:items-start mt-2 md:mt-10 ml-5">
            <div className="w-full">
              <div className="flex items-center w-full">
                {/* user pictures */}
                <div className="mr-3">
                  {session.user.picture ? (
                    <Link href="/dashboard/me">
                      <Image
                        className="h-10 w-10 rounded-full object-cover"
                        src={session.user.picture}
                        alt={`image de profil de ${session.user.name}`}
                        width={40}
                        height={40}
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
                {/* logout button */}
                <div className="group flex-1 flex w-full">
                  <h2 className="flex-1 text-lg md:text-base">
                    {`Bienvenue, ${session.user.name}`}
                  </h2>
                </div>
              </div>
              <div className="flex flex-row pl-2 pr-3 mt-4 w-full md:hidden ">
                <Link href={"/"} className="flex items-center">
                  <BsHouseExclamation className="text-xl mr-4" />
                  Retour au site
                </Link>
                <DashboardNavLogoutButton />
              </div>
            </div>
          </div>
        )}

        {/* nav links */}
        <div className="mt-5 lg:mt-10 flex-1 overflow-y-scroll">
          {navItems.map((item, index) =>
            item.access === "ALL" ? (
              <DashboardNavLink
                key={index}
                url={item.url}
                text={item.text}
                Icon={item.Icon}
                isCurrent={item.url === pathname}
                setIsOpen={setIsOpen}
              />
            ) : (
              item.access === "ADMIN" &&
              isAdmin && (
                <DashboardNavLink
                  key={index}
                  url={item.url}
                  text={item.text}
                  Icon={item.Icon}
                  isCurrent={item.url === pathname}
                  setIsOpen={setIsOpen}
                />
              )
            )
          )}
        </div>
        <div className="hidden md:flex flex-row sm:flex-col justify-between items-center px-4 text-end mb-6 sm:mb-0">
          <Link href={"/"} className="flex items-center">
            <BsHouseExclamation className="text-xl mr-4" />
            Retour au site
          </Link>
          <DashboardNavLogoutButton />
        </div>
      </div>
    </div>
  );
}
