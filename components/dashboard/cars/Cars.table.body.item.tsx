import { StatusPin } from "@/components/ui/Ui.status.pin";
import TableActions from "@/components/ui/table/Table.actions";

import { FullCar } from "@/lib/cars";
import { getPrice } from "@/utils/globals";
import { Dispatch, SetStateAction } from "react";
import CarsTableBodyItemInbox from "./Cars.table.body.item.inbox";
import Image from "next/image";
import noPictures from "@/assets/no-image-available.jpg";

type CarsTableBodyItemProps = {
  car: FullCar;
  setCars: Dispatch<SetStateAction<FullCar[]>>;
};

export default function CarsTableBodyItem({
  car,
  setCars,
}: CarsTableBodyItemProps) {
  return (
    <tr
      key={car.car_id}
      className="ring-[1px] ring-transparent hover:ring-red-800 my-1 hover:bg-amber-100 transition-all duration-300"
    >
      {/* status */}
      <td className="py-2 px-1 text-center ">
        <div className="flex justify-center w-full">
          <StatusPin
            status={
              car.car_status.toUpperCase() as "ONLINE" | "ARCHIVED" | "OFFLINE"
            }
          />
        </div>
      </td>
      <td className="py-2 px-1 hidden md:table-cell">
        <p>{new Date(car.car_published_date).toLocaleDateString("fr-FR")}</p>
      </td>
      <td className="py-2 px-1 hidden lg:table-cell">
        <div className="mx-1 relative">
          <Image
            src={
              car.car_pictures[0]
                ? car.car_pictures[0].car_picture_image
                : noPictures
            }
            alt={car.car_name}
            height={100}
            width={150}
            className="p-3 h-full w-full object-cover rounded-md"
          />
        </div>
      </td>
      <td className="py-2 px-1 truncate">{car.car_name.toUpperCase()}</td>
      <td className="py-2 px-1 text-end hidden md:table-cell">
        {getPrice(car.car_price)}
      </td>
      {/* inbox */}
      <td className="py-2 px-1">
        <CarsTableBodyItemInbox car={car} />
      </td>

      {/* buttons */}
      <td className="py-2 px-1">
        <TableActions car={car} setCars={setCars} />
      </td>
    </tr>
  );
}
