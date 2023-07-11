import FormBox from "@/components/ui/form/Form.box";
import FormInput from "@/components/ui/form/Form.input";
import { FullCar } from "@/lib/cars";
import { Dispatch, SetStateAction } from "react";
import { ErrorsProps } from "./Car.form";
import FormSelect from "@/components/ui/form/Form.select";

type CarFormAssetsProps = {
  setCar: Dispatch<SetStateAction<FullCar>>;
  car: FullCar;
  errors: ErrorsProps;
  setErrors: Dispatch<SetStateAction<ErrorsProps>>;
};

export default function CarFormAssets({
  setCar,
  car,
  errors,
  setErrors,
}: CarFormAssetsProps) {
  return (
    <FormBox title="Caractéristiques du véhicule">
      {/* car country */}
      <FormInput
        required={false}
        type="text"
        label="Provenance (pays)"
        placeholder="Provenance"
        value={car.car_country ? car.car_country : ""}
        handleChange={(e) =>
          setCar({
            ...car,
            car_country: e.target.value.toUpperCase(),
          })
        }
        name="carCountry"
        error={errors.carCountry}
        handleFocus={() => setErrors({ ...errors, carPrice: "" })}
      />
      {/* carControl */}
      <FormSelect
        required={false}
        options={[
          { value: "", label: "-- Contrôle technique --" },
          { value: "true", label: "Requis" },
          { value: "false", label: "Non requis" },
        ]}
        label="Contrôle technique"
        value={
          car.car_technical_control === null
            ? ""
            : car.car_technical_control === true
            ? "true"
            : "false"
        }
        handleChange={(e) =>
          setCar({
            ...car,
            car_technical_control:
              e.currentTarget.value === "true" ? true : false,
          })
        }
        handleFocus={() => {}}
        name="carControl"
      />
      {/* carFirstHand */}
      <FormSelect
        required={false}
        options={[
          { value: "", label: "-- Première main --" },
          { value: "true", label: "Oui" },
          { value: "false", label: "Non" },
        ]}
        label="Première main"
        value={
          car.car_first_hand === null
            ? ""
            : car.car_first_hand === true
            ? "true"
            : "false"
        }
        handleChange={(e) =>
          setCar({
            ...car,
            car_first_hand: e.currentTarget.value === "true" ? true : false,
          })
        }
        handleFocus={() => {}}
        name="carFirstHand"
      />
      {/* carOwners */}
      <FormInput
        required={false}
        type="number"
        label="Nombre de propriétaires"
        value={car.car_owners ? car.car_owners : ""}
        handleChange={(e) =>
          setCar({
            ...car,
            car_owners: e.target.value === null ? null : Number(e.target.value),
          })
        }
        name="carOwners"
        error={errors.carOwners}
        handleFocus={() => setErrors({ ...errors, carOwners: "" })}
      />
      {/* car color */}
      <FormInput
        required={false}
        type="text"
        label="Couleur"
        placeholder="Noir laqué"
        value={car.car_color ? car.car_color : ""}
        handleChange={(e) =>
          setCar({
            ...car,
            car_color: e.target.value,
          })
        }
        name="carColor"
        error={errors.carColor}
        handleFocus={() => setErrors({ ...errors, carColor: "" })}
      />
      {/* carDoors */}
      <FormSelect
        required={false}
        options={[
          { value: "", label: "-- Nombre de portes --" },
          { value: 1, label: 1 },
          { value: 2, label: 2 },
          { value: 3, label: 3 },
          { value: 4, label: 4 },
          { value: 5, label: 5 },
        ]}
        label="Nombre de portes"
        value={car.car_doors === null ? "" : car.car_doors}
        handleChange={(e) =>
          setCar({
            ...car,
            car_doors:
              e.currentTarget.value !== ""
                ? Number(e.currentTarget.value)
                : null,
          })
        }
        handleFocus={() => {}}
        name="carDoors"
      />
      {/* car seats */}
      <FormSelect
        required={false}
        options={[
          { value: "", label: "-- Nombre de places --" },
          { value: 1, label: 1 },
          { value: 2, label: 2 },
          { value: 3, label: 3 },
          { value: 4, label: 4 },
          { value: 5, label: 5 },
          { value: 6, label: 6 },
          { value: 7, label: 7 },
          { value: 8, label: 8 },
        ]}
        label="Nombre de place"
        value={car.car_seats === null ? "" : car.car_seats}
        handleChange={(e) =>
          setCar({
            ...car,
            car_seats:
              e.currentTarget.value !== ""
                ? Number(e.currentTarget.value)
                : null,
          })
        }
        handleFocus={() => {}}
        name="carDoors"
      />
      {/* car length */}
      <FormInput
        required={false}
        type="number"
        label="Longueur du véhicule"
        placeholder="Longueur em mètres (ex: 4.5)"
        value={car.car_length ? car.car_length : ""}
        handleChange={(e) =>
          setCar({
            ...car,
            car_length: e.target.value === "" ? null : Number(e.target.value),
          })
        }
        name="carLength"
        handleFocus={() => {
          setErrors({ ...errors, carLength: "" });
        }}
        error={errors.carLength}
      />
      {/* car boot */}
      <FormInput
        required={false}
        type="number"
        label="Volume de coffre"
        placeholder="Volume en L (ex: 190)"
        value={car.car_boot ? car.car_boot : ""}
        handleChange={(e) =>
          setCar({
            ...car,
            car_boot: e.target.value === "" ? null : e.target.value,
          })
        }
        name="carBoot"
        handleFocus={() => {}}
      />
    </FormBox>
  );
}
