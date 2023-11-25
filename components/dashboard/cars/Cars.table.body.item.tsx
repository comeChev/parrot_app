import { Dispatch, SetStateAction } from "react";

import CarsTableBodyItemInbox from "./Cars.table.body.item.inbox";
import { FullCar } from "@/lib/cars";
import Image from "next/image";
import { StatusPin } from "@/components/ui/Ui.status.pin";
import TableActions from "@/components/ui/table/Table.actions";
import { getPrice } from "@/utils/globals";
import noPictures from "@/assets/no-image-available.jpg";

type CarsTableBodyItemProps = {
  car: FullCar;
  setCars: Dispatch<SetStateAction<FullCar[]>>;
};

export default function CarsTableBodyItem({ car, setCars }: CarsTableBodyItemProps) {
  return (
    <tr
      key={car.car_id}
      className="ring-[1px] ring-transparent hover:ring-red-800 my-1 hover:bg-gray-200 text-gray-600 transition-all duration-300"
    >
      {/* status */}
      <td className="px-1 py-2 text-center ">
        <div className="flex justify-center w-full">
          <StatusPin status={car.car_status.toUpperCase() as "ONLINE" | "ARCHIVED" | "OFFLINE"} />
        </div>
      </td>
      <td className="hidden px-1 py-2 md:table-cell">
        <p>{new Date(car.car_published_date).toLocaleDateString("fr-FR")}</p>
      </td>
      <td className="hidden px-1 py-2 lg:table-cell">
        <div className="relative mx-1">
          <Image
            src={car.car_pictures[0] ? car.car_pictures[0].car_picture_image : noPictures}
            alt={car.car_name}
            height={100}
            width={150}
            className="object-cover w-full h-full p-3 rounded-md"
          />
        </div>
      </td>
      <td className="px-1 py-2 truncate">{car.car_name.toUpperCase()}</td>
      <td className="hidden px-1 py-2 text-end md:table-cell">{getPrice(car.car_price)}</td>
      {/* inbox */}
      <td className="px-1 py-2">
        <CarsTableBodyItemInbox car={car} />
      </td>

      {/* buttons */}
      <td className="px-1 py-2">
        <TableActions car={car} setCars={setCars} />
      </td>
    </tr>
  );
}
