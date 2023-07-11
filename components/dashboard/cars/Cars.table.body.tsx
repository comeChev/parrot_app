import { FullCar } from "@/lib/cars";

import CarsTableBodyItem from "./Cars.table.body.item";

type CarsTableBodyProps = {
  cars: FullCar[];
  setCars: React.Dispatch<React.SetStateAction<FullCar[]>>;
};

export default function CarsTableBody({ cars, setCars }: CarsTableBodyProps) {
  return (
    <tbody className="text-neutral-500">
      {cars.map((car: FullCar) => (
        <CarsTableBodyItem key={car.car_id} car={car} setCars={setCars} />
      ))}
    </tbody>
  );
}
