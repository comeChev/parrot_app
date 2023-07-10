import { FullCar } from "@/lib/cars";
import noImage from "@/assets/no-image-available.jpg";
import Image from "next/image";
import {
  FaGasPump,
  FaCalendarDay,
  FaTachometerAlt,
  FaCamera,
} from "react-icons/fa";
import { GiGearStickPattern } from "react-icons/gi";
import CarsListItemAsset from "./Cars.list.item.asset";
import Link from "next/link";

type CarsListItemProps = {
  car: FullCar;
};

function getPrice(price: number) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(price);
}

function getKilometers(kilometers: number) {
  return new Intl.NumberFormat("fr-FR", {
    style: "unit",
    unit: "kilometer",
  }).format(kilometers);
}

function getUpperCaseFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function CarsListItem({ car }: CarsListItemProps) {
  return (
    <div className="p-4 select-none cursor-pointer">
      <div className="border-2 shadow-sm shadow-neutral-400 rounded-xl border-gray-300 hover:border-red-800">
        {/* image & price */}
        <div className="relative w-full h-[250px] sm:h-[200px] md:[350px] lg:[500px]">
          <Image
            src={
              car.car_pictures[0]
                ? car.car_pictures[0].car_picture_image
                : noImage
            }
            alt={car.car_name}
            fill={true}
            sizes="10vw (min-width: 768px) 50vw, (min-width: 768px) 33vw"
            priority={true}
            className="w-full rounded-t-lg object-cover object-center"
          />
          <span className="absolute top-3 left-3 bg-red-800 py-1 px-4 rounded-full text-neutral-100 text-sm shadow-sm shadow-neutral-700">
            {getPrice(car.car_price)}
          </span>
        </div>
        <div className="p-4">
          <h4 className="text-xl font-extrabold h-[50px] lg:h-[100px]">
            {car.car_name.toUpperCase()}
          </h4>
          <div className="mt-3 pl-3 flex flex-col space-y-2 pb-4 border-b-2 border-neutral-300">
            <CarsListItemAsset
              Icon={FaCalendarDay}
              value={new Date(car.car_year).getFullYear()}
            />
            <CarsListItemAsset
              Icon={FaGasPump}
              value={getUpperCaseFirstLetter(car.car_fuel)}
            />
            <CarsListItemAsset
              Icon={FaTachometerAlt}
              value={getKilometers(car.car_kilometers) + "s"}
            />
            <CarsListItemAsset
              Icon={GiGearStickPattern}
              value={getUpperCaseFirstLetter(car.car_gearbox)}
            />
            <CarsListItemAsset
              Icon={FaCamera}
              value={getUpperCaseFirstLetter(`
                ${car.car_pictures.length} ${
                car.car_pictures.length > 1 ? "photos" : "photo"
              }`)}
            />
          </div>
          <Link
            href={`/car?id=${car.car_id}`}
            type="button"
            className="inline-block mt-5 mb-2 py-2 px-4 bg-red-800 text-neutral-100 font-semibold shadow-sm shadow-neutral-700 rounded-lg hover:bg-red-900 transition-all duration-300 ease-in-out"
          >
            En savoir plus
          </Link>
        </div>
      </div>
    </div>
  );
}
