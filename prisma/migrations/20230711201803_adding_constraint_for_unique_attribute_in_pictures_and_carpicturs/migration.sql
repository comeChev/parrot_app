/*
  Warnings:

  - A unique constraint covering the columns `[car_picture_fileKey]` on the table `Car_picture` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[picture_fileKey]` on the table `Picture` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Car_picture_car_picture_fileKey_key" ON "Car_picture"("car_picture_fileKey");

-- CreateIndex
CREATE UNIQUE INDEX "Picture_picture_fileKey_key" ON "Picture"("picture_fileKey");
