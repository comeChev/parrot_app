import { assetsItems, carItem } from "@/data/data.home";

import Carousel from "@/components/ui/carousel/carousel";
import HomeAssetsItem from "@/components/site/home/Home.assets.item";
import HomeServiceOldCar from "@/components/site/home/Home.service.oldCar";
import HomeServicesItem from "@/components/site/home/Home.services.item";
import Image from "next/image";
import Link from "next/link";
import SeparatorImage from "@/components/ui/Ui.separator.image";
import UiImageMain from "@/components/ui/Ui.image.main";
import UiReasons from "@/components/ui/Ui.reasons";
import UiTextMain from "@/components/ui/Ui.text.main";
import electric from "@/assets/home/electric.jpg";
import { getCategories } from "@/lib/categories";
import { getFreshReviews } from "@/lib/reviews";
import mainImage from "@/assets/home/main.jpg";
import mechanic1 from "@/assets/home/mechanic1.jpg";
import mechanic2 from "@/assets/home/mechanic2.jpg";

export default async function Home() {
  const reviews = await getFreshReviews(3);
  const categories = await getCategories();
  return (
    <div className="min-h-screen">
      {/* main image */}

      <UiImageMain image={mainImage} />
      <UiTextMain text="Plus de 15 années d'expérience à votre service" />

      {/* section 1 - assets */}
      <div className="container mx-auto hidden md:flex mb-[100px]">
        {/* assets */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-3 gap-3">
          {assetsItems.map((item, index) => (
            <HomeAssetsItem Icon={item.Icon} text={item.text} title={item.title} key={index} />
          ))}
        </div>
      </div>

      {/* section 2 - presentation */}
      <div className="container mx-auto md:pb-[400px] lg:pb-0 lg:h-[500px] xl:h-[400px] mb-[100px] relative">
        <div className="flex flex-col lg:flex-row h-full">
          <div className="absolute top-[300px] ml-10 h-[400px] mb-4 w-1/3 lg:relative lg:h-full lg:w-[300px] lg:ml-0 lg:top-0 shadow-xl hidden md:flex lg:mb-0">
            <Image
              fill
              placeholder="blur"
              src={mechanic1}
              sizes="(min-width: 1040px) 300px, 256px"
              alt="image de mécanicien"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
          <div className="flex flex-col px-4 md:flex-1 space-y-5 text-lg font-light leading-relaxed">
            <p>
              Le garage V. Parrot ouvre ses portes aux particuliers et aux professionnels. Nous disposons des
              installations nécessaires pour recevoir votre véhicule et pour en prendre soin. Nous vous proposons une
              gamme complète de services.
            </p>
            <p>
              Établi à Toulouse (Haute Garonne, France) depuis 2001, le garage V. Parrot est spécialisé dans la{" "}
              <strong className="underline underline-offset-2 font-semibold">mécanique générale</strong> ainsi que la{" "}
              <strong className="underline underline-offset-2 font-semibold">vente de voiture d’occasion</strong>.
            </p>
            <p>
              Passionnée de mécanique automobile, notre équipe de professionnels propose des solutions adaptées à toutes
              vos problématiques allant de la{" "}
              <strong className="underline underline-offset-2 font-semibold">réparation</strong> à la{" "}
              <strong className="underline underline-offset-2 font-semibold">vente</strong> en passant par{" "}
              <strong className="underline underline-offset-2 font-semibold">l'entretien annuel</strong> ou ponctuel.
            </p>
          </div>
          <div className="absolute top-[300px] mr-10 right-0 h-[400px] mb-4 w-1/3 lg:relative lg:h-full lg:w-[300px] lg:mr-0 lg:top-0 shadow-xl hidden md:flex lg:mb-0">
            <Image
              fill
              placeholder="blur"
              src={mechanic2}
              sizes="(min-width: 1040px) 300px, 256px"
              alt="image d'un deuxième mécanicien"
              className="w-full h-full object-cover rounded-xl "
            />
          </div>
        </div>
      </div>

      {/* section 3 - services */}
      <div className="container mx-auto px-4 mb-[100px]" id="services">
        <h2 className="text-3xl md:text-4xl text-center font-bold mb-5 font-title">
          Les services que nous vous proposons
        </h2>
        <div className="h-[3px] bg-red-700 w-2/3 md:w-1/3 lg:w-1/4 mx-auto mb-12" />
        <div className="flex flex-col items-center md:grid md:grid-cols-3">
          <HomeServiceOldCar url={carItem.url} imageSrc={carItem.imageSrc} text={carItem.text} title={carItem.title} />

          {categories.map((c) => (
            <HomeServicesItem
              key={c.category_id}
              url={`/services?name=${c.category_name_url}`}
              imageSrc={c.category_picture || ""}
              text={c.category_description}
              title={c.category_name}
            />
          ))}
        </div>
      </div>

      {/* Reasons to choose garage */}
      <UiReasons />

      {/* separation image */}
      <SeparatorImage image={electric} />

      {/* section 3 - reviews */}
      <div className="container mx-auto px-5 mb-[100px] select-none">
        <h3 className="text-3xl font-bold mb-16 font-title text-center">Ils nous ont fait confiance</h3>

        <Carousel reviews={reviews} />

        <div className="flex items-center justify-center w-full">
          <Link
            href="/reviews"
            className="bg-red-700 text-neutral-100 text-2xl font-semibold rounded-md px-4 py-2 hover:bg-red-800 transition-all duration-300 ease-in-out"
          >
            Consulter notre livre d'Or
          </Link>
        </div>
      </div>
    </div>
  );
}
