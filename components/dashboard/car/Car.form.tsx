"use client";

import { Car_picture, Strength } from "@prisma/client";
import { ErrorsProps, defaultCar, defaultErrors, optionsFuel, optionsGearbox } from "@/utils/form/car";
import { FullCar, createCar, createCarPicture, updateCar } from "@/lib/cars";
import { Validation, checkErrors } from "@/utils/form/validation";
import { useEffect, useState } from "react";

import CarFormAssets from "./Car.form.assets";
import CarFormConsumption from "./Car.form.consumption";
import CarFormGallery from "./Car.form.gallery";
import CarFormMain from "./Car.form.main";
import CarFormMessages from "./Car.form.messages";
import CarFormPower from "./Car.form.power";
import CarFormStrengths from "./Car.form.strengths";
import Form from "@/components/ui/form/Form";
import FormFooter from "@/components/ui/form/Form.footer";
import FormInput from "@/components/ui/form/Form.input";
import FormSelect from "@/components/ui/form/Form.select";
import { ImageCreate } from "@/components/ui/form/Form.file";
import carCreation from "@/assets/dashboard/carCreation.jpg";
import { getStrengths } from "@/lib/strengths";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type CarFormProps = {
  carDB?: FullCar;
};

export default function CarForm({ carDB }: CarFormProps) {
  const [car, setCar] = useState<FullCar>(carDB ?? defaultCar);
  const [errors, setErrors] = useState(defaultErrors);
  const [loading, setLoading] = useState(false);
  const [strengths, setStrengths] = useState<Strength[]>([]);

  const router = useRouter();

  // handle errors
  function isValidForm() {
    let errorsTemp: ErrorsProps = defaultErrors;
    const fuelValues = optionsFuel.map((oF) => oF.value);
    const gearValues = optionsGearbox.map((oG) => oG.value);

    const carName = new Validation(car.car_name).min(3).max(4);
    const carPrice = new Validation(car.car_price).min(1).max(50);
    const carKilometers = new Validation(car.car_kilometers);
    const carFuel = new Validation(car.car_fuel).enum(fuelValues);
    const carGearbox = new Validation(car.car_fuel).enum(gearValues);
    const carCountry = new Validation(car.car_country).min(3).max(50).alpha().optional();
    const carColor = new Validation(car.car_color).min(3).max(50).alpha().optional();
    const carLength = new Validation(car.car_length).min(1).max(40).optional();
    const carOwners = new Validation(car.car_owners).min(1).max(10).optional();
    const carFP = new Validation(car.car_fiscal_power).min(1).max(300).optional();
    const carHP = new Validation(car.car_horse_power).min(1).max(2000).optional();

    errorsTemp = {
      ...errorsTemp,
      carName: carName.validate(),
      carPrice: carPrice.validate(),
      carKilometers: carKilometers.validate(),
      carFuel: carFuel.validate(),
      carGearbox: carGearbox.validate(),
      carCountry: carCountry.validate(),
      carColor: carColor.validate(),
      carLength: carLength.validate(),
      carOwners: carOwners.validate(),
      carFiscalPower: carFP.validate(),
      carHorsePower: carHP.validate(),
    };

    //checking errors
    return checkErrors(errorsTemp, () => {
      setErrors(errorsTemp);
    });
  }

  async function handleSubmit() {
    if (!isValidForm()) return;

    setLoading(true);

    // if car already exists, update it
    if (carDB) {
      const carToUpdate = { ...car, car_published_date: new Date() };
      const response = await updateCar(carDB.car_id, carToUpdate);
      if (response) {
        setLoading(false);
        toast.success("Votre véhicule a bien été mis à jour.");
        router.push(`/dashboard/cars`);
        return;
      }
      return;
    }

    // if car doesn't exist, create it
    const { car_id, car_published_date, ...newCar } = car;
    newCar.car_pictures.map((picture) => delete (picture as any).car_id);

    const response = await createCar(newCar);
    if (!response) {
      setLoading(false);
      toast.error("Une erreur est survenue. Veuillez réessayer plus tard");
      return;
    }
    // if car created, create pictures
    if (car.car_pictures.length > 0) {
      car.car_pictures.forEach(async (picture) => {
        const res = await createCarPicture(response.car_id, picture);
        if (!res) {
          setLoading(false);
          toast.error("Une erreur est survenue. Veuillez réessayer plus tard");
          return;
        }
      });
    }
    setTimeout(() => {
      setLoading(false);
      toast.success("Le véhicule a bien été créé.");
      setCar(defaultCar);
      router.push(`/dashboard/cars?id=${response.car_id}`);
      return;
    }, 1000);
  }

  async function handleAddImage(image: ImageCreate) {
    const newPicture: Omit<Car_picture, "car_picture_id"> = {
      car_picture_name: image.picture_name,
      car_picture_fileKey: image.picture_fileKey,
      car_picture_image: image.picture_image,
      car_id: car.car_id,
    };

    if (carDB) {
      const res = await createCarPicture(car.car_id, newPicture);
      if (res) {
        setCar({ ...car, car_pictures: [...car.car_pictures, res] });
        return res;
      }
      return null;
    }

    setCar({
      ...car,
      car_pictures: [...car.car_pictures, newPicture as Car_picture],
    });
    return true;
  }

  useEffect(() => {
    async function fetchStrengths() {
      const res = await getStrengths();
      setStrengths(res);
    }
    fetchStrengths();
  }, []);

  return (
    <div className="select-non relative select-none">
      <Form imgSrc={carCreation} loading={loading}>
        {/* car name & status*/}

        <FormInput
          label="Titre de l'annonce"
          placeholder="Ex: Peugeot 308 SW"
          name="carName"
          value={car.car_name}
          error={errors.carName}
          type="text"
          handleChange={(e) =>
            setCar({
              ...car,
              car_name: e.target.value.toUpperCase(),
            })
          }
          handleFocus={(e) => setErrors({ ...errors, carName: "" })}
        />

        <div className="flex items-center w-full sm:w-48">
          <FormSelect
            name="carStatus"
            label="État"
            value={car.car_status}
            handleChange={(e) =>
              setCar({
                ...car,
                car_status: e.currentTarget.value as "ONLINE" | "OFFLINE" | "ARCHIVED",
              })
            }
            handleFocus={() => {}}
            options={[
              { value: "ONLINE", label: "En ligne" },
              { value: "OFFLINE", label: "Hors ligne" },
              { value: "ARCHIVED", label: "Archivé" },
            ]}
          />
          <div
            className={`h-5 w-5 rounded-full ml-2 ${
              car.car_status === "ONLINE"
                ? "bg-green-500"
                : car.car_status === "OFFLINE"
                ? "bg-red-500"
                : "bg-amber-500"
            }`}
          />
        </div>

        {/* main Infos & gallery */}
        <div className="flex flex-col md:flex-row flex-wrap">
          {/* main infos */}
          <CarFormMain car={car} setCar={setCar} errors={errors} setErrors={setErrors} />

          {/* gallery*/}
          <CarFormGallery car={car} setCar={setCar} handleAddImage={handleAddImage} />
        </div>

        {/* strengths */}

        <CarFormStrengths setCar={setCar} car={car} strengths={strengths} setStrengths={setStrengths} />

        <div className="flex flex-col md:flex-row md:gap-3 flex-wrap">
          {/* car assets */}
          <CarFormAssets setCar={setCar} car={car} errors={errors} setErrors={setErrors} />
          {/* car power */}
          <CarFormPower setCar={setCar} car={car} errors={errors} setErrors={setErrors} />
          {/* car consumption */}
          <CarFormConsumption setCar={setCar} car={car} errors={errors} setErrors={setErrors} />
        </div>

        {/* car messages */}
        {car.car_messages && car.car_messages.length > 0 && (
          <div className="">
            <CarFormMessages car={car} setCar={setCar} />
          </div>
        )}
        {/* sticky footer */}
        <FormFooter
          isNew={carDB ? false : true}
          loading={loading}
          handleSubmit={handleSubmit}
          hrefBack="/dashboard/cars"
          hrefBackText="Retour aux annonces"
        />
      </Form>
      {/* <pre>{JSON.stringify(car, null, 2)}</pre> */}
    </div>
  );
}
