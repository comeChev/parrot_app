import Image, { StaticImageData } from "next/image";
import React from "react";

type AboutHistoricItemProps = {
  image: StaticImageData;
  textOne: string;
  textTwo: string;
  reverse?: boolean;
};

export default function AboutHistoricItem({
  image,
  textOne,
  textTwo,
  reverse = false,
}: AboutHistoricItemProps) {
  return (
    <div className="flex flex-col lg:flex-row items-center font-light my-24">
      <div className="flex flex-col px-4">
        <p className="lg:hidden">{textOne}</p>
        <div
          className={`flex flex-col ${
            reverse ? "lg:flex-row-reverse" : "lg:flex-row"
          } md:my-4`}
        >
          <Image
            src={image}
            placeholder="blur"
            alt="Illustration de garage"
            className="w-full lg:w-1/2 h-[300px] object-cover rounded-md my-4 md:my-0"
          />
          <div className="flex flex-col w-full lg:w-1/2 md:px-4 lg:justify-around">
            <p className="hidden lg:flex">{textOne}</p>
            <p>{textTwo}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
