"use client";

import { Car_picture, Picture, Service_picture } from "@prisma/client";
import { useRef, useState } from "react";

import Image from "next/image";

type UiModalPictureProps = {
  setIsOpen: (isOpen: boolean) => void;
  carPicture?: Car_picture;
  picture?: Picture;
  servicePicture?: Service_picture;
};

export default function UiModalPicture({
  setIsOpen,
  picture,
  carPicture,
  servicePicture,
}: UiModalPictureProps) {
  const [imageRatio, setImageRatio] = useState(16 / 9);
  const [imageHeight, setImageHeight] = useState(200);
  const divRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  function calculateImageHeight() {
    if (!divRef.current?.clientWidth) return 200;
    if (!divRef.current?.clientHeight) return 200;

    if (imageHeight > divRef.current.clientWidth)
      return (divRef.current.clientHeight / 5) * 4;
    return divRef.current.clientWidth / imageRatio;
  }

  function calculateImageWidth() {
    if (!divRef.current?.clientWidth) return 400;
    if (!divRef.current?.clientHeight) return 400;

    if (imageHeight > divRef.current.clientWidth)
      return divRef.current.clientHeight / imageRatio;
    return (divRef.current.clientWidth / 5) * 4;
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex  flex-col justify-center items-center z-50"
      ref={divRef}
      onClick={() => setIsOpen(false)}
    >
      <Image
        src={
          (carPicture && carPicture.car_picture_image) ||
          (picture && picture.picture_image) ||
          (servicePicture && servicePicture.service_picture_image) ||
          ""
        }
        alt={
          (carPicture && carPicture.car_picture_name) ||
          (picture && picture.picture_name) ||
          (servicePicture && servicePicture.service_picture_name) ||
          "Image d'illustration"
        }
        height={calculateImageHeight()}
        width={calculateImageWidth()}
        className="object-cover transition-opacity opacity-0 duration-[1s]"
        style={{ width: "auto" }}
        onLoad={(image) => {
          image.currentTarget.classList.remove("opacity-0");
          textRef.current?.classList.remove("opacity-0");
          setImageRatio(
            image.currentTarget.naturalWidth / image.currentTarget.naturalHeight
          );
          setImageHeight(image.currentTarget.naturalHeight);
        }}
      />
      <p
        className="text-neutral-100 mt-2 w-4/5 text-center rounded-md transition-opacity opacity-0 duration-[1s]"
        ref={textRef}
      >
        {(picture && picture.picture_name) ||
          (carPicture && carPicture.car_picture_name) ||
          (servicePicture && servicePicture.service_picture_name)}
      </p>
    </div>
  );
}
