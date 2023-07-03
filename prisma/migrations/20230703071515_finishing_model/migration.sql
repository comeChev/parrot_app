-- CreateTable
CREATE TABLE "Hour" (
    "hour_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "hour_day" TEXT NOT NULL,
    "hour_morning_status" TEXT NOT NULL,
    "hour_morning_opening" DATETIME NOT NULL,
    "hour_morning_closing" DATETIME NOT NULL,
    "hour_afternoon_status" TEXT NOT NULL,
    "hour_afternoon_opening" DATETIME NOT NULL,
    "hour_afternoon_closing" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Picture" (
    "picture_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "picture_name" TEXT NOT NULL,
    "picture_image" TEXT NOT NULL,
    "picture_description" TEXT,
    "picture_published_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "picture_status" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Category" (
    "category_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "category_name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Service" (
    "service_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "service_title" TEXT NOT NULL,
    "service_paragraph_one" TEXT NOT NULL,
    "service_paragraph_two" TEXT NOT NULL,
    "service_end_sentence" TEXT NOT NULL,
    "service_published_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "service_status" TEXT NOT NULL,
    "category_id" INTEGER NOT NULL,
    CONSTRAINT "Service_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category" ("category_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Service_picture" (
    "service_picture_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "service_picture_name" TEXT NOT NULL,
    "service_picture_image" TEXT NOT NULL,
    "service_id" INTEGER NOT NULL,
    CONSTRAINT "Service_picture_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "Service" ("service_id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Message" (
    "message_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "message_contact_first_name" TEXT NOT NULL,
    "message_contact_last_name" TEXT NOT NULL,
    "message_contact_email" TEXT NOT NULL,
    "message_contact_phone" TEXT,
    "message_content" TEXT NOT NULL,
    "message_published_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "message_status" TEXT NOT NULL,
    "message_response" TEXT,
    "message_response_type" TEXT,
    "message_response_date" DATETIME
);

-- CreateTable
CREATE TABLE "Review" (
    "review_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "review_user_first_name" TEXT NOT NULL,
    "review_user_last_name" TEXT NOT NULL,
    "review_user_email" TEXT NOT NULL,
    "review_comment" TEXT NOT NULL,
    "review_note" INTEGER NOT NULL,
    "review_published_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "review_status" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Strength" (
    "strength_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "strength_name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Car" (
    "car_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "car_name" TEXT NOT NULL,
    "car_price" REAL NOT NULL,
    "car_fuel" TEXT NOT NULL,
    "car_year" DATETIME NOT NULL,
    "car_kilometers" INTEGER NOT NULL,
    "car_gearbox" TEXT NOT NULL,
    "car_published_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "car_status" TEXT NOT NULL,
    "car_country" TEXT,
    "car_technical_control" BOOLEAN,
    "car_first_hand" BOOLEAN,
    "car_owners" INTEGER,
    "car_color" TEXT,
    "car_doors" INTEGER,
    "car_seats" INTEGER,
    "car_length" REAL,
    "car_boot" TEXT,
    "car_fiscal_power" INTEGER,
    "car_horse_power" INTEGER,
    "car_eu_rule" TEXT,
    "car_critair" TEXT,
    "car_consumption" REAL,
    "car_carbon_release" REAL,
    "car_conversion_bonus" BOOLEAN
);

-- CreateTable
CREATE TABLE "Car_picture" (
    "car_picture_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "car_picture_name" TEXT NOT NULL,
    "car_picture_image" TEXT NOT NULL,
    "car_id" INTEGER NOT NULL,
    CONSTRAINT "Car_picture_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "Car" ("car_id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Car_message" (
    "car_message_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "car_message_contact_first_name" TEXT NOT NULL,
    "car_message_contact_last_name" TEXT NOT NULL,
    "car_message_contact_email" TEXT NOT NULL,
    "car_message_contact_phone" TEXT,
    "car_message_content" TEXT NOT NULL,
    "car_message_published_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "car_message_status" TEXT NOT NULL,
    "car_message_response" TEXT,
    "car_message_response_type" TEXT,
    "car_message_response_date" DATETIME,
    "car_id" INTEGER NOT NULL,
    CONSTRAINT "Car_message_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "Car" ("car_id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Car_strength" (
    "strength_name" TEXT NOT NULL,
    "strength_id" INTEGER NOT NULL,
    "car_id" INTEGER NOT NULL,

    PRIMARY KEY ("car_id", "strength_id"),
    CONSTRAINT "Car_strength_strength_id_fkey" FOREIGN KEY ("strength_id") REFERENCES "Strength" ("strength_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Car_strength_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "Car" ("car_id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Hour_hour_day_key" ON "Hour"("hour_day");
