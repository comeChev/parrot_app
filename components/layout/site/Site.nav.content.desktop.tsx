import { BsFillCarFrontFill } from "react-icons/bs";
import Image from "next/image";
import logo from "@/assets/logo-parrot.png";
import SiteNavLinkDesktop from "./Site.nav.link.desktop";
import Link from "next/link";

const navItems = [
  { url: "/", text: "Accueil" },
  { url: "/#services", text: "Nos services" },
  { url: "/reviews", text: "Témoignages" },
  { url: "/gallery", text: "Galerie photos" },
  { url: "/contact", text: "Nous contacter" },
];

export default function SiteNavContentDesktop() {
  return (
    <div className="flex w-full h-20 items-center">
      <div className=" hidden lg:w-[280px] bg-white h-full lg:flex items-center pl-10">
        <Image src={logo} alt="logo Parrot" className="h-20 w-auto" />
      </div>
      {/* nav links */}
      <div className="flex-1 flex items-center justify-end pr-4 lg:pr-6 lg:mt-1 h-full">
        {navItems.map((item, index) => (
          <SiteNavLinkDesktop
            key={index}
            url={item.url}
            text={item.text}
            isCurrent={item.url === "/cars"}
          />
        ))}
        <Link
          type="button"
          href={"/cars"}
          className={`flex items-center text-xl space-x-3 px-4 py-3 bg-red-900 rounded-md ml-3`}
        >
          <BsFillCarFrontFill />
          <span className="text-sm lg:text-base xl:text-xl">
            {"Nos occasions"}
          </span>
        </Link>
      </div>
    </div>
  );
}
