import { Car_picture } from "@prisma/client";
import { prisma } from "@/utils/prisma";

export async function createCarPicture(picture: Car_picture, carId: number) {
  const createdPicture: Car_picture[] =
    await prisma.$queryRaw`INSERT INTO "Car_picture" (
        car_picture_name, car_picture_image, car_picture_fileKey, car_id
    ) VALUES (${picture.car_picture_name}, ${picture.car_picture_image}, ${picture.car_picture_fileKey}, ${carId}) RETURNING *`;
  return createdPicture[0];
}

export async function deleteCarPictures(carId: number) {
  const deletedPictures: Car_picture[] =
    await prisma.$queryRaw`DELETE FROM "Car_picture" WHERE car_id = ${carId} RETURNING *`;

  return deletedPictures;
}
