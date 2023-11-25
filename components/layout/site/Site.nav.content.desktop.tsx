import { BsFillCarFrontFill } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";
import SiteNavLinkDesktop from "./Site.nav.link.desktop";
import logo from "@/assets/logo-parrot.png";

const navItems = [
  { url: "/", text: "Accueil" },
  { url: "/services", text: "Nos services" },
  { url: "/reviews", text: "Témoignages" },
  { url: "/gallery", text: "Galerie photos" },
  { url: "/contact", text: "Nous contacter" },
];

export default function SiteNavContentDesktop({ pathName }: { pathName: string }) {
  return (
    <div className="flex items-center w-full h-20 overflow-hidden">
      <div className=" hidden lg:w-[190px] bg-white h-full lg:flex items-center pl-10 -skew-x-12 -translate-x-3">
        <Link href="/" className="relative">
          <Image
            src={logo}
            height={164}
            width={384}
            alt="logo garage V. Parrot"
            loading="lazy"
            className="h-[60px] w-auto object-contain pr-6"
          />
        </Link>
      </div>
      {/* nav links */}
      <div className="flex items-center justify-end flex-1 h-full gap-2 pr-4 lg:pr-6 lg:mt-1">
        {navItems.map((item, index) => (
          <SiteNavLinkDesktop key={index} url={item.url} text={item.text} isCurrent={item.url === pathName} />
        ))}
        <Link
          href={"/cars"}
          className={`flex items-center text-xl space-x-3 px-4 py-3 bg-red-900 border-2 border-red-900 rounded-md ml-3 hover:border-neutral-100 text-neutral-100 transition-all duration-300 ease-in-out`}
        >
          <BsFillCarFrontFill />
          <span className="text-sm lg:text-base xl:text-xl font-title">{"Nos occasions"}</span>
        </Link>
      </div>
    </div>
  );
}
