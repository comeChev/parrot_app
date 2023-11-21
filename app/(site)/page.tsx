import { BsCarFrontFill, BsPersonWorkspace, BsStars } from "react-icons/bs";
import { assetsItems, carItem } from "@/data/data.home";

import { BiChevronsDown } from "react-icons/bi";
import { GrServices } from "react-icons/gr";
import HomeAssetsItem from "@/components/site/home/Home.assets.item";
import HomeReviewsItem from "@/components/site/home/Home.reviews.item";
import HomeServicesItem from "@/components/site/home/Home.services.item";
import Image from "next/image";
import Link from "next/link";
import { Review } from "@prisma/client";
import SeparatorImage from "@/components/ui/Ui.separator.image";
import UiImageMain from "@/components/ui/Ui.image.main";
import UiReasons from "@/components/ui/Ui.reasons";
import UiTextMain from "@/components/ui/Ui.text.main";
import carrosserie from "@/assets/home/carrosserie.jpg";
import electric from "@/assets/home/electric.jpg";
import { getFreshReviews } from "@/lib/reviews";
import mainImage from "@/assets/home/main.jpg";
import mechanic1 from "@/assets/home/mechanic1.jpg";
import mechanic2 from "@/assets/home/mechanic2.jpg";
import { prisma } from "@/utils/prisma";
import revision from "@/assets/home/revision.jpg";
import vente from "@/assets/home/vente.webp";

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
          <div className="h-full w-[150px] lg:w-[300px] relative">
            <Image
              priority
              fill
              placeholder="blur"
              src={mechanic1}
              sizes="(min-width: 1040px) 300px, 150px"
              alt="image de mécanicien"
              className="hidden md:flex w-full h-full object-cover "
            />
          </div>
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
          <div className="h-full w-[150px] lg:w-[300px] relative">
            <Image
              priority
              src={mechanic2}
              placeholder="blur"
              sizes="(min-width: 1040px) 300px, 150px"
              fill
              alt="image d'un autre mécanicien"
              className="hidden md:flex object-cover h-full w-full "
            />
          </div>
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
