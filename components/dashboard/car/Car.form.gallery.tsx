"use client";

import FormBox from "@/components/ui/form/Form.box";
import FormDelete from "@/components/ui/form/Form.delete";
import FormFile, { ImageCreate } from "@/components/ui/form/Form.file";
import { FullCar, deleteCarPicture } from "@/lib/cars";
import { Car, Car_picture } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";

type CarFormGalleryProps = {
  handleAddImage: (image: ImageCreate, carId?: number) => Promise<{} | null>;
  car: FullCar;
  setCar: Dispatch<SetStateAction<FullCar>>;
};

export default function CarFormGallery({
  handleAddImage,
  car,
  setCar,
}: CarFormGalleryProps) {
  const router = useRouter();

  async function handleDelete(picture: Car_picture) {
    //optimistic delete
    const oldCar = car;
    setCar({
      ...car,
      car_pictures: car.car_pictures.filter(
        (p) => p.car_picture_id !== picture.car_picture_id
      ),
    });

    //delete picture on supabase & on db
    const response = await deleteCarPicture(
      picture.car_picture_id,
      picture.car_picture_fileKey
    );

    //on error, rollback
    if (!response) {
      setCar(oldCar);
      return;
    }
    router.refresh();
  }

  return (
    <FormBox title="Galerie de photos" defaultOpen={true}>
      {/* select photo */}
      <FormFile
        label="Sélectionner une photo"
        name="carPicture"
        onlinePath={`cars`}
        handleAddImage={handleAddImage}
      />
      {/* gallery */}
      <div className="flex flex-wrap">
        {car.car_pictures.map((picture) => (
          <div
            className="relative h-[150px] w-[150px] group m-1"
            key={picture.car_picture_id}
          >
            <Image
              priority
              src={picture.car_picture_image}
              width={150}
              height={150}
              alt={picture.car_picture_name}
              className="rounded-md opacity-0 duration-[1s] transition-opacity object-cover w-full h-full"
              onLoadingComplete={(image) => {
                image.classList.remove("opacity-0");
              }}
            />
            <div className="absolute left-1/2 -translate-x-1/2 transform bottom-2 hidden group-hover:flex">
              <FormDelete
                handleDelete={() => handleDelete(picture)}
                textConfirm="Suppression ?"
              />
            </div>
          </div>
        ))}
      </div>
    </FormBox>
  );
}
