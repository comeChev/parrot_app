import { ErrorsProps, optionsFuel, optionsGearbox } from "@/utils/form/car";

import { BsCurrencyEuro } from "react-icons/bs";
import FormBox from "@/components/ui/form/Form.box";
import FormInput from "@/components/ui/form/Form.input";
import FormSelect from "@/components/ui/form/Form.select";
import { FullCar } from "@/lib/cars";

type CarFormMainProps = {
  car: FullCar;
  setCar: React.Dispatch<React.SetStateAction<FullCar>>;
  errors: ErrorsProps;
  setErrors: React.Dispatch<React.SetStateAction<ErrorsProps>>;
};

export default function CarFormMain({ car, setCar, errors, setErrors }: CarFormMainProps) {
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
        options={[{ value: "", label: "-- Carburant --" }, ...optionsFuel]}
        label="Carburant"
        value={car.car_fuel}
        handleChange={(e) => setCar({ ...car, car_fuel: e.currentTarget.value })}
        handleFocus={() => {
          setErrors({ ...errors, carFuel: "" });
        }}
        error={errors.carFuel}
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
        options={[{ value: "", label: "-- Boîte de vitesse --" }, ...optionsGearbox]}
        label="Boite de vitesse"
        value={car.car_gearbox}
        handleChange={(e) => setCar({ ...car, car_gearbox: e.currentTarget.value })}
        handleFocus={() => {
          setErrors({ ...errors, carGearbox: "" });
        }}
        error={errors.carGearbox}
        name="carGearbox"
      />
    </FormBox>
  );
}
