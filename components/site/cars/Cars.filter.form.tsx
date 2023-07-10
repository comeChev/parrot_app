"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { BsFilterCircle, BsFilterCircleFill } from "react-icons/bs";
import CarsFilterFormSelect from "./Cars.filter.form.select";
import CarsFilterFormSlider from "./Cars.filter.form.slider";
import { PublicCar } from "@/lib/cars";
import { useRouter } from "next/navigation";

export type FiltersProps = {
  fuel: string;
  brand: string;
  kilometers: { min: number; max: number };
  price: { min: number; max: number };
  year: { min: number; max: number };
};

type CarsFilterFormProps = {
  cars: PublicCar[];
  carsDB: PublicCar[];
  setCars: Dispatch<SetStateAction<PublicCar[]>>;
  handleResetCars: () => void;
  setPage: Dispatch<SetStateAction<number>>;
};

export default function CarsFilterForm({
  cars,
  handleResetCars,
  setCars,
  setPage,
  carsDB,
}: CarsFilterFormProps) {
  const [filteredCars, setFilteredCars] = useState<PublicCar[]>([...cars]);
  const [filters, setFilters] = useState(calculateDefaultFilters(cars));
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  function getTextResults() {
    if (filteredCars.length > 0) {
      return filteredCars.length === 1
        ? "Afficher 1 véhicule"
        : `Afficher ${filteredCars.length} véhicules`;
    }
    return "Aucun véhicule";
  }

  function calculateDefaultFilters(cars: PublicCar[]) {
    const kilometers = Array.from(
      new Set(cars.map((car) => car.car_kilometers))
    );
    const years = Array.from(
      new Set(cars.map((car) => new Date(car.car_year).getFullYear()))
    );
    const prices = Array.from(new Set(cars.map((car) => car.car_price)));

    return {
      fuel: "",
      brand: "",
      kilometers: {
        min: Math.min(...kilometers),
        max: Math.max(...kilometers),
      },
      year: { min: Math.min(...years), max: Math.max(...years) },
      price: { min: Math.min(...prices), max: Math.max(...prices) },
    };
  }

  function setKilometers(value: number, min: boolean) {
    if (min) {
      setFilters({
        ...filters,
        kilometers: {
          ...filters.kilometers,
          min: value,
        },
      });
      handleFilterCars(value, "kmin");
    } else {
      setFilters({
        ...filters,
        kilometers: {
          ...filters.kilometers,
          max: value,
        },
      });
      handleFilterCars(value, "kmax");
    }
  }

  function setPrice(value: number, min: boolean) {
    if (min) {
      setFilters({
        ...filters,
        price: {
          ...filters.price,
          min: value,
        },
      });
      handleFilterCars(value, "pmin");
    } else {
      setFilters({
        ...filters,
        price: {
          ...filters.price,
          max: value,
        },
      });
      handleFilterCars(value, "pmax");
    }
  }

  function setYear(value: number, min: boolean) {
    if (min) {
      setFilters({
        ...filters,
        year: {
          ...filters.year,
          min: value,
        },
      });
      handleFilterCars(value, "ymin");
    } else {
      setFilters({
        ...filters,
        year: {
          ...filters.year,
          max: value,
        },
      });
      handleFilterCars(value, "ymax");
    }
  }

  function handleReset() {
    setPage(1);
    setCars(carsDB);
    setFilteredCars(carsDB);
    setFilters(calculateDefaultFilters(carsDB));
  }

  /**
   * @description Filter cars by kilometers, price and year
   * @param valuetype "f" | "k" | "p" | "y" + "min" | "max"
   */
  function handleFilterCars(
    value: number | string,
    valuetype: "f" | "kmin" | "pmin" | "ymin" | "kmax" | "pmax" | "ymax"
  ) {
    const vKmin =
      valuetype === "kmin" ? (value as number) : filters.kilometers.min;
    const vKmax =
      valuetype === "kmax" ? (value as number) : filters.kilometers.max;
    const vPmin = valuetype === "pmin" ? (value as number) : filters.price.min;
    const vPmax = valuetype === "pmax" ? (value as number) : filters.price.max;
    const vYmin = valuetype === "ymin" ? (value as number) : filters.year.min;
    const vYmax = valuetype === "ymax" ? (value as number) : filters.year.max;
    const vF = valuetype === "f" ? (value as string) : filters.fuel;

    const newFilteredCars = cars.filter((car) => {
      return (
        car.car_kilometers >= vKmin &&
        car.car_kilometers <= vKmax &&
        car.car_price >= vPmin &&
        car.car_price <= vPmax &&
        new Date(car.car_year).getFullYear() >= vYmin &&
        new Date(car.car_year).getFullYear() <= vYmax
      );
    });

    const finalFilteredCars = newFilteredCars.filter((car) => {
      if (vF !== "") {
        return car.car_fuel === vF;
      }
      return car;
    });

    setFilteredCars(finalFilteredCars);
  }

  return (
    <div className="mx-4 md:w-[300px] lg:w-[400px] py-4">
      {/* open filters */}
      <div
        aria-label={
          isOpen
            ? "Filtrer les voitures - Fermer"
            : "Filtrer les voitures - Ouvrir"
        }
        typeof="button"
        className="flex items-center justify-between p-4  bg-red-800 rounded-lg text-neutral-100  text-lg cursor-pointer w-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        <p className="flex-1">
          {isOpen ? "Sélectionnez vos filtres" : "Filtrer"}
        </p>
        {isOpen ? (
          <BsFilterCircleFill className="text-3xl" />
        ) : (
          <BsFilterCircle className="text-3xl" />
        )}
      </div>

      {/* filters */}
      {isOpen && (
        <div className="min-h-[500px] bg-neutral-700 mt-5 mb-12 rounded-lg py-10">
          {/* filter by fuel */}
          <CarsFilterFormSelect
            label="Type de carburant"
            subLabel="Choisir le type de carburant"
            defaultOptionLabel="-- Tous les types de carburant --"
            options={[
              { label: "Essence", value: "essence" },
              { label: "Diesel", value: "diesel" },
              { label: "Électrique", value: "electric" },
              { label: "Hybride", value: "hybrid" },
            ]}
            name="fuel"
            onChange={(e) => {
              setFilters({ ...filters, fuel: e.currentTarget.value });
              handleFilterCars(e.currentTarget.value, "f");
            }}
            value={filters.fuel}
          />

          {/* filter by kilometers */}
          <CarsFilterFormSlider
            name="kilometers"
            label="Kilométrage"
            values={filters.kilometers}
            setValue={setKilometers}
            handleResetCars={handleResetCars}
            typeData="kilometers"
            step={1000}
          />

          {/* filter by year */}
          <CarsFilterFormSlider
            name="constructYear"
            label="Année de construction"
            values={filters.year}
            setValue={setYear}
            handleResetCars={handleResetCars}
            typeData="year"
            step={1}
          />

          {/* filter by price */}
          <CarsFilterFormSlider
            name="carPrices"
            label="Prix"
            values={filters.price}
            setValue={setPrice}
            handleResetCars={handleResetCars}
            typeData="currency"
            step={100}
          />
          <div className="flex flex-col px-4">
            <button
              className="mb-3 px-4 py-2 rounded-lg bg-red-800 text-neutral-100 font-semibold hover:bg-red-900 transition-all duration-300 ease-in-out disabled:opacity-50 disabled:hover:bg-red-800"
              disabled={
                filteredCars.length === 0 || filteredCars.length === cars.length
              }
              onClick={() => {
                setCars(filteredCars);
                setPage(1);
                router.push("/cars#carsList", { scroll: true });
              }}
            >
              {getTextResults()}
            </button>
            {carsDB.length !== filteredCars.length && (
              <button
                onClick={handleReset}
                className={`mb-3 px-4 py-2 rounded-lg bg-red-800 text-neutral-100 font-semibold hover:bg-red-900 transition-all duration-300 ease-in-out`}
              >
                Réinitialiser
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
