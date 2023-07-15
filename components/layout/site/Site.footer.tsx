import { Category, Hour } from "@prisma/client";
import { Session } from "next-auth";
import Link from "next/link";
import {
  BsFillTelephoneFill,
  BsFacebook,
  BsTwitter,
  BsInstagram,
} from "react-icons/bs";
import SiteFooterLinkList from "./Site.footer.link.list";

type SiteFooterProps = {
  hours: Hour[] | [];
  session: Session | null;
  categories: Category[];
};

function showTime(date: Date) {
  return date.toLocaleTimeString("fr_FR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

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
    <footer className=" min-h-[100px] bg-neutral-700 text-neutral-200">
      {/* content */}
      <div className="flex mb-10 flex-wrap">
        <div className="flex-1 flex flex-wrap">
          {/* adresse */}
          <div className="mx-10 mt-10 flex flex-col">
            <p className="w-[200px] border-0 border-b-2 border-neutral-200 pb-2 mb-4 font-semibold">
              GARAGE V. PARROT
            </p>
            <div className="text-sm font-light">
              <p>Zone artisanale du Moulin</p>
              <p>39190 ST CLAUDE</p>
            </div>
            <a
              type="button"
              href="tel:+33987654321"
              className="flex items-center mt-4 space-x-2 bg-red-800 w-[170px] justify-center py-2 px-2 rounded-lg font-bold"
            >
              <BsFillTelephoneFill />
              <span>09 87 65 43 21</span>
            </a>
          </div>

          {/* hours */}
          <div className="mx-10 mt-10 flex flex-col">
            <p className="w-[200px] border-0 border-b-2 border-neutral-200 pb-2 mb-4 font-semibold">
              HEURES D'OUVERTURE
            </p>
            <div className="text-sm font-light flex flex-col space-y-2">
              {hours.map((hour) => (
                <div className="flex space-x-2 items-center border-b border-neutral-500 py-2 ">
                  <div className="w-[100px]">{hour.hour_day}</div>
                  {hour.hour_morning_status === false &&
                  hour.hour_afternoon_status === false ? (
                    <p>Fermé toute la journée</p>
                  ) : (
                    <div className="flex flex-col">
                      <p>
                        {hour.hour_morning_status === true
                          ? `de ${hour.hour_morning_opening} à ${hour.hour_morning_closing}`
                          : "Fermé le matin"}
                      </p>
                      <p>
                        {hour.hour_afternoon_status === true
                          ? `de ${hour.hour_afternoon_opening} à ${hour.hour_afternoon_closing}`
                          : "Fermé l'après-midi"}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
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
              <a href="https://www.facebook.fr" target="_blank">
                <BsFacebook />
              </a>
              <a href="https://www.twitter.fr" target="_blank">
                <BsTwitter />
              </a>
              <a href="https://www.instagram.fr" target="_blank">
                <BsInstagram />
              </a>
            </div>
          </div>

          {/* admin link */}
          <div className="mx-10 mt-10 flex flex-col text-neutral-400">
            {session ? (
              <Link href="/dashboard">Dashboard</Link>
            ) : (
              <Link href="/login">Espace administrateur</Link>
            )}
          </div>
        </div>
      </div>

      {/* credits */}
      <div className="flex flex-col items-center text-xs text-neutral-300">
        <p>Garage V.Parrot - Copyright 2023</p>
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
