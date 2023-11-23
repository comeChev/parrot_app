"use client";

import { Car_picture, Strength } from "@prisma/client";
import { FullCar, createCar, createCarPicture, updateCar } from "@/lib/cars";
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

const defaultErrors: ErrorsProps = {
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

const defaultCar: FullCar = {
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

export default function CarForm({ carDB }: CarFormProps) {
  const [car, setCar] = useState<FullCar>(carDB ? carDB : defaultCar);
  const [errors, setErrors] = useState(defaultErrors);
  const [loading, setLoading] = useState(false);
  const [strengths, setStrengths] = useState<Strength[]>([]);

  const router = useRouter();

  // handle errors
  function isValidForm() {
    let errorsTemp: ErrorsProps = defaultErrors;

    // car name validation
    if (car.car_name.trim().length < 3 || car.car_name.trim().length > 50) {
      errorsTemp = {
        ...errorsTemp,
        carName:
          "Le nom du véhicule doit contenir au moins 3 caractères et au maximum 50.",
      };
    }
    // car price validation
    if (car.car_price <= 0 || car.car_price > 1000000) {
      errorsTemp = {
        ...errorsTemp,
        carPrice:
          "Le prix du véhicule doit être compris entre 1 et 1 000 000 €",
      };
    }
    // car kilometers validation
    if (car.car_kilometers <= 0 || car.car_kilometers > 1000000) {
      errorsTemp = {
        ...errorsTemp,
        carKilometers:
          "Les kilomètres du compteur doivent être compris entre 1 et 1 000 000 kms",
      };
    }

    //car fuel validation
    if (car.car_fuel === "") {
      errorsTemp = {
        ...errorsTemp,
        carFuel: "Vous devez sélectionner un type de carburant.",
      };
    }
    //car gearbox validation
    if (car.car_gearbox === "") {
      errorsTemp = {
        ...errorsTemp,
        carGearbox: "Vous devez sélectionner le type de boite de vitesse.",
      };
    }
    // car country validation
    if (car.car_country !== null) {
      if (
        car.car_country.trim().length < 3 ||
        car.car_country.trim().length > 50
      ) {
        errorsTemp = {
          ...errorsTemp,
          carCountry:
            "Le pays d'origine du véhicule doit contenir au moins 3 caractères et au maximum 50.",
        };
      }
      if (car.car_country.match(/^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/) === null) {
        errorsTemp = {
          ...errorsTemp,
          carCountry:
            "e pays d'origine du véhicule doit contenir uniquement des lettres.",
        };
      }
    }
    // car color validation
    if (car.car_color !== null) {
      if (car.car_color.trim().length < 3 || car.car_color.trim().length > 50) {
        errorsTemp = {
          ...errorsTemp,
          carColor:
            "La couleur du véhicule doit contenir au moins 3 caractères et au maximum 50.",
        };
      }
      if (car.car_color.match(/^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/) === null) {
        errorsTemp = {
          ...errorsTemp,
          carColor:
            "La couleur du véhicule doit contenir uniquement des lettres.",
        };
      }
    }
    // car length validation
    if (car.car_length !== null) {
      if (car.car_length <= 0 || car.car_length > 40) {
        errorsTemp = {
          ...errorsTemp,
          carLength:
            "La longueur du véhicule doit être supérieure à 0m et inférieure à 40m",
        };
      }
    }
    // car owner validation
    if (car.car_owners !== null) {
      if (car.car_owners <= 0 || car.car_owners >= 10) {
        errorsTemp = {
          ...errorsTemp,
          carOwners:
            "Le nombre de propriétaires du véhicule doit être supérieur à 0 et ne peut être supérieur à 10",
        };
      }
    }

    //checking errors
    if (Object.values(errorsTemp).some((error) => error.length > 0)) {
      setErrors(errorsTemp);
      toast.error(
        "Veuillez corriger les erreurs avant de soumettre le formulaire."
      );
      return false;
    }
    return true;
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
        // TODO --> maybe implement a redirect to the cars page
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
                car_status: e.currentTarget.value as
                  | "ONLINE"
                  | "OFFLINE"
                  | "ARCHIVED",
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
          <CarFormMain
            car={car}
            setCar={setCar}
            errors={errors}
            setErrors={setErrors}
          />

          {/* gallery*/}
          <CarFormGallery
            car={car}
            setCar={setCar}
            handleAddImage={handleAddImage}
          />
        </div>

        {/* strengths */}

        <CarFormStrengths
          setCar={setCar}
          car={car}
          strengths={strengths}
          setStrengths={setStrengths}
        />

        <div className="flex flex-col md:flex-row flex-wrap">
          {/* car assets */}
          <CarFormAssets
            setCar={setCar}
            car={car}
            errors={errors}
            setErrors={setErrors}
          />
          {/* car power */}
          <CarFormPower
            setCar={setCar}
            car={car}
            errors={errors}
            setErrors={setErrors}
          />
          {/* car consumption */}
          <CarFormConsumption
            setCar={setCar}
            car={car}
            errors={errors}
            setErrors={setErrors}
          />
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
