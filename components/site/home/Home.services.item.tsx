import Image, { StaticImageData } from "next/image";

import { BiSolidChevronRight } from "react-icons/bi";
import Link from "next/link";
import React from "react";

type HomeServicesItemProps = {
  imageSrc: StaticImageData | string;
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
    <div className="border-0 border-y-2 border-red-800 bg-gray-50 flex-1 m-3 hover:scale-105 transition-all duration-500 shadow-xl">
      <div className="h-[200px] w-full relative">
        <Image
          src={imageSrc}
          alt={`illustration de ${title}`}
          sizes="(min-width: 1540px) 477px, (min-width: 1280px) 392px, (min-width: 1040px) 307px, (min-width: 780px) 221px, (min-width: 680px) 584px, calc(94.44vw - 39px)"
          fill
          className="h-full w-full object-cover"
        />
      </div>
      <div className="pt-6 flex flex-col pb-7 h-[300px] px-5">
        <h3 className="text-lg font-semibold mb-2 font-subtitle">{title}</h3>
        <div className="flex-1 font-light text-base text-neutral-700">
          <p className="line-clamp-3 leading-relaxed">{text}</p>
        </div>

        <Link
          href={url}
          className="flex items-center space-x-3 border-b-2 border-transparent hover:underline underline-offset-2 text-red-800"
        >
          <span className="text-base font-light font-title text-red-800">
            Découvrir nos services
          </span>
          <BiSolidChevronRight className="text-xl text-red-800" />
        </Link>
      </div>
    </div>
  );
}
