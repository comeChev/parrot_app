import mainImage from "@/assets/home/main.jpg";
import mechanic1 from "@/assets/home/mechanic1.jpg";
import mechanic2 from "@/assets/home/mechanic2.jpg";
import carrosserie from "@/assets/home/carrosserie.jpg";
import vente from "@/assets/home/vente.webp";
import revision from "@/assets/home/revision.jpg";
import electric from "@/assets/home/electric.jpg";

import HomeAssetsItem from "@/components/site/home/Home.assets.item";
import HomeServicesItem from "@/components/site/home/Home.services.item";
import Image from "next/image";
import { BiChevronsDown } from "react-icons/bi";
import { BsStars, BsCarFrontFill, BsPersonWorkspace } from "react-icons/bs";
import { GrServices } from "react-icons/gr";
import HomeReviewsItem from "@/components/site/home/Home.reviews.item";
import SeparatorImage from "@/components/ui/Ui.separator.image";
import Link from "next/link";
import UiReasons from "@/components/ui/Ui.reasons";
import { getFreshReviews } from "@/lib/reviews";
import { Review } from "@prisma/client";
import UiTextMain from "@/components/ui/Ui.text.main";
import { prisma } from "@/utils/prisma";
import UiImageMain from "@/components/ui/Ui.image.main";

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

export const carItem = {
  imageSrc: vente,
  text: "Véhicules en bon état et révisés cherchent propriétaires pour couler des jours heureux. Nous nous chargeons de vous mettre en relation.",
  title: "Vente de véhicules d'occasion",
  url: "/cars",
};

export const servicesItems = [
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
  const reviews = await getFreshReviews();
  const categories = await prisma.category.findMany();
  return (
    <div className="min-h-screen">
      {/* main image */}

      <UiImageMain image={mainImage} />

      <UiTextMain text="Plus de 15 d'expérience à votre service" />

      {/* section 1 - assets */}
      <div className="container mx-auto hidden md:flex mb-[100px]">
        {/* assets */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 px-10 my-10 gap-5">
          {assetsItems.map((item, index) => (
            <HomeAssetsItem
              Icon={item.Icon}
              text={item.text}
              title={item.title}
              index={index}
            />
          ))}
        </div>
      </div>

      {/* section 2 - presentation */}
      <div className="container mx-auto h-[500px] mb-[100px]">
        <div className="flex items-center h-full">
          <Image
            priority
            placeholder="blur"
            src={mechanic1}
            alt="image de mécanicien"
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
              Établi à St Toulouse (Haute Garonne, France) depuis 2001, le
              garage V. Parrot est spécialisé dans la{" "}
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
            alt="image d'un autre mécanicien"
            className="hidden md:flex h-full object-cover w-[150px] lg:w-[300px]"
          />
        </div>
      </div>

      {/* section 3 - services */}
      <div className="container mx-auto px-4 mb-[100px]" id="services">
        <h3 className="text-3xl font-bold mb-10">
          Les services que nous vous proposons
        </h3>
        <div className="flex flex-col md:grid md:grid-cols-3 md:space-x-5">
          {categories.map((c) => (
            <HomeServicesItem
              url={`/services?name=${c.category_name_url}`}
              imageSrc={c.category_picture || ""}
              text={c.category_description}
              title={c.category_name}
            />
          ))}
          <HomeServicesItem
            url={carItem.url}
            imageSrc={carItem.imageSrc}
            text={carItem.text}
            title={carItem.title}
          />
        </div>
      </div>

      {/* Reasons to choose garage */}
      <UiReasons />

      {/* separation image */}
      <SeparatorImage image={electric} />

      {/* section 3 - reviews */}
      <div className="container mx-auto px-4 mb-[100px] text-center select-none">
        <h3 className="text-3xl font-bold mb-24">
          Ils nous ont fait confiance
        </h3>
        <div className="flex flex-col md:flex-row md:space-x-5 mb-[70px]">
          {reviews.map((r, i) => (
            <HomeReviewsItem key={i} review={r as Review} />
          ))}
        </div>
        <Link
          href="/reviews"
          className="bg-red-700 text-neutral-100 text-2xl font-semibold rounded-md px-4 py-2 hover:bg-red-800 transition-all duration-300 ease-in-out"
        >
          Consulter notre livre d'Or
        </Link>
      </div>
    </div>
  );
}
