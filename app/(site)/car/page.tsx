import BreadCrumb, { BreadCrumbItem } from "@/components/ui/Ui.breadcrumb";
import { Metadata, ResolvingMetadata } from "next";
import { PublicCar, getCar } from "@/lib/cars";

import { BsFillTelephoneFill } from "react-icons/bs";
import CarForm from "@/components/site/car/Car.form";
import CarView from "@/components/site/car/Car.view";
import { FaHome } from "react-icons/fa";
import UiButtonAction from "@/components/ui/Ui.button.action";
import UiImageMain from "@/components/ui/Ui.image.main";
import UiReasons from "@/components/ui/Ui.reasons";
import UiTextMain from "@/components/ui/Ui.text.main";
import mainCarImage from "@/assets/cars/carsMain.jpg";
import noImage from "@/assets/no-image-available.jpg";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params, searchParams }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  // read route params
  const id = searchParams["id"];
  const car: PublicCar = await getCar(Number(id));
  const previousImages = (await parent).openGraph?.images ?? [];

  return {
    title: `${car.car_name} | Garage V. Parrot`,
    description: `Vente de véhicules d'occasion. Le garage V.Parrot vous propose la ${car.car_name} en vente sur notre site de Toulouse, Haute-Garonne (France). Consultez caractéristiques et photos puis contactez-nous !  !`,
    openGraph: {
      images: [`${car.car_pictures[0].car_picture_image ?? noImage}`, ...previousImages],
    },
  };
}

export default async function CarPage(params: { searchParams: { id: string } }) {
  const id = Number(params.searchParams.id);
  const car: PublicCar = await getCar(id);
  const items: BreadCrumbItem[] = [
    { label: "Accueil", href: "/", Icon: FaHome },
    { label: "Occasions - Recherche", href: `/cars` },
    {
      label: car.car_name.toLocaleUpperCase(),
      href: `/cars?id=${car.car_id}`,
    },
  ];

  return (
    <div className="w-full">
      <UiImageMain image={mainCarImage} />
      <div className="container mx-auto p-4 mb-[100px] md:-mt-20">
        <BreadCrumb items={items} />
        <CarView car={car} />
        {/* Reasons */}
      </div>
      <UiReasons />

      <div className="container mx-auto px-4 relative lg:px-[200px]">
        <UiTextMain text="Nous sommes là pour vous aider" />
        {/* phone button */}
        <div className="flex justify-center mb-[50px]">
          <UiButtonAction type="a" href="tel:+33987654321" Icon={BsFillTelephoneFill} text="09 87 65 43 21" />
        </div>
        <CarForm car={car} />
      </div>
    </div>
  );
}
