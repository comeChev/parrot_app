"use client";

import { useRef, useState } from "react";

import CarsFilterForm from "./Cars.filter.form";
import CarsListItem from "./Cars.list.item";
import { PublicCar } from "@/lib/cars";
import UiPagination from "@/components/ui/Ui.pagination";

export default function CarsList({ carsDB }: { carsDB: PublicCar[] }) {
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [page, setPage] = useState(1);
  const [cars, setCars] = useState(carsDB);
  const listCars = useRef<HTMLDivElement>(null);

  function handleResetCars() {
    setCars(carsDB);
    setPage(1);
  }

  function scrollToCarsList() {
    listCars.current?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="container mx-auto mb-[100px]">
      <div className="flex flex-col md:flex-row ">
        <CarsFilterForm
          cars={cars}
          handleResetCars={handleResetCars}
          setCars={setCars}
          setPage={setPage}
          carsDB={carsDB}
        />

        {/* cars list & pagination */}
        <div className="w-full">
          {/* Cars list */}
          <div className="flex flex-col" id="carsList" ref={listCars}>
            {cars &&
              cars.length > 0 &&
              cars
                .slice(itemsPerPage * (page - 1), itemsPerPage * page)
                .map((car) => <CarsListItem key={car.car_id} car={car} />)}
          </div>

          {/* Pagination */}
          <div className="max-w-[700px] mx-auto ">
            <UiPagination
              page={page}
              setPage={setPage}
              length={cars.length}
              itemsPerPage={itemsPerPage}
              scrollTo={scrollToCarsList}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
