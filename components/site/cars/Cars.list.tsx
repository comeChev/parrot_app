"use client";

import { FullCar } from "@/lib/cars";
import { useState } from "react";
import CarsListItem from "./Cars.list.item";
import UiPagination from "@/components/ui/Ui.pagination";
import CarsFilterForm from "./Cars.filter.form";

export default function CarsList({ carsDB }: { carsDB: FullCar[] }) {
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [page, setPage] = useState(1);
  const [cars, setCars] = useState(carsDB);

  function handleResetCars() {
    setCars(carsDB);
    setPage(1);
  }

  return (
    <div className="container mx-auto mb-[100px]">
      <div className="flex flex-col md:flex-row md:justify-between">
        <CarsFilterForm
          cars={cars}
          handleResetCars={handleResetCars}
          setCars={setCars}
          setPage={setPage}
          carsDB={carsDB}
        />

        {/* cars list & pagination */}
        <div className="">
          {/* Cars list */}
          <div
            className="grid grid-flow-row grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            id="carsList"
          >
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
            />
          </div>
        </div>
      </div>
    </div>
  );
}
