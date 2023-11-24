import { ErrorsProps } from "@/utils/form/car";
import FormBox from "@/components/ui/form/Form.box";
import FormInput from "@/components/ui/form/Form.input";
import FormSelect from "@/components/ui/form/Form.select";
import { FullCar } from "@/lib/cars";

type CarFormConsumptionProps = {
  setCar: React.Dispatch<React.SetStateAction<FullCar>>;
  car: FullCar;
  errors: ErrorsProps;
  setErrors: React.Dispatch<React.SetStateAction<ErrorsProps>>;
};
export default function CarFormConsumption({ car, setCar, errors, setErrors }: CarFormConsumptionProps) {
  return (
    <FormBox title="Consommation">
      {/* car euro norme */}
      <FormSelect
        required={false}
        options={[
          { value: "", label: "-- Norme européenne --" },
          { value: "EURO1", label: "EURO1" },
          { value: "EURO2", label: "EURO2" },
          { value: "EURO3", label: "EURO3" },
          { value: "EURO4", label: "EURO4" },
          { value: "EURO5", label: "EURO5" },
          { value: "EURO6", label: "EURO6" },
        ]}
        label="Norme européenne"
        value={car.car_eu_rule ?? ""}
        handleChange={(e) =>
          setCar({
            ...car,
            car_eu_rule: e.currentTarget.value ?? "",
          })
        }
        handleFocus={() => {}}
        name="carEuroRule"
      />

      {/* car critair*/}
      <FormSelect
        required={false}
        options={[
          { value: "", label: "-- Crit'Air --" },
          { value: "ELECTRIQUE", label: "Électrique" },
          { value: "CRITAIR1", label: "Crit'Air 1" },
          { value: "CRITAIR2", label: "Crit'Air 2" },
          { value: "CRITAIR3", label: "Crit'Air 3" },
          { value: "CRITAIR4", label: "Crit'Air 4" },
          { value: "CRITAIR5", label: "Crit'Air 5" },
        ]}
        label="Crit'Air"
        value={car.car_critair === null ? "" : car.car_critair}
        handleChange={(e) =>
          setCar({
            ...car,
            car_critair: e.currentTarget.value === "" ? null : e.currentTarget.value,
          })
        }
        handleFocus={() => {}}
        name="carEuroRule"
      />

      {/* car consumption*/}
      <FormInput
        required={false}
        type="number"
        label="Consommation mixte"
        placeholder="18 L/100km"
        value={car.car_consumption ? car.car_consumption : ""}
        handleChange={(e) =>
          setCar({
            ...car,
            car_consumption: e.target.value === null ? null : Number(e.target.value),
          })
        }
        name="carConsumption"
        handleFocus={() => {}}
      />

      {/* car carbon*/}
      <FormInput
        required={false}
        type="number"
        label="Emission de CO2"
        placeholder="100 g/km"
        value={car.car_carbon_release ? car.car_carbon_release : ""}
        handleChange={(e) =>
          setCar({
            ...car,
            car_carbon_release: e.target.value === null ? null : Number(e.target.value),
          })
        }
        name="carCarbonRelease"
        handleFocus={() => {}}
      />

      {/* car bonus*/}
      <FormSelect
        required={false}
        options={[
          { value: "", label: "-- Prime à la conversion --" },
          { value: "true", label: "Exigible" },
          { value: "false", label: "Non exigible" },
        ]}
        label="Prime à la conversion"
        value={car.car_conversion_bonus === null ? "" : car.car_conversion_bonus === true ? "true" : "false"}
        handleChange={(e) =>
          setCar({
            ...car,
            car_conversion_bonus: e.currentTarget.value === "" ? null : e.currentTarget.value === "true" ? true : false,
          })
        }
        handleFocus={() => {}}
        name="carEuroRule"
      />
    </FormBox>
  );
}
