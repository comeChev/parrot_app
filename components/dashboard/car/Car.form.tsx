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
  const [form, setForm] = useState({ values: carDB ?? defaultCar, errors: defaultErrors });
  const [car, setCar] = useState<FullCar>(carDB ?? defaultCar);
  const [errors, setErrors] = useState(defaultErrors);
  const [loading, setLoading] = useState(false);
  const [strengths, setStrengths] = useState<Strength[]>([]);

  const router = useRouter();

  // handle errors
  function isValidForm() {
    let temp: ErrorsProps = defaultErrors;
    const fuelValues = optionsFuel.map((oF) => oF.value);
    const gearValues = optionsGearbox.map((oG) => oG.value);

    temp.carName = new Validation(car.car_name).min(3).max(50).validate();
    temp.carPrice = new Validation(car.car_price).min(1).max(50).validate();
    temp.carKilometers = new Validation(car.car_kilometers).validate();
    temp.carFuel = new Validation(car.car_fuel).enum(fuelValues).validate();
    temp.carGearbox = new Validation(car.car_fuel).enum(gearValues).validate();
    temp.carCountry = new Validation(car.car_country).min(3).max(50).alpha().optional().validate();
    temp.carColor = new Validation(car.car_color).min(3).max(50).alpha().optional().validate();
    temp.carLength = new Validation(car.car_length).min(1).max(40).optional().validate();
    temp.carOwners = new Validation(car.car_owners).min(1).max(10).optional().validate();
    temp.carFiscalPower = new Validation(car.car_fiscal_power).min(1).max(300).optional().validate();
    temp.carHorsePower = new Validation(car.car_horse_power).min(1).max(2000).optional().validate();

    //checking errors
    return checkErrors(temp, () => {
      setErrors(temp);
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

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setCar({ ...car, [e.target.name]: e.target.value });
  }
  // function handleErrorsFocus(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
  //   setForms;
  // }

  useEffect(() => {
    async function fetchStrengths() {
      const res = await getStrengths();
      setStrengths(res);
    }
    fetchStrengths();
  }, []);

  return (
    <div className="relative select-none select-non">
      <Form imgSrc={carCreation} loading={loading}>
        {/* car name & status*/}

        <FormInput
          label="Titre de l'annonce"
          placeholder="Ex: Peugeot 308 SW"
          name="car_name"
          value={car.car_name}
          error={errors.carName}
          type="text"
          handleChange={handleChange}
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

        <div className="flex flex-col flex-wrap md:flex-row">
          <CarFormMain car={car} setCar={setCar} errors={errors} setErrors={setErrors} />
          <CarFormGallery car={car} setCar={setCar} handleAddImage={handleAddImage} />
        </div>

        <CarFormStrengths setCar={setCar} car={car} strengths={strengths} setStrengths={setStrengths} />

        <div className="flex flex-col flex-wrap md:flex-row md:gap-3">
          <CarFormAssets setCar={setCar} car={car} errors={errors} setErrors={setErrors} />
          <CarFormPower setCar={setCar} car={car} errors={errors} setErrors={setErrors} />
          <CarFormConsumption setCar={setCar} car={car} errors={errors} setErrors={setErrors} />
        </div>

        {car.car_messages && car.car_messages.length > 0 && <CarFormMessages car={car} setCar={setCar} />}

        <FormFooter
          isNew={carDB ? false : true}
          loading={loading}
          handleSubmit={handleSubmit}
          hrefBack="/dashboard/cars"
          hrefBackText="Retour aux annonces"
        />
      </Form>
    </div>
  );
}
