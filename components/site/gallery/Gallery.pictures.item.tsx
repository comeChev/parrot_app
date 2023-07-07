import { Picture } from "@prisma/client";
import Image from "next/image";

export default function GalleryPicturesItem({ picture }: { picture: Picture }) {
  return (
    <Image
      src={picture.picture_image}
      alt={picture.picture_name}
      width={300}
      height={300}
      className="h-full w-full object-cover rounded-md"
    />
  );
}
