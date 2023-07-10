import { Car_picture } from "@prisma/client";
import CarViewGalleryItem from "./Car.view.gallery.item";

type CarViewGalleryProps = {
  pictures: Car_picture[];
  carName: string;
};

export default function CarViewGallery({
  pictures,
  carName,
}: CarViewGalleryProps) {
  return (
    <div className="mt-16">
      <p className="text-xl">Galerie de photos</p>
      <p className="font-light text-neutral-500 text-sm">
        {carName.toUpperCase()}
      </p>
      <div className="flex flex-wrap mt-4 min-h-[200px] w-full">
        {pictures.map((picture) => (
          <CarViewGalleryItem key={picture.car_picture_id} picture={picture} />
        ))}
      </div>
    </div>
  );
}
