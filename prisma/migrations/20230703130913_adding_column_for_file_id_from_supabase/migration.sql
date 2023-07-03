/*
  Warnings:

  - Added the required column `service_picture_fileKey` to the `Service_picture` table without a default value. This is not possible if the table is not empty.
  - Added the required column `picture_fileKey` to the `Picture` table without a default value. This is not possible if the table is not empty.
  - Added the required column `car_picture_fileKey` to the `Car_picture` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN "user_fileKey" TEXT;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Service_picture" (
    "service_picture_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "service_picture_name" TEXT NOT NULL,
    "service_picture_image" TEXT NOT NULL,
    "service_picture_fileKey" TEXT NOT NULL,
    "service_id" INTEGER NOT NULL,
    CONSTRAINT "Service_picture_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "Service" ("service_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Service_picture" ("service_id", "service_picture_id", "service_picture_image", "service_picture_name") SELECT "service_id", "service_picture_id", "service_picture_image", "service_picture_name" FROM "Service_picture";
DROP TABLE "Service_picture";
ALTER TABLE "new_Service_picture" RENAME TO "Service_picture";
CREATE TABLE "new_Picture" (
    "picture_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "picture_name" TEXT NOT NULL,
    "picture_image" TEXT NOT NULL,
    "picture_description" TEXT,
    "picture_published_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "picture_status" TEXT NOT NULL,
    "picture_fileKey" TEXT NOT NULL
);
INSERT INTO "new_Picture" ("picture_description", "picture_id", "picture_image", "picture_name", "picture_published_date", "picture_status") SELECT "picture_description", "picture_id", "picture_image", "picture_name", "picture_published_date", "picture_status" FROM "Picture";
DROP TABLE "Picture";
ALTER TABLE "new_Picture" RENAME TO "Picture";
CREATE TABLE "new_Car_picture" (
    "car_picture_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "car_picture_name" TEXT NOT NULL,
    "car_picture_image" TEXT NOT NULL,
    "car_picture_fileKey" TEXT NOT NULL,
    "car_id" INTEGER NOT NULL,
    CONSTRAINT "Car_picture_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "Car" ("car_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Car_picture" ("car_id", "car_picture_id", "car_picture_image", "car_picture_name") SELECT "car_id", "car_picture_id", "car_picture_image", "car_picture_name" FROM "Car_picture";
DROP TABLE "Car_picture";
ALTER TABLE "new_Car_picture" RENAME TO "Car_picture";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
