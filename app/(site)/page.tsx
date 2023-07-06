import mainImage from "@/assets/home/main.jpg";
import mechanic1 from "@/assets/home/mechanic1.jpg";
import mechanic2 from "@/assets/home/mechanic2.jpg";
import carrosserie from "@/assets/home/carrosserie.jpg";
import vente from "@/assets/home/vente.webp";
import revision from "@/assets/home/revision.jpg";
import outils from "@/assets/home/outils.jpg";
import electric from "@/assets/home/electric.jpg";

import HomeAssetsItem from "@/components/site/home/Home.assets.item";
import HomeServicesItem from "@/components/site/home/Home.services.item";
import Image from "next/image";
import { BiChevronsDown } from "react-icons/bi";
import {
  BsStars,
  BsCarFrontFill,
  BsPersonWorkspace,
  BsPinMapFill,
} from "react-icons/bs";
import { GrServices } from "react-icons/gr";
import { GiReceiveMoney } from "react-icons/gi";
import { FaHandsHelping } from "react-icons/fa";
import HomeReasonsItem from "@/components/site/home/Home.reasons.item";
import { LiaCertificateSolid } from "react-icons/lia";
import HomeReviewsItem from "@/components/site/home/Home.reviews.item";
import SeparatorImage from "@/components/ui/Ui.separator.image";
import Link from "next/link";

const assetsItems = [
  {
    Icon: BsStars,
    title: "Des experts à votre service",
    text: "Des mécaniciens expérimentés à votre service pour répondre à vos demandes que vous ayez déjà confié un véhicule ou que vous ne soyez pas encore client.",
  },
  {
    Icon: BsCarFrontFill,
    title: "Des véhicules d’occasions vérifiés, entretenus et certifiés",
    text: "Tous les jours, nos techniciens assurent l’entretien et la révisions des véhicules qui nous sont confiés à la vente.",
  },
  {
    Icon: BsPersonWorkspace,
    title: "Un suivi personnalisé de votre dossier",
    text: "De la prise en charge de véhicule au retour de celui-ci, nos experts vous tiennent informés de l’avancée des travaux et répondent à vos questions.",
  },
  {
    Icon: GrServices,
    title: "Des produits et des prestations de qualité",
    text: "Nous prêtons une attention toute particulière à la provenance et la qualité de nos produits. Nos prestations sont donc dans la même lignée.",
  },
];

const servicesItems = [
  {
    imageSrc: vente,
    text: "Véhicules en bon état et révisés cherchent propriétaires pour couler des jours heureux. Nous nous chargeons de vous mettre en relation.",
    title: "Vente de véhicules d'occasion",
    url: "/cars",
  },
  {
    imageSrc: revision,
    text: "Votre voiture a besoin d’attention et nous nous tenons prêt à lui accorder le temps nécessaire.",
    title: "Entretien et révision mécanique",
    url: "/services?name=mechanic",
  },
  {
    imageSrc: carrosserie,
    text: "Nos experts sont prêts à refaire une beauté à votre véhicule ou encore à réparer les affres du temps.",
    title: "Carrosserie et réparation",
    url: "/services?name=repair",
  },
];

const reasonItems = [
  {
    Icon: FaHandsHelping,
    text: "Forts de plus de 15 années d'expérience dans le métier de garagiste, nous saurons répondre à vos besoins dans les meilleurs délais.",
    title: "Expertise et réactivité",
  },
  {
    Icon: LiaCertificateSolid,
    text: "Nous disposons des qualifications et des compétences nécessaires pour vous assurer un service de qualité.",
    title: "Certifications",
  },
  {
    Icon: GiReceiveMoney,
    text: "Nous vous proposons des tarifs attractifs et respectueux de la qualité de notre travail.",
    title: "Tarifs attractifs",
  },
  {
    Icon: BsPinMapFill,
    text: "Notre emplacement idéal nous permet de vous offrir un service de proximité.",
    title: "Emplacements et réseaux",
  },
];

