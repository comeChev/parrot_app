import { IconType } from "react-icons";
import React from "react";

type CarsListItemAssetProps = {
  Icon: IconType;
  value: string | number | null;
};

export default function CarViewAssetsItem({ Icon, value }: CarsListItemAssetProps) {
  return (
    <div className="flex flex-row items-center mr-5 space-x-2 text-lg text-gray-600 font-base">
      <Icon />
      <p>{value}</p>
    </div>
  );
}
