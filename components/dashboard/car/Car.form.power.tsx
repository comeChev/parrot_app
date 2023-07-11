import FormBox from "@/components/ui/form/Form.box";
import FormInput from "@/components/ui/form/Form.input";
import { ErrorsProps } from "./Car.form";
import { FullCar } from "@/lib/cars";

type CarFormPowerProps = {
  setCar: React.Dispatch<React.SetStateAction<FullCar>>;
  car: FullCar;
  errors: ErrorsProps;
  setErrors: React.Dispatch<React.SetStateAction<ErrorsProps>>;
};

export default function CarFormPower({
  car,
  setCar,
  errors,
  setErrors,
}: CarFormPowerProps) {
  return (
    <FormBox title="Puissance fiscale">
      {/* carFiscalPower */}
      <FormInput
        required={false}
        type="number"
        label="Puissance fiscale (CV)"
        placeholder="Puissance fiscale (CV)"
        value={car.car_fiscal_power ? car.car_fiscal_power : ""}
        handleChange={(e) =>
          setCar({
            ...car,
            car_fiscal_power:
              e.target.value === null ? null : Number(e.target.value),
          })
        }
        name="carFiscalPower"
        error={errors.carFiscalPower}
        handleFocus={() => setErrors({ ...errors, carFiscalPower: "" })}
      />

      {/* carHorsePower */}
      <FormInput
        required={false}
        type="number"
        label="Puissance (ch)"
        placeholder="Puissance en chevaux (ch)"
        value={car.car_horse_power ? car.car_horse_power : ""}
        handleChange={(e) =>
          setCar({
            ...car,
            car_horse_power:
              e.target.value === null ? null : Number(e.target.value),
          })
        }
        name="carFiscalPower"
        error={errors.carHorsePower}
        handleFocus={() => setErrors({ ...errors, carHorsePower: "" })}
      />
    </FormBox>
  );
}
