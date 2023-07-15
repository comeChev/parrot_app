import Link from "next/link";
import React from "react";
import { BsPlusSquare } from "react-icons/bs";

type CarsButtonAddCarProps = {
  label: string;
};

export default function CarsButtonAddCar({ label }: CarsButtonAddCarProps) {
  return (
    <Link href={"/dashboard/car"}>
      <BsPlusSquare className="text-4xl text-red-800 hover:text-red-900 lg:hidden" />
      <p className="hidden lg:inline bg-red-800 hover:bg-red-900 py-3 px-5 rounded-md text-neutral-100">
        {label}
      </p>
    </Link>
  );
}
