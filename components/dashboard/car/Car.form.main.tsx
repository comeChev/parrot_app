import FormBox from "@/components/ui/form/Form.box";
import FormInput from "@/components/ui/form/Form.input";
import { ErrorsProps } from "./Car.form";
import { FullCar } from "@/lib/cars";
import { BsCurrencyEuro } from "react-icons/bs";
import FormSelect from "@/components/ui/form/Form.select";

type CarFormMainProps = {
  car: FullCar;
  setCar: React.Dispatch<React.SetStateAction<FullCar>>;
  errors: ErrorsProps;
  setErrors: React.Dispatch<React.SetStateAction<ErrorsProps>>;
};

const optionsFuel: { value: string; label: string }[] = [
  { value: "", label: "-- Carburant --" },
  { value: "essence", label: "Essence" },
  { value: "diesel", label: "Diesel" },
  { value: "electrique", label: "Électrique" },
  { value: "hybride", label: "Hybride" },
  { value: "hybride-rechargeable", label: "Hybride rechargeable" },
  { value: "gpl", label: "GPL" },
];

const optionsGearbox: { value: string; label: string }[] = [
  { value: "", label: "-- Boîte de vitesse --" },
  { value: "manuelle", label: "Manuelle" },
  { value: "automatique", label: "Automatique" },
  { value: "semi-automatique", label: "Semi-automatique" },
];

export default function CarFormMain({
  car,
  setCar,
  errors,
  setErrors,
}: CarFormMainProps) {
  function getInputDate(date: Date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  return (
    <FormBox title="Points clés" defaultOpen={true}>
      {/* car price */}
      <div className="relative">
        <FormInput
          type="number"
          label="Prix de l'annonce"
          value={car.car_price as unknown as string}
          handleChange={(e) =>
            setCar({
              ...car,
              car_price: Number(e.target.value),
            })
          }
          name="carPrice"
          error={errors.carPrice}
          handleFocus={() => {
            setCar({ ...car, car_price: null as unknown as number });
            setErrors({ ...errors, carPrice: "" });
          }}
        />
        <BsCurrencyEuro className="absolute top-[46px] right-8 text-2xl text-gray-500" />
      </div>

      {/* car fuel */}
      <FormSelect
        options={optionsFuel}
        label="Carburant"
        value={car.car_fuel}
        handleChange={(e) =>
          setCar({ ...car, car_fuel: e.currentTarget.value })
        }
        handleFocus={() => {}}
        name="carFuel"
      />
      {/* car year */}
      <FormInput
        type="date"
        label="Année et mois de mise en circulation"
        value={getInputDate(new Date(car.car_year))}
        handleChange={(e) =>
          setCar({
            ...car,
            car_year: new Date(e.target.value),
          })
        }
        name="carYear"
        handleFocus={() => {}}
      />
      {/* car kilometers */}
      <FormInput
        type="number"
        label="Kilométrage"
        value={car.car_kilometers as unknown as string}
        handleChange={(e) =>
          setCar({
            ...car,
            car_kilometers: Number(e.target.value),
          })
        }
        name="carKilometers"
        error={errors.carKilometers}
        handleFocus={() => {
          setCar({ ...car, car_kilometers: null as unknown as number });
          setErrors({ ...errors, carKilometers: "" });
        }}
      />
      {/* car gearbox */}
      <FormSelect
        options={optionsGearbox}
        label="Boite de vitesse"
        value={car.car_gearbox}
        handleChange={(e) =>
          setCar({ ...car, car_gearbox: e.currentTarget.value })
        }
        handleFocus={() => {}}
        name="carGearbox"
      />
    </FormBox>
  );
}
