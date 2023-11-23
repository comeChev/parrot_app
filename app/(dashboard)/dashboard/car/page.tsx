import CarDelete from "@/components/dashboard/car/Car.delete";
import CarForm from "@/components/dashboard/car/Car.form";
import { FullCar } from "@/lib/cars";
import TextMain from "@/components/dashboard/ui/text.main";
import { prisma } from "@/utils/prisma";

export default async function CarPage(params: {
  searchParams: { id: string };
}) {
  const { id } = params.searchParams;

  const car =
    id &&
    (await prisma.car.findUnique({
      where: { car_id: Number(id) },
      include: { car_messages: true, car_pictures: true, car_strengths: true },
    }));

  const mainText = car
    ? `Modification du véhicule ${car.car_name.toLocaleUpperCase()}`
    : "Ajouter un véhicule";

  return (
    <div className="px-4 mt-10 min-h-screen container">
      <div className="flex flex-col md:flex-row md:items-center gap-2">
        <TextMain text={mainText} />

        {car && <CarDelete car={car as FullCar} />}
      </div>

      <div className="mt-10">
        {car ? <CarForm carDB={car as FullCar} /> : <CarForm />}
      </div>
    </div>
  );
}
