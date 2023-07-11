"use client";

import { FullCar } from "@/lib/cars";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { BsSearch, BsXLg } from "react-icons/bs";

type CarsSearchBarProps = {
  placeholder: string;
  carsDB: FullCar[];
  setCars: Dispatch<SetStateAction<FullCar[]>>;
};

export default function CarsSearchBar({
  placeholder,
  carsDB,
  setCars,
}: CarsSearchBarProps) {
  const [search, setSearch] = useState("");

  function handleSearchCar(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

  function handleReset() {
    setSearch("");
    setCars(carsDB);
  }

  function searchCar() {
    const newCars = carsDB.filter((car) => {
      return (
        car.car_name.toLowerCase().includes(search.toLowerCase()) ||
        car.car_id.toString().includes(search) ||
        car.car_price.toString().includes(search) ||
        car.car_status.toLowerCase().includes(search.toLowerCase()) ||
        car.car_country?.toLowerCase().includes(search.toLowerCase())
      );
    });
    setCars(newCars);
  }

  useEffect(() => {
    searchCar();
  }, [search]);

  return (
    <div className="flex-1">
      <div className="bg-slate-200 text-neutral-700 flex items-center rounded-md border-2 border-slate-300 relative flex-1">
        <BsSearch className="ml-4 mr-1 absolute top-3 left-0" />
        <input
          type="text"
          name="search"
          placeholder={placeholder}
          onChange={handleSearchCar}
          value={search}
          className="bg-slate-200 flex-1 py-2 px-10 rounded-md"
        />
        {search !== "" && (
          <BsXLg
            onClick={handleReset}
            className="mr-4 ml-1 absolute top-3 right-0 cursor-pointer"
          />
        )}
      </div>
    </div>
  );
}
