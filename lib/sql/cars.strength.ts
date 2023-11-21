import { Car_strength } from "@prisma/client";
import { prisma } from "@/utils/prisma";

export async function createCarStrength(
  carId: number,
  strength: Omit<Car_strength, "car_id">
) {
  const createdStrength: Car_strength[] =
    await prisma.$queryRaw`INSERT INTO "Car_strength" (
        strength_name, strength_id, car_id
    ) VALUES (${strength.strength_name}, ${strength.strength_id}, ${carId}) RETURNING *`;
  return createdStrength[0];
}

export async function deleteCarStrengths(carId: number) {
  const deletedStrengths: Car_strength[] =
    await prisma.$queryRaw`DELETE FROM "Car_strength" WHERE car_id = ${carId} RETURNING *`;

  return deletedStrengths;
}
