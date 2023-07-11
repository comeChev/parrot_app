"use client";

import { FullCar } from "@/lib/cars";
import { useEffect, useRef, useState } from "react";
import CarsSearchBar from "./Cars.searchBar";
import CarsButtonAddCar from "./Cars.button.addCar";
import CarsTable from "./Cars.table";
import CarsTableHeader from "./Cars.table.header";
import CarsTableBody from "./Cars.table.body";
import UiPagination from "@/components/ui/Ui.pagination";

type CarsListProps = {
  carsDB: FullCar[];
};

export default function CarsList({ carsDB }: CarsListProps) {
  const [cars, setCars] = useState(carsDB);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [carsToShow, setCarsToShow] = useState(cars.slice(0, limit));
  const listCars = useRef<HTMLDivElement>(null);

  function scrollToCarsList() {
    listCars.current?.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    setCarsToShow(cars.slice((page - 1) * limit, page * limit));
  }, [cars, page]);

  return (
    <div className="mb-20">
      {/* search & add button */}
      <div className="flex items-center space-x-5 mt-10">
        <CarsSearchBar
          placeholder="Rechercher un véhicule"
          carsDB={carsDB}
          setCars={setCars}
        />
        <CarsButtonAddCar label="Ajouter un véhicule" />
      </div>
      <p className="px-2 mt-1 mb-10 text-sm italic text-neutral-600">
        {cars.length <= 1
          ? `${cars.length} résultats`
          : `${cars.length} résultats`}
      </p>

      {/* table */}
      <CarsTable reference={listCars}>
        <CarsTableHeader />
        <CarsTableBody cars={carsToShow} setCars={setCars} />
      </CarsTable>

      {/* pagination */}
      <UiPagination
        page={page}
        setPage={setPage}
        length={cars.length}
        itemsPerPage={limit}
        scrollTo={scrollToCarsList}
      />
    </div>
  );
}
