import { getConsumption, getFiscalPower, getKilometers, getPrice, getUpperCaseFirstLetter } from "@/utils/globals";

import { BsFillTelephoneFill } from "react-icons/bs";
import CarViewAssets from "./Car.view.assets";
import CarViewGallery from "./Car.view.gallery";
import CarViewProperty from "./Car.view.property";
import CarViewStrengths from "./Car.view.strengths";
import Image from "next/image";
import { MdMail } from "react-icons/md";
import { PublicCar } from "@/lib/cars";
import UiButtonAction from "@/components/ui/Ui.button.action";
import UiTextPublished from "@/components/ui/Ui.text.published";
import noImage from "@/assets/no-image-available.jpg";

type CarViewProps = {
  car: PublicCar;
};

export default function CarView({ car }: CarViewProps) {
  return (
    <div className="w-full min-h-screen">
      {/* image & main assets */}
      <div className="flex flex-col w-full lg:flex-row">
        <div className="relative flex-1">
          <Image
            src={car.car_pictures[0] ? car.car_pictures[0].car_picture_image : noImage}
            height={404}
            width={640}
            alt={`Image de la voiture ${car.car_name}`}
            className="object-cover w-full"
          />
        </div>
        <div className="flex-1 mt-5 md:mt-0 md:px-4">
          {/* published moment */}
          <UiTextPublished publishedDate={car.car_published_date} />
          {/* car name */}
          <h3 className="text-3xl font-extrabold">{car.car_name.toUpperCase()}</h3>
          {/* assets */}
          <CarViewAssets
            kilometers={car.car_kilometers}
            year={new Date(car.car_year).getUTCFullYear()}
            gearbox={car.car_gearbox}
            fuel={car.car_fuel}
          />
          {/* price */}
          <div className="py-4 text-center">
            <h3 className="text-4xl font-extrabold">{getPrice(car.car_price)}</h3>
          </div>
          {/* Action buttons */}
          <div className="flex flex-wrap">
            <UiButtonAction text="Appelez-nous" type="link" href="tel:061234567" Icon={BsFillTelephoneFill} />
            <UiButtonAction text="Laissez-nous un message" type="link" href="#message" Icon={MdMail} />
          </div>
          <CarViewStrengths strengths={car.car_strengths} />
        </div>
      </div>

      {/* general infos */}
      <div className="mt-16">
        <p className="text-xl">Informations générales</p>
        <p className="text-sm font-light text-gray-600">{car.car_name.toUpperCase()}</p>

        <div className="flex flex-row flex-wrap justify-between mt-4">
          {/* Characteristics */}
          <div className="my-4">
            <p className="text-xl">Caractéristiques</p>
            <CarViewProperty value={new Date(car.car_year).getFullYear()} text="Année" />
            <CarViewProperty value={car.car_country} text="Provenance" />
            <CarViewProperty value={new Date(car.car_year).toLocaleDateString("fr-FR")} text="Mise en circulation" />
            <CarViewProperty text="Contrôle technique" value={car.car_technical_control ? "Requis" : "Non requis"} />
            <CarViewProperty text="Première main" value={car.car_first_hand ? "Oui" : "Non"} />
            <CarViewProperty text="Nombre de propriétaires" value={car.car_owners} />
            <CarViewProperty text="Kilométrage compteur" value={getKilometers(car.car_kilometers)} />

            <CarViewProperty text="Energie" value={getUpperCaseFirstLetter(car.car_fuel)} />
            <CarViewProperty text="Boite de vitesse" value={getUpperCaseFirstLetter(car.car_gearbox)} />
            <CarViewProperty text="Couleur" value={getUpperCaseFirstLetter(car.car_color)} />
            <CarViewProperty text="Nombre de portes" value={car.car_doors} />
            <CarViewProperty text="Nombre de places" value={car.car_seats} />
            <CarViewProperty text="Longueur" value={car.car_length} />
            <CarViewProperty text="Volume de coffre" value={car.car_boot} />
          </div>

          {/* Power */}
          <div className="my-4">
            <p className="text-xl">Puissance du véhicule</p>
            <CarViewProperty value={getFiscalPower(car.car_fiscal_power, "CV")} text="Puissance fiscale" />
            <CarViewProperty value={getFiscalPower(car.car_horse_power, "ch")} text="Puissances" />
          </div>

          {/* Consumption */}
          <div className="my-4">
            <p className="text-xl">Consommation</p>
            <CarViewProperty text="Norme euro" value={car.car_eu_rule} />
            <CarViewProperty text="Crit'Air" value={car.car_critair} />
            <CarViewProperty text="Consommation mixte" value={getConsumption(car.car_consumption, "fuel")} />
            <CarViewProperty text="Consommation mixte" value={getConsumption(car.car_carbon_release, "carbon")} />
            <CarViewProperty text="Prime à la conversion" value={car.car_conversion_bonus ? "Oui" : "Non"} />
          </div>
        </div>
      </div>

      {/* Gallery */}
      <CarViewGallery pictures={car.car_pictures} carName={car.car_name} />
    </div>
  );
}