const reviewItems = [
  {
    name: "Roger E.",
    date: new Date(2021, 10, 3),
    note: 3,
    text: "Disponibles durant tout le long de l’entretien de mon véhicule, les mécaniciens ont su répondre à mes questions et me rassurer.",
  },
  {
    name: "Roger E.",
    date: new Date(2021, 10, 3),
    note: 0,
    text: "Disponibles durant tout le long de l’entretien de mon véhicule, les mécaniciens ont su répondre à mes questions et me rassurer.",
  },
  {
    name: "Roger E.",
    date: new Date(2021, 10, 3),
    note: 4,
    text: "Disponibles durant tout le long de l’entretien de mon véhicule, les mécaniciens ont su répondre à mes questions et me rassurer.",
  },
];

export default async function Home() {
  return (
    <div className="">
      {/* main image */}
      <div className="relative w-full h-[500px] mb-10 md:mb-[150px]">
        <Image
          src={mainImage}
          alt="image de présentation garage V. Parrot"
          className="w-full h-full object-cover brightness-75"
        />
        {/* Title with name of the enterprise */}
        <div className="absolute bottom-32 w-full h-10 items-center flex flex-col">
          <h1 className="bottom-4 text-white text-4xl font-extrabold">
            GARAGE V. PARROT
          </h1>
          <h2 className="text-xl text-neutral-400">
            St Claude, Zone artisanale du moulin
          </h2>
        </div>

        {/* searchForm */}
        <div className="bg-red-700 rounded-md py-6 w-5/6 max-w-[1000px] absolute -bottom-20 right-[50%] translate-x-[50%] hidden md:flex flex-col space-y-2 shadow-lg shadow-neutral-300">
          {/* speed search */}
          <form className="flex items-center px-5 space-x-5 w-full">
            {/* choose fuel */}
            <select
              name="carFuel"
              id="carFuel"
              className="py-2 px-2 rounded-md border-2 border-neutral-300 flex-1 text-neutral-400"
            >
              <option value={""}>-- Type de carburant --</option>
              <option value={"Essence"}>Essence</option>
              <option value={"Diesel"}>Diesel</option>
              <option value={"Hybride"}>Hybride</option>
              <option value={"Électrique"}>Électrique</option>
            </select>

            {/* choose gearbox  */}
            <select
              name="carGearbox"
              id="carGearbox"
              className="py-2 px-2 rounded-md border-2 border-neutral-300 flex-1 text-neutral-400"
            >
              <option value={""}>-- Type de boîte de vitesse --</option>
              <option value={"Essence"}>Manuelle</option>
              <option value={"Diesel"}>Automatique</option>
            </select>

            <button
              type="submit"
              className="flex items-center text-md font-bold px-5 py-2 bg-red-900 rounded-md text-neutral-100"
            >
              Go
            </button>
          </form>
          {/* advanced search */}
          <form className="flex flex-col px-5 w-full">
            <div className="flex text-base text-neutral-300 mb-1 items-center space-x-2">
              <label htmlFor="inputSearch">Recherche avancée</label>
              <BiChevronsDown className="text-xl" />
            </div>
            <div className="w-full flex space-x-5">
              <input
                placeholder="Recherche par mot clé (voiture, marque, prix)"
                name="inputSearch"
                id="inputSearch"
                className="py-2 px-2 rounded-md border-2 border-neutral-300 flex-1 placeholder:text-neutral-400"
              />

              <button
                type="submit"
                className="flex items-center text-md font-bold px-5 py-2 bg-red-900 rounded-md text-neutral-100"
              >
                Go
              </button>
            </div>
          </form>
        </div>
      </div>

      <h2 className="text-center text-4xl font-bold mb-12 px-4">
        Plus de 15 d'expérience à votre service
      </h2>

      {/* section 1 - assets */}
      <section className="container mx-auto hidden md:flex mb-[100px]">
        {/* assets */}
        <div className="flex flex-col md:flex-row px-10 my-10">
          {assetsItems.map((item, index) => (
            <HomeAssetsItem
              Icon={item.Icon}
              text={item.text}
              title={item.title}
              index={index}
            />
          ))}
        </div>
      </section>

      {/* section 2 - presentation */}
      <section className="container mx-auto h-[500px] mb-[100px]">
        <div className="flex items-center h-full">
          <Image
            src={mechanic1}
            alt="illustrationImage"
            className="hidden md:flex h-full object-cover  w-[150px] lg:w-[300px]"
          />
          <div className="flex flex-col px-4 md:flex-1 space-y-5 text-lg font-light">
            <p>
              Le garage V. Parrot ouvre ses portes aux particuliers et aux
              professionnels. Nous disposons des installations nécessaires pour
              recevoir votre véhicule et pour en prendre soin. Nous vous
              proposons une gamme complète de services.
            </p>
            <p>
              Établi à Toulouse (Gard, France) depuis 2001, le garage V. Parrot
              est spécialisé dans la{" "}
              <strong className="underline underline-offset-2 font-semibold">
                mécanique générale
              </strong>{" "}
              ainsi que la{" "}
              <strong className="underline underline-offset-2 font-semibold">
                vente de voiture d’occasion
              </strong>
              .
            </p>
            <p>
              Passionnée de mécanique automobile, notre équipe de professionnels
              propose des solutions adaptées à toutes vos problématiques allant
              de la{" "}
              <strong className="underline underline-offset-2 font-semibold">
                réparation
              </strong>{" "}
              à la{" "}
              <strong className="underline underline-offset-2 font-semibold">
                vente
              </strong>{" "}
              en passant par{" "}
              <strong className="underline underline-offset-2 font-semibold">
                l'entretien annuel
              </strong>{" "}
              ou ponctuel.
            </p>
          </div>
          <Image
            src={mechanic2}
            alt="illustrationImage"
            className="hidden md:flex h-full object-cover w-[150px] lg:w-[300px]"
          />
        </div>
      </section>

      {/* section 3 - services */}
      <section className="container mx-auto px-4 mb-[100px]">
        <h3 className="text-3xl font-bold mb-10">
          Les services que nous vous proposons
        </h3>
        <div className="flex flex-col md:flex-row md:space-x-5">
          {servicesItems.map((s) => (
            <HomeServicesItem
              url={s.url}
              imageSrc={s.imageSrc}
              text={s.text}
              title={s.title}
            />
          ))}
        </div>
      </section>

      {/* separation image */}
      <SeparatorImage image={outils} />

      {/* section 4 - reasons */}
      <section className="container mx-auto px-4 mb-[100px]">
        <h3 className="text-3xl font-bold mb-10">
          Pourquoi choisir notre garage
        </h3>
        <div className="flex flex-col md:flex-row md:space-x-5">
          {reasonItems.map((r) => (
            <HomeReasonsItem Icon={r.Icon} text={r.text} title={r.title} />
          ))}
        </div>
      </section>

      {/* separation image */}
      <SeparatorImage image={electric} />

      {/* section 3 - reviews */}
      <section className="container mx-auto px-4 mb-[100px] text-center select-none">
        <h3 className="text-3xl font-bold mb-24">
          Ils nous ont fait confiance
        </h3>
        <div className="flex flex-col md:flex-row md:space-x-5 mb-[70px]">
          {reviewItems.map((i) => (
            <HomeReviewsItem
              name={i.name}
              text={i.text}
              date={i.date}
              note={i.note}
            />
          ))}
        </div>
        <Link
          href="/reviews"
          className="bg-red-700 text-neutral-100 text-2xl font-semibold rounded-md px-4 py-2 hover:bg-red-800 transition-all duration-300 ease-in-out"
        >
          Consulter notre livre d'Or
        </Link>
      </section>
    </div>
  );
}
