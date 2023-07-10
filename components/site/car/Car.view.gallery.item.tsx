"use client";
import UiModalPicture from "@/components/ui/Ui.modal.picture";
import { Car_picture } from "@prisma/client";
import Image from "next/image";
import { useRef, useState } from "react";

type CarViewGalleryItemProps = {
  picture: Car_picture;
};

export default function CarViewGalleryItem({
  picture,
}: CarViewGalleryItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-1/2 h-[200px] md:h-[200px] md:w-[200px]  p-1 cursor-pointer border-2 hover:border-red-800 transition-colors duration-500">
      <Image
        src={picture.car_picture_image}
        key={picture.car_picture_id}
        alt={picture.car_picture_name}
        height={200}
        width={200}
        style={{ width: "auto" }}
        className="object-cover w-full h-full transition-opacity opacity-0 duration-[1s] "
        onClick={() => setIsOpen(true)}
        onLoadingComplete={(image) => {
          image.classList.remove("opacity-0");
        }}
      />
      {isOpen && <UiModalPicture carPicture={picture} setIsOpen={setIsOpen} />}
    </div>
  );
}
