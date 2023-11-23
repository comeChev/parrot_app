import { DescriptionPin, StatusPin } from "@/components/ui/Ui.status.pin";
import Explanations, {
  TExplanation,
} from "@/components/dashboard/ui/explanations";

import CarsList from "@/components/dashboard/cars/Cars.list";
import { FullCar } from "@/lib/cars";
import TextMain from "@/components/dashboard/ui/text.main";
import { prisma } from "@/utils/prisma";

export default async function AdminCarPage() {
  const cars = await prisma.car.findMany({
    include: { car_messages: true, car_pictures: true, car_strengths: true },
    orderBy: { car_published_date: "desc" },
  });
  const explanations: TExplanation[] = [
    { status: "ONLINE", label: "En ligne et visible sur le site" },
    { status: "ARCHIVED", label: "Hors ligne, peut être remis en ligne." },
    { status: "OFFLINE", label: "Archivé, ne peut être remis en ligne" },
  ];

  return (
    <div className="px-4 mt-10 min-h-screen container">
      {/* <pre>{JSON.stringify(cars, null, 3)}</pre> */}
      <TextMain text="Liste des véhicules" />

      {/* explanations status */}
      <Explanations items={explanations} />

      {/* cars list */}
      <CarsList carsDB={cars as FullCar[]} />
    </div>
  );
}
