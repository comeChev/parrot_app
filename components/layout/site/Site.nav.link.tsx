import { Dispatch, SetStateAction } from "react";

import { IconType } from "react-icons";
import Link from "next/link";

type DashboardNavLinkProps = {
  url: string;
  text: string;
  Icon: IconType | null;
  isCurrent: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>> | null | undefined;
};

export default function SiteNavLink({
  url,
  text,
  Icon,
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
      className={`w-full flex items-center text-xl space-x-3 px-3 py-3  ${
        isCurrent
          ? "bg-gray-50 text-red-800 font-bold font-title "
          : "bg-red-800 hover:bg-red-950 font-[400] font-title"
      } duration-150 transition-all ease-in-out`}
    >
      {Icon && <Icon />}
      <span>{text}</span>
    </Link>
  );
}
