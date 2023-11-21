import { Dispatch, SetStateAction } from "react";

import { IconType } from "react-icons";
import Link from "next/link";

type DashboardNavLinkProps = {
  url: string;
  text: string;
  isCurrent: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>> | null | undefined;
};

export default function SiteNavLinkDesktop({
  url,
  text,
  isCurrent,
  setIsOpen,
}: DashboardNavLinkProps) {
  function handleMenu() {
    if (!setIsOpen || setIsOpen === undefined) return;
    setIsOpen(false);
  }

  return (
    <Link
      onClick={handleMenu}
      href={url}
      className={`group flex items-start flex-col text-xl pt-2 pb-1 mx-1 ${
        isCurrent
          ? " text-white border-white"
          : "bg-red-800 hover:border-neutral-100"
      } duration-300 transition-all ease-in-out`}
    >
      <span className="text-sm lg:text-base font-title">{text}</span>
      <div
        className={`bg-white h-[2px] lg:h-1 -skew-x-[24deg] mt-1 ${
          isCurrent ? "w-full" : "w-0 group-hover:w-full"
        } transition-all duration-500`}
      />
    </Link>
  );
}
