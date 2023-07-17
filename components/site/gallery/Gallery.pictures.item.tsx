"use client";

import UiModalPicture from "@/components/ui/Ui.modal.picture";
import { Picture } from "@prisma/client";
import Image from "next/image";
import { useState } from "react";

export default function GalleryPicturesItem({ picture }: { picture: Picture }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full h-full relative p-1 cursor-pointer border-2 hover:border-red-800 transition-colors duration-500">
      <Image
        src={picture.picture_image}
        alt={picture.picture_name}
        width={300}
        height={300}
        placeholder="blur"
        blurDataURL={"/public/blur.png"}
        onClick={() => setIsOpen(true)}
        className="h-full w-full object-cover rounded-md"
      />
      {isOpen && <UiModalPicture picture={picture} setIsOpen={setIsOpen} />}
    </div>
  );
}
