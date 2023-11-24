import { BsArrowDownUp, BsArrowLeftRight } from "react-icons/bs";

import CarFormStrengthsTable from "./Car.form.strengths.table";
import FormBox from "@/components/ui/form/Form.box";
import { FullCar } from "@/lib/cars";
import { Strength } from "@prisma/client";

type CarFormStrengthsProps = {
  car: FullCar;
  setCar: React.Dispatch<React.SetStateAction<FullCar>>;
  strengths: Strength[];
  setStrengths: React.Dispatch<React.SetStateAction<Strength[]>>;
};

export default function CarFormStrengths({ car, setCar, setStrengths, strengths }: CarFormStrengthsProps) {
  function handleStrength(type: "add" | "remove", s: Strength) {
    if (type === "add") {
      setStrengths(strengths.filter((strength) => strength.strength_id !== s.strength_id));
      setCar({
        ...car,
        car_strengths: [...car.car_strengths, s],
      });
    } else if (type === "remove") {
      setStrengths([...strengths, s]);
      setCar({
        ...car,
        car_strengths: car.car_strengths.filter((strength) => strength.strength_id !== s.strength_id),
      });
    }
  }

  return (
    <FormBox title="Points forts">
      <div className="flex flex-col lg:flex-row">
        <CarFormStrengthsTable
          strengths={car.car_strengths}
          text="Annonce"
          handleClick={handleStrength}
          type="remove"
        />
        <div className="text-xl md:text-4xl flex lg:flex-col item-center justify-center m-3">
          <BsArrowDownUp className="flex lg:hidden" />
          <BsArrowLeftRight className="hidden lg:flex" />
        </div>
        <CarFormStrengthsTable strengths={strengths} text="Bibliothèque" handleClick={handleStrength} type="add" />
      </div>
    </FormBox>
  );
}
