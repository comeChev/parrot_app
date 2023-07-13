import CarsExplanation from "@/components/dashboard/cars/Cars.explanation";
import CarsList from "@/components/dashboard/cars/Cars.list";
import { DescriptionPin, StatusPin } from "@/components/ui/Ui.status.pin";
import { FullCar } from "@/lib/cars";
import { prisma } from "@/utils/prisma";
import { BsFillInboxesFill, BsEyeSlashFill } from "react-icons/bs";

export default async function AdminCarPage() {
  const cars = await prisma.car.findMany({
    include: { car_messages: true, car_pictures: true, car_strengths: true },
  });

  return (
    <div className="px-4 mt-10 min-h-screen container">
      {/* <pre>{JSON.stringify(cars, null, 3)}</pre> */}
      <h2 className="text-3xl font-bold">Liste des véhicules</h2>

      {/* explanations status */}
      <div className="flex items-center mt-5">
        <div className="flex flex-col">
          <div className="flex mb-1 items-center">
            <StatusPin status="ONLINE" />
            <DescriptionPin label="Annonce actuellement en ligne et visible sur le site" />
          </div>
          <div className="flex mb-1 items-center">
            <StatusPin status="ARCHIVED" />
            <DescriptionPin label="Annonce actuellement en hors ligne. Peut être remise en ligne." />
          </div>
          <div className="flex mb-1 items-center">
            <StatusPin status="OFFLINE" />
            <DescriptionPin label="Annonce archivée. Ne peut être remise en ligne" />
          </div>
        </div>
      </div>
      {/* cars list */}

      <CarsList carsDB={cars as FullCar[]} />

      {/* explanations icons */}
      {/* <div className="absolute bottom-5 w-4/5">
        <CarsExplanation
          Icon={BsFillInboxesFill}
          text="Une annonce archivée correspond à une annonce qui a été vendue (ou
            passée hors délai). Elle ne peut être remise en ligne."
        />
        <CarsExplanation
          Icon={BsEyeSlashFill}
          text=" Une annonce en attente de validation correspond à une annonce qui
            n'apparaît pas sur le site. Cela peut être le cas lorsqu'une annonce
            est en cours de création ou de modification, ou encore quand le
            paiement du véhicule est en attente."
        />
      </div> */}
    </div>
  );
}
