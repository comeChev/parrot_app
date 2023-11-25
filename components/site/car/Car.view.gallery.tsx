"use client";

import { Car_picture } from "@prisma/client";
import Image from "next/image";
import noImage from "@/assets/no-image-available.jpg";
import { useState } from "react";

type CarViewGalleryProps = {
  pictures: Car_picture[];
  carName: string;
};

export default function CarViewGallery({ pictures, carName }: CarViewGalleryProps) {
  const [activePicture, setActivePicture] = useState(pictures[0] || null);
  const picturesDB = [...pictures];

  return (
    <div className="mt-16">
      <p className="text-xl">Galerie de photos</p>
      <p className="text-sm font-light text-gray-600">{carName.toUpperCase()}</p>
      <div className="flex-1 relative md:w-1/2 md:h-[400px] mt-4">
        <Image
          src={activePicture ? activePicture.car_picture_image : noImage}
          height={404}
          width={640}
          alt={`Image de la voiture ${activePicture?.car_picture_name}`}
          className="object-cover w-full rounded-md md:h-full"
        />
      </div>
      <div className="w-full overflow-hidden md:w-1/2">
        <div className="flex py-4 mt-8 w-full h-[150px] overflow-hidden overflow-x-auto gap-2">
          {picturesDB.map((picture) => (
            <div
              key={picture.car_picture_id}
              className={`h-[100px] w-[100px] p-1 cursor-pointer border-2 transition-colors duration-500 ${
                activePicture && picture.car_picture_id === activePicture.car_picture_id
                  ? "border-red-800"
                  : "hover:border-red-800 opacity-50 hover:opacity-90"
              }`}
            >
              <div className={`h-[90px] w-[90px] relative`}>
                <Image
                  src={picture.car_picture_image}
                  key={picture.car_picture_id}
                  alt={picture.car_picture_name}
                  fill
                  sizes="90px"
                  className="object-cover w-full h-full transition-all duration-[1s]"
                  onClick={() => setActivePicture(picture)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
