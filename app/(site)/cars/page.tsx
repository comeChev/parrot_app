import { PublicCar, getCars } from "@/lib/cars";

import CarsList from "@/components/site/cars/Cars.list";
import UiImageMain from "@/components/ui/Ui.image.main";
import UiReasons from "@/components/ui/Ui.reasons";
import UiTextMain from "@/components/ui/Ui.text.main";
import mainCars from "@/assets/cars/carsMain.jpg";

export const metadata = {
  title: "Véhicules d'occasions révisés et entretenus | Garage V. Parrot",
  description:
    "Bienvenue sur le site Garage V. Parrot. Nous sommes spécialisés dans la réparation, l'entretien et la vente de véhicules de toutes marques. Consultez les véhicules de toutes marques que nous proposons à la vente. Révisés et réparés, vous pouvez faire confiance aux véhicules proposés par nos équipes au garage V. Parrot  !",
};
export default async function CarsPage() {
  const cars: PublicCar[] = await getCars();

  return (
    <div className="container mx-auto">
      <UiImageMain image={mainCars} />

      <UiTextMain text="Des dizaines de véhicules d’occasion révisés et entretenus par nos soins vous attendent !" />

      <CarsList carsDB={cars} />

      {/* reasons */}
      <UiReasons />
    </div>
  );
}
