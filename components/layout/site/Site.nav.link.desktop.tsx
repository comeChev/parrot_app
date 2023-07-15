import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { IconType } from "react-icons";

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
      className={`border-b-2 lg:border-b-4 border-0 border-transparent flex items-center text-xl space-x-3 px-3 pt-2 pb-1 ${
        isCurrent
          ? " text-white border-white"
          : "bg-red-800 hover:border-neutral-100"
      } duration-300 transition-all ease-in-out`}
    >
      <span className="text-sm lg:text-base xl:text-xl">{text}</span>
    </Link>
  );
}
