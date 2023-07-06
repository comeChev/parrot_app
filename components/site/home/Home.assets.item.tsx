import React from "react";
import { IconType } from "react-icons";

type HomeAssetsItemProps = {
  Icon: IconType;
  text: string;
  title: string;
  index: number;
};

export default function HomeAssetsItem({
  Icon,
  text,
  title,
  index,
}: HomeAssetsItemProps) {
  return (
    <div
      className={`mx-3 my-3 flex flex-col items-center flex-1 border-0 ${
        index === 0
          ? "border-t-2 border-r-2"
          : index === 1
          ? "border-r-2 border-b-2"
          : index === 2
          ? "border-r-2 border-t-2"
          : "border-b-2 border-r-2"
      } border-red-800 p-4`}
    >
      <Icon className="text-6xl" />
      <div className="flex-1">
        <h3 className="w-full text-start text-xl font-semibold my-4">
          {title}
        </h3>
        <p className="w-full text-start text-neutral-600">{text}</p>
      </div>
    </div>
  );
}
