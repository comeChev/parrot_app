import { PublicCar, getCars } from "@/lib/cars";

import CarsList from "@/components/site/cars/Cars.list";
import { Suspense } from "react";
import UiImageMain from "@/components/ui/Ui.image.main";
import UiReasons from "@/components/ui/Ui.reasons";
import UiTextMain from "@/components/ui/Ui.text.main";
import mainCars from "@/assets/cars/carsMain.jpg";

export default async function CarsPage() {
  const cars: PublicCar[] = await getCars();

  return (
    <div className="container mx-auto">
      <UiImageMain image={mainCars} />

      <UiTextMain text="Des dizaines de véhicules d’occasion révisés et entretenus par nos soins vous attendent !" />

      <Suspense fallback={<div>Loading</div>}>
        <CarsList carsDB={cars} />
      </Suspense>

      {/* reasons */}
      <UiReasons />
    </div>
  );
}
