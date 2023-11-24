import { FullCar } from "@/lib/cars";

export const defaultCar: FullCar = {
  car_id: 0,
  car_name: "",
  car_price: 0,
  car_fuel: "",
  car_year: new Date(new Date().getFullYear() + "-01-01"),
  car_kilometers: 0,
  car_gearbox: "",
  car_published_date: new Date(),
  car_status: "OFFLINE",
  car_country: null,
  car_technical_control: null,
  car_first_hand: null,
  car_owners: null,
  car_color: null,
  car_doors: null,
  car_seats: null,
  car_length: null,
  car_boot: null,
  car_fiscal_power: null,
  car_horse_power: null,
  car_eu_rule: null,
  car_critair: null,
  car_consumption: null,
  car_carbon_release: null,
  car_conversion_bonus: null,
  car_messages: [],
  car_pictures: [],
  car_strengths: [],
};

export const optionsFuel: { value: string; label: string }[] = [
  { value: "essence", label: "Essence" },
  { value: "diesel", label: "Diesel" },
  { value: "electrique", label: "Électrique" },
  { value: "hybride", label: "Hybride" },
  { value: "hybride-rechargeable", label: "Hybride rechargeable" },
  { value: "gpl", label: "GPL" },
];

export const optionsGearbox: { value: string; label: string }[] = [
  { value: "manuelle", label: "Manuelle" },
  { value: "automatique", label: "Automatique" },
  { value: "semi-automatique", label: "Semi-automatique" },
];

export const defaultErrors: ErrorsProps = {
  carName: "",
  carPrice: "",
  carKilometers: "",
  carCountry: "",
  carColor: "",
  carLength: "",
  carFiscalPower: "",
  carHorsePower: "",
  carOwners: "",
  carFuel: "",
  carGearbox: "",
};

export type ErrorsProps = {
  carName: string;
  carFuel: string;
  carGearbox: string;
  carPrice: string;
  carKilometers: string;
  carCountry: string;
  carColor: string;
  carLength: string;
  carFiscalPower: string;
  carHorsePower: string;
  carOwners: string;
};
