"use client";

import { BsSearch, BsXLg } from "react-icons/bs";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { FullCar } from "@/lib/cars";

type CarsSearchBarProps = {
  placeholder: string;
  carsDB: FullCar[];
  setCars: Dispatch<SetStateAction<FullCar[]>>;
};

export default function CarsSearchBar({ placeholder, carsDB, setCars }: CarsSearchBarProps) {
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
      <div className="relative flex items-center flex-1 border-2 rounded-md bg-slate-200 text-neutral-700 border-slate-300">
        <BsSearch className="absolute left-0 ml-4 mr-1 top-3" />
        <input
          type="text"
          name="search"
          placeholder={placeholder}
          onChange={handleSearchCar}
          value={search}
          className="flex-1 px-10 py-2 bg-gray-200 rounded-md"
        />
        {search !== "" && (
          <BsXLg
            onClick={handleReset}
            aria-label="Effacer la recherche"
            className="absolute right-0 ml-1 mr-4 cursor-pointer top-3"
          />
        )}
      </div>
    </div>
  );
}
