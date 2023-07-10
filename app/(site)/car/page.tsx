import UiImageMain from "@/components/ui/Ui.image.main";
import { PublicCar, getCar } from "@/lib/cars";
import mainCarImage from "@/assets/cars/carsMain.jpg";
import { FaHome } from "react-icons/fa";
import BreadCrumb, { BreadCrumbItem } from "@/components/ui/Ui.breadcrumb";
import CarView from "@/components/site/car/Car.view";
import UiReasons from "@/components/ui/Ui.reasons";
import CarForm from "@/components/site/car/Car.form";
import UiTextMain from "@/components/ui/Ui.text.main";
import UiButtonAction from "@/components/ui/Ui.button.action";
import { BsFillTelephoneFill } from "react-icons/bs";

export default async function CarPage(params: {
  searchParams: { id: string };
}) {
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
      <div className="container mx-auto p-4 mb-[100px]">
        <BreadCrumb items={items} />
        <CarView car={car} />
        {/* Reasons */}
      </div>
      <UiReasons />

      <div className="container mx-auto px-4 relative lg:px-[200px]">
        <UiTextMain text="Nous sommes là pour vous aider" />
        {/* phone button */}
        <div className="flex justify-center mb-[50px]">
          <UiButtonAction
            type="a"
            href="tel:+33987654321"
            Icon={BsFillTelephoneFill}
            text="09 87 65 43 21"
          />
        </div>
        <CarForm car={car} />
      </div>
    </div>
  );
}
