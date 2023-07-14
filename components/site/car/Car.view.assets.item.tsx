import React from "react";
import { IconType } from "react-icons";

type CarsListItemAssetProps = {
  Icon: IconType;
  value: string | number | null;
};

export default function CarViewAssetsItem({
  Icon,
  value,
}: CarsListItemAssetProps) {
  return (
    <div className="flex flex-row items-center space-x-2 text-neutral-500 text-lg font-base mr-5">
      <Icon />
      <p>{value}</p>
    </div>
  );
}
