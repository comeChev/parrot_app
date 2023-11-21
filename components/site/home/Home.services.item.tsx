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
    <div className="border-0 border-y-2 border-red-800 flex-1 m-3">
      <div className="h-[200px] w-full relative">
        <Image
          src={imageSrc}
          alt={`illustration de ${title}`}
          sizes="(min-width: 1540px) 477px, (min-width: 1280px) 392px, (min-width: 1040px) 307px, (min-width: 780px) 221px, (min-width: 680px) 584px, calc(94.44vw - 39px)"
          fill
          className="h-full w-full object-cover"
        />
      </div>
      <div className="pt-6 flex flex-col justify-between pb-7">
        <div className="mb-4">
          <h4 className="text-lg font-semibold mb-2">{title}</h4>
          <p className="font-light text-base text-neutral-700 overflow-clip">
            {text}
          </p>
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
