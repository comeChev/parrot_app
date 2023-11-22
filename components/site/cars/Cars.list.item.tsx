import {
  FaCalendarDay,
  FaCamera,
  FaGasPump,
  FaTachometerAlt,
} from "react-icons/fa";
import {
  getKilometers,
  getPrice,
  getUpperCaseFirstLetter,
} from "@/utils/globals";

import CarsListItemAsset from "./Cars.list.item.asset";
import { GiGearStickPattern } from "react-icons/gi";
import Image from "next/image";
import Link from "next/link";
import { PublicCar } from "@/lib/cars";
import noImage from "@/assets/no-image-available.jpg";

type CarsListItemProps = {
  car: PublicCar;
};

export default function CarsListItem({ car }: CarsListItemProps) {
  return (
    <div className="md:p-2 m-2 select-none cursor-pointer  border-2 border-transparent rounded-xl transition-all duration-500 md:hover:scale-[1.01]">
      <div className=" shadow-lg rounded-xl border-gray-300 bg-gray-50 flex flex-col md:flex-row  overflow-hidden">
        {/* image & price */}
        <div className="relative w-full h-[250px] md:w-[280px] md:h-auto">
          <Image
            src={
              car.car_pictures[0]
                ? car.car_pictures[0].car_picture_image
                : noImage
            }
            alt={car.car_name}
            fill={true}
            sizes="(min-width: 1280px) 205px, (min-width: 1040px) 195px, (min-width: 780px) 174px, (min-width: 680px) 620px, 94.44vw"
            priority={true}
            className="w-full rounded-t-lg md:rounded-tl-lg md:rounded-bl-lg md:rounded-tr-none object-cover object-center"
          />
          <span className="absolute top-3 left-3 bg-red-800 py-1 px-4 rounded-full text-neutral-100 text-sm shadow-sm shadow-neutral-700">
            {getPrice(car.car_price)}
          </span>
        </div>
        {/* content info */}
        <div className="p-4 md:py-2 md:px-4 w-full flex flex-col justify-between relative">
          <h3 className="text-xl font-extrabold mb-4">
            {car.car_name.toUpperCase()}
          </h3>
          <div className="mt-3 flex flex-wrap gap-4 pb-4 border-b-2 border-neutral-300">
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
              value={getKilometers(car.car_kilometers)}
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
          <div className="w-full text-end">
            <Link
              href={`/car?id=${car.car_id}`}
              className="inline-block mt-5 mb-2 py-2 px-4 bg-red-800 text-neutral-100 font-semibold shadow-sm shadow-neutral-700 rounded-lg hover:bg-red-900 hover:scale-105 transition-all duration-300 ease-in-out"
            >
              En savoir plus
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
