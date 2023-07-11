"use client";

import FormDelete from "@/components/ui/form/Form.delete";
import { FullCar, deleteCar } from "@/lib/cars";
import { deleteFile } from "@/utils/supabase.upload";
import { useRouter } from "next/navigation";

export default function CarDelete({ car }: { car: FullCar }) {
  const router = useRouter();

  async function handleDelete() {
    if (!car) return;
    ///delete all images from supabase
    car.car_pictures.map(async (p) => {
      const res = await deleteFile(p.car_picture_fileKey);
      if (!res) return;
    });
    //delete car from db
    const carDeleted = await deleteCar(car.car_id);
    if (!carDeleted) return;
    //redirect to cars page
    router.push("/dashboard/cars");
  }

  return (
    <div className="flex">
      <FormDelete
        textConfirm="Vous aller supprimer l'annonce !"
        handleDelete={handleDelete}
      />
    </div>
  );
}
