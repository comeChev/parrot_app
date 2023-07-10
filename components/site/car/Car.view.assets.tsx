import { FaGasPump, FaCalendarDay, FaTachometerAlt } from "react-icons/fa";
import { GiGearStickPattern } from "react-icons/gi";
import CarViewAssetsItem from "./Car.view.assets.item";
import { getKilometers, getUpperCaseFirstLetter } from "@/utils/globals";

type CarViewAssetsProps = {
  kilometers: number;
  gearbox: string;
  fuel: string;
  year: number;
};

export default function CarViewAssets({
  kilometers,
  gearbox,
  fuel,
  year,
}: CarViewAssetsProps) {
  return (
    <div className="mt-3 flex flex-wrap pb-4 border-b-2 border-neutral-300">
      <CarViewAssetsItem
        Icon={FaGasPump}
        value={getUpperCaseFirstLetter(fuel)}
      />
      <CarViewAssetsItem Icon={FaCalendarDay} value={year} />
      <CarViewAssetsItem
        Icon={FaTachometerAlt}
        value={getKilometers(kilometers)}
      />
      <CarViewAssetsItem
        Icon={GiGearStickPattern}
        value={getUpperCaseFirstLetter(gearbox)}
      />
    </div>
  );
}
