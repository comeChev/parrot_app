import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { IconType } from "react-icons";

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
      className={`w-full flex items-center text-xl space-x-3 px-3 py-3 ${
        isCurrent ? "bg-red-50 text-red-800" : "bg-red-800 hover:bg-neutral-800"
      } duration-150 transition-all ease-in-out`}
    >
      {Icon && <Icon />}
      <span>{text}</span>
    </Link>
  );
}
