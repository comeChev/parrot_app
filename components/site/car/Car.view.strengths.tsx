import { MdFiberNew } from "react-icons/md";
import React from "react";
import { Strength } from "@prisma/client";

type Props = {
  strengths: Strength[];
};

export default function CarViewStrengths({ strengths }: Props) {
  return (
    <div className="mt-10">
      <p className="font-semibold">Les points forts de ce véhicule :</p>
      <div className="flex flex-row flex-wrap mt-2 gap-4 items-center">
        {strengths.map((s) => (
          <p className="text-xs py-2 px-3 bg-red-900 text-gray-100 font-semibold rounded-full">
            {s.strength_name}
          </p>
        ))}

        <p className="text-xs py-2 px-3 bg-red-900 text-gray-100 font-semibold rounded-full">
          Annonce récente
        </p>
      </div>
    </div>
  );
}
