import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import React from "react";
import { BiSolidChevronRight } from "react-icons/bi";

type HomeServicesItemProps = {
  imageSrc: StaticImageData;
  text: string;
  title: string;
  url: string;
};

export default function HomeServicesItem({
  imageSrc,
  text,
  title,
  url,
}: HomeServicesItemProps) {
  return (
    <div className="border-0 border-y-2 border-red-800 flex-1">
      <Image
        src={imageSrc}
        alt={`illustration de ${title}`}
        className=" h-[200px] w-full object-cover"
      />
      <div className="pt-6 flex flex-col justify-between pb-7 md:h-[300px] lg:h-[250px]">
        <div className="flex-1 mb-4">
          <h4 className="text-lg font-semibold mb-2">{title}</h4>
          <p className="font-light text-base text-neutral-700">{text}</p>
        </div>
        <Link
          href={url}
          className="flex items-center space-x-3 border-b-2 border-transparent hover:underline underline-offset-2 text-red-800"
        >
          <span className="text-base font-light text-red-800">
            Découvrir nos services
          </span>
          <BiSolidChevronRight className="text-xl text-red-800" />
        </Link>
      </div>
    </div>
  );
}