import {
  BsCaretDownFill,
  BsFacebook,
  BsFillTelephoneFill,
  BsInstagram,
  BsTwitter,
} from "react-icons/bs";
import { Category, Hour } from "@prisma/client";

import Link from "next/link";
import { Session } from "next-auth";
import SiteFooterHours from "./Site.footer.hours";
import SiteFooterLinkList from "./Site.footer.link.list";

type SiteFooterProps = {
  hours: Hour[] | [];
  session: Session | null;
  categories: Category[];
};

const aboutLinks = [
  {
    url: "/",
    text: "Accueil",
  },
  {
    url: "/about",
    text: "Notre entreprise",
  },
  {
    url: "/reviews/#makeReview",
    text: "Laisser un avis",
    originalUrl: "/reviews",
  },
  {
    url: "/contact",
    text: "Nous contacter",
  },
  {
    url: "/legals",
    text: "Mentions légales",
  },
  {
    url: "/privacy",
    text: "Vos données personnelles",
  },
  {
    url: "/sitemap.xml",
    text: "Plan du site",
  },
];

export default function SiteFooter({
  hours,
  session,
  categories,
}: SiteFooterProps) {
  const services = categories.map((category: Category) => {
    const link = {
      url: `/services?name=${category.category_name_url}`,
      text: category.category_name,
    };
    return link;
  });
  const servicesLinks = [
    ...services,
    {
      url: "/cars",
      text: "Vente véhicules d'occasion",
    },
  ];

  return (
    <footer className="container mx-auto min-h-[100px] bg-neutral-700 text-neutral-200">
      {/* content */}
      <div className="flex mb-10 flex-wrap">
        <div className="flex-1 flex flex-wrap">
          {/* adresse */}
          <div className="mx-10 mt-10 flex flex-col">
            <p className="w-[200px] border-0 border-b-2 border-neutral-200 pb-2 mb-4 font-semibold font-title">
              GARAGE V. PARROT
            </p>
            <div className="text-sm font-light">
              <p>Zone artisanale du Moulin</p>
              <p>31000 TOULOUSE</p>
            </div>
            <a
              href="tel:+33987654321"
              className="flex items-center mt-4 space-x-2 bg-red-800 w-[170px] justify-center py-2 px-2 rounded-lg font-bold font-title hover:scale-105 transition duration-500"
            >
              <BsFillTelephoneFill />
              <span>09 87 65 43 21</span>
            </a>
          </div>

          {/* hours */}
          <SiteFooterHours hours={hours} />
          {/* about */}
          <SiteFooterLinkList title="A PROPOS" links={aboutLinks} />

          {/* services */}
          <SiteFooterLinkList title="NOS SERVICES" links={servicesLinks} />
        </div>

        {/* socials & admin link */}
        <div className="flex flex-col">
          {/* socials */}
          <div className="mx-10 mt-10 flex flex-col">
            <p className="w-[200px] border-0 border-b-2 border-neutral-200 pb-2 mb-4 font-semibold">
              SUIVEZ-NOUS
            </p>
            <div className="text-3xl font-light flex space-x-4">
              <a
                href="https://www.facebook.fr"
                target="_blank"
                aria-label="Allez sur notre page Facebook"
                className="hover:scale-105 transition duration-500"
              >
                <BsFacebook />
              </a>
              <a
                href="https://www.twitter.fr"
                target="_blank"
                aria-label="Allez sur notre page Twitter"
                className="hover:scale-105 transition duration-500"
              >
                <BsTwitter />
              </a>
              <a
                href="https://www.instagram.fr"
                target="_blank"
                aria-label="Aller sur notre page Instagram"
                className="hover:scale-105 transition duration-500"
              >
                <BsInstagram />
              </a>
            </div>
          </div>

          {/* admin link */}
          <div className="mx-10 mt-10 flex flex-col text-neutral-200 hover:underline hover:underline-offset-2">
            {session ? (
              <Link href="/dashboard">Dashboard</Link>
            ) : (
              <Link href="/login">Espace administrateur</Link>
            )}
          </div>
        </div>
      </div>

      {/* credits */}
      <div className="flex flex-col items-center text-xs text-neutral-300 pb-2">
        <p>Garage V.Parrot | &copy; 2023</p>
        <p>
          Site réalisé par{" "}
          <a
            className="underline underline-offset-2"
            href="https://vassco.fr"
            target="_blank"
          >
            vassco.fr
          </a>
        </p>
      </div>
    </footer>
  );
}
