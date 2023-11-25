"use client";

import Image from "next/image";
import { Picture } from "@prisma/client";
import UiModalPicture from "@/components/ui/Ui.modal.picture";
import { useState } from "react";

export default function GalleryPicturesItem({ picture }: { picture: Picture }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-full h-full p-1 transition-colors duration-500 border-2 cursor-pointer hover:border-red-800">
      <Image
        src={picture.picture_image}
        alt={picture.picture_name}
        fill
        sizes="(min-width: 1540px) 740px, (min-width: 1280px) 612px, (min-width: 1040px) 484px, (min-width: 780px) 356px, (min-width: 680px) 292px, calc(47.22vw - 20px)"
        placeholder="blur"
        blurDataURL={"/blur.png"}
        onClick={() => setIsOpen(true)}
        className="object-cover w-full h-full rounded-md"
      />
      {isOpen && <UiModalPicture picture={picture} setIsOpen={setIsOpen} />}
    </div>
  );
}
