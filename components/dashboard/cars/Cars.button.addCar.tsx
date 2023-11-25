import { BsPlusSquare } from "react-icons/bs";
import Link from "next/link";
import React from "react";

type CarsButtonAddCarProps = {
  label: string;
};

export default function CarsButtonAddCar({ label }: CarsButtonAddCarProps) {
  return (
    <Link href={"/dashboard/car"} aria-label={label}>
      <BsPlusSquare className="text-4xl text-red-800 hover:text-red-900 lg:hidden" />
      <p className="hidden px-5 py-3 bg-red-800 rounded-md lg:inline hover:bg-red-900 text-neutral-100">{label}</p>
    </Link>
  );
}
