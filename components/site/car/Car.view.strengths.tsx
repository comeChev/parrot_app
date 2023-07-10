import { Strength } from "@prisma/client";
import React from "react";
import { MdFiberNew } from "react-icons/md";

type Props = {
  strengths: Strength[];
};

export default function CarViewStrengths({ strengths }: Props) {
  return (
    <div className="mt-10">
      <p className="font-semibold">Les points forts de ce véhicule :</p>
      <div className="flex flex-row flex-wrap mt-2">
        {strengths.map((s) => (
          <p>{s.strength_name}</p>
        ))}
        <div className="flex flex-col items-center">
          <MdFiberNew className="text-4xl" />
          <p className="text-xs">Annonce récente</p>
        </div>
      </div>
    </div>
  );
}
