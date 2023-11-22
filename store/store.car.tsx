"use client";

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

import { PublicCar } from "@/lib/cars";

type CarContextType = {
  car: PublicCar;
  setCar: Dispatch<SetStateAction<CarContextType["car"]>>;
};

const defaultCar: CarContextType["car"] = {
  car_id: 0,
  car_name: "",
  car_boot: "",
  car_color: "",
  car_price: 0,
  car_carbon_release: null,
  car_consumption: null,
  car_conversion_bonus: null,
  car_country: null,
  car_critair: null,
  car_doors: null,
  car_eu_rule: null,
  car_first_hand: null,
  car_fiscal_power: null,
  car_fuel: "",
  car_gearbox: "",
  car_horse_power: null,
  car_pictures: [],
  car_strengths: [],
  car_kilometers: 0,
  car_length: null,
  car_owners: null,
  car_published_date: new Date(),
  car_seats: null,
  car_status: "ONLINE",
  car_technical_control: null,
  car_year: new Date(),
};

export const CarContext = createContext<CarContextType>({
  car: defaultCar,
  setCar: () => {},
});

const StoreCar = ({ children }: { children: ReactNode }) => {
  const [car, setCar] = useState<CarContextType["car"]>(defaultCar);

  return (
    <CarContext.Provider value={{ car, setCar }}>
      {children}
    </CarContext.Provider>
  );
};

export default StoreCar;
