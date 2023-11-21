import { Car, Car_message, Car_picture, Car_strength } from "@prisma/client";
import { FullCar, createCarPicture } from "../cars";
import { createCarMessage, deleteCarMessages } from "./cars.message";
import { createCarStrength, deleteCarStrengths } from "./cars.strength";

import { deleteCarPictures } from "./cars.picture";
import { prisma } from "@/utils/prisma";

export async function getFullCars(): Promise<FullCar[]> {
  const carsDB: Car[] = await prisma.$queryRaw`SELECT * FROM "Car"`;
  const carsFullDB = carsDB.map(async (car) => {
    const messages: Car_message[] =
      await prisma.$queryRaw`SELECT * FROM "Car_message" WHERE "car_id" = ${car.car_id}`;
    const pictures: Car_picture[] =
      await prisma.$queryRaw`SELECT * FROM "Car_picture" WHERE "car_id" = ${car.car_id}`;
    const strengths: Car_strength[] =
      await prisma.$queryRaw`SELECT * FROM "Car_strength" WHERE "car_id" = ${car.car_id}`;

    return {
      ...car,
      car_messages: messages,
      car_pictures: pictures,
      car_strengths: strengths,
      car_status: car.car_status as "ONLINE" | "OFFLINE" | "ARCHIVED",
    };
  });
  const cars = await Promise.all(carsFullDB);
  return cars;
}

export async function addNewCar(car: FullCar) {
  const { car_messages, car_pictures, car_strengths, ...carData } = car;

  try {
    const newCar: Car[] = await prisma.$queryRaw`INSERT INTO "Car" (car_name,
        car_price,
        car_fuel,
        car_year,
        car_kilometers,
        car_gearbox,
        car_status,
        car_country,
        car_technical_control,
        car_first_hand,
        car_owners,
        car_color,
        car_doors,
        car_seats,
        car_length,
        car_boot,
        car_fiscal_power,
        car_horse_power,
        car_eu_rule,
        car_critair,
        car_consumption,
        car_carbon_release,
        car_conversion_bonus) VALUES (${carData.car_name},${carData.car_price}, ${carData.car_fuel}, ${carData.car_year}::timestamp, ${carData.car_kilometers}, ${carData.car_gearbox}, ${carData.car_status}, ${carData.car_country}::text, ${carData.car_technical_control}::boolean, ${carData.car_first_hand}::boolean, ${carData.car_owners}::int, ${carData.car_color}::text, ${carData.car_doors}::int, ${carData.car_seats}::int, ${carData.car_length}::real, ${carData.car_boot}::text, ${carData.car_fiscal_power}::int, ${carData.car_horse_power}::int, ${carData.car_eu_rule}::text, ${carData.car_critair}::text, ${carData.car_consumption}, ${carData.car_carbon_release}::real, ${carData.car_conversion_bonus}::boolean) RETURNING *`;

    const car_id = newCar[0].car_id;
    let createdCar: FullCar = {
      ...newCar[0],
      car_status: newCar[0].car_status as "ONLINE" | "OFFLINE" | "ARCHIVED",
      car_messages: [],
      car_pictures: [],
      car_strengths: [],
    };
    if (!car_id) throw new Error("Erreur lors de la création de la voiture");
    if (car_messages.length > 0) {
      const addedMessages = car_messages.map(async (message) => {
        const messageCreated = await createCarMessage(message, car_id);
        return messageCreated;
      });
      const createdMessages = await Promise.all(addedMessages);
      createdCar = { ...createdCar, car_messages: createdMessages };
    }
    if (car_pictures.length > 0) {
      const addedPictures = car_pictures.map(async (picture) => {
        const pictureCreated: Car_picture = await createCarPicture(
          car_id,
          picture
        );
        return pictureCreated;
      });
      const pictureAdded = await Promise.all(addedPictures);
      createdCar = { ...createdCar, car_pictures: pictureAdded };
    }
    if (car_strengths.length > 0) {
      const addedStrengths = car_strengths.map(async (s) => {
        const strength = await createCarStrength(car_id, s);
        return strength;
      });
      const createdStrengths = await Promise.all(addedStrengths);
      createdCar = { ...createdCar, car_strengths: createdStrengths };
    }

    return createdCar;
  } catch (e: any) {
    console.log(e);
  }
}

export async function updateCar(car: FullCar) {
  const { car_messages, car_pictures, car_strengths, ...carData } = car;

  try {
    const car: Car[] = await prisma.$queryRaw`UPDATE "Car" 
      SET car_name = ${carData.car_name}, car_price = ${carData.car_price}, car_fuel = ${carData.car_fuel}, car_year = ${carData.car_year}::timestamp, car_kilometers = ${carData.car_kilometers}, car_gearbox = ${carData.car_gearbox}, car_status = ${carData.car_status}, car_country = ${carData.car_country}, car_technical_control = ${carData.car_technical_control}, car_first_hand = ${carData.car_first_hand},  car_owners = ${carData.car_owners}, car_color = ${carData.car_color}, car_doors = ${carData.car_doors}, car_seats = ${carData.car_seats}, car_length = ${carData.car_length}, car_boot = ${carData.car_boot}, car_fiscal_power = ${carData.car_fiscal_power}, car_horse_power = ${carData.car_horse_power}, car_eu_rule = ${carData.car_eu_rule}, car_critair = ${carData.car_critair}, car_consumption = ${carData.car_consumption}, car_carbon_release = ${carData.car_carbon_release}, car_conversion_bonus = ${carData.car_conversion_bonus} 
      WHERE car_id = ${carData.car_id} 
      RETURNING * `;

    const car_id = car[0].car_id;
    if (!car_id) throw new Error("Erreur lors de la création de la voiture");

    let updatedCar: FullCar = {
      ...car[0],
      car_status: car[0].car_status as "ONLINE" | "OFFLINE" | "ARCHIVED",
      car_messages: [],
      car_pictures: [],
      car_strengths: [],
    };

    if (car_messages.length > 0) {
      //delete messages
      await deleteCarMessages(car_id);
      // recreate messages
      const createdCarMessages = car_messages.map(async (message) => {
        const messageCreated = await createCarMessage(message, car_id);
        return messageCreated;
      });
      const createdMessages = await Promise.all(createdCarMessages);
      updatedCar = { ...updatedCar, car_messages: createdMessages };
    }
    if (car_pictures.length > 0) {
      //delete pictures
      await deleteCarPictures(car_id);
      const addedPictures = car_pictures.map(async (picture) => {
        const pictureCreated: Car_picture = await createCarPicture(
          car_id,
          picture
        );
        return pictureCreated;
      });
      const pictureAdded = await Promise.all(addedPictures);
      updatedCar = { ...updatedCar, car_pictures: pictureAdded };
    }
    if (car_strengths.length > 0) {
      //delete strengths
      await deleteCarStrengths(car_id);

      const addedStrengths = car_strengths.map(async (s) => {
        const strength = await createCarStrength(car_id, s);
        return strength;
      });
      const createdStrengths = await Promise.all(addedStrengths);
      updatedCar = { ...updatedCar, car_strengths: createdStrengths };
    }

    return updatedCar;
  } catch (e: any) {
    console.log(e);
  }
}

export async function deleteCar(carId: number) {
  const car: Car[] =
    await prisma.$queryRaw`DELETE FROM "Car" WHERE car_id = ${carId} RETURNING *`;
  return car[0];
}
