import { IconType } from "react-icons";
import React from "react";

type HomeAssetsItemProps = {
  Icon: IconType;
  text: string;
  title: string;
};

export default function HomeAssetsItem({
  Icon,
  text,
  title,
}: HomeAssetsItemProps) {
  return (
    <div
      className={`mx-3 my-3 flex flex-col items-center flex-1 border-y-2 border-red-800 bg-gray-50 p-4 hover:scale-105 duration-300 transition-all ease-in-out shadow-xl rounded-md`}
    >
      <Icon className="text-6xl text-gray-800" />
      <div className="flex-1 flex flex-col justify-between">
        <h3 className="w-full text-start text-xl font-semibold my-4 font-subtitle text-gray-800">
          {title}
        </h3>
        <p className="w-full text-start text-neutral-600 leading-relaxed">
          {text}
        </p>
      </div>
    </div>
  );
}
