"use client";

import { useRef, useState } from "react";

import { Car_picture } from "@prisma/client";
import Image from "next/image";
import UiModalPicture from "@/components/ui/Ui.modal.picture";

type CarViewGalleryItemProps = {
  picture: Car_picture;
};

export default function CarViewGalleryItem({
  picture,
}: CarViewGalleryItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-1/2 h-[200px] md:h-[200px] md:w-[200px] p-1 cursor-pointer border-2 hover:border-red-800 transition-colors duration-500 ">
      <div className="w-full h-full relative">
        <Image
          src={picture.car_picture_image}
          key={picture.car_picture_id}
          alt={picture.car_picture_name}
          fill
          sizes="(min-width: 780px) 188px, (min-width: 680px) 292px, calc(47.22vw - 20px)"
          className="object-cover w-full h-full transition-opacity opacity-0 duration-[1s] "
          onClick={() => setIsOpen(true)}
          onLoad={(image) => {
            image.currentTarget.classList.remove("opacity-0");
          }}
        />
      </div>
      {isOpen && <UiModalPicture carPicture={picture} setIsOpen={setIsOpen} />}
    </div>
  );
}
