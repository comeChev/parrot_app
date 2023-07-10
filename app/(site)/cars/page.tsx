import UiImageMain from "@/components/ui/Ui.image.main";
import UiTextMain from "@/components/ui/Ui.text.main";
import { FullCar, getCars } from "@/lib/cars";

import mainCars from "@/assets/cars/carsMain.jpg";
import CarsList from "@/components/site/cars/Cars.list";
import UiReasons from "@/components/ui/Ui.reasons";

export default async function CarsPage() {
  const cars: FullCar[] = await getCars();

  return (
    <div className="w-full">
      <UiImageMain image={mainCars} />

      <UiTextMain text="Des dizaines de véhicules d’occasion révisés et entretenus par nos soins vous attendent !" />

      <CarsList carsDB={cars} />

      {/* reasons */}
      <UiReasons />
    </div>
  );
}
