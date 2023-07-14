-- CreateTable
CREATE TABLE "User" (
    "user_id" SERIAL NOT NULL,
    "user_first_name" TEXT NOT NULL,
    "user_last_name" TEXT NOT NULL,
    "user_email" TEXT NOT NULL,
    "user_password" TEXT NOT NULL,
    "user_role" TEXT NOT NULL,
    "user_status" TEXT NOT NULL,
    "user_image" TEXT,
    "user_fileKey" TEXT,
    "user_gender" TEXT,
    "user_job" TEXT,
    "user_arrival" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Hour" (
    "hour_id" SERIAL NOT NULL,
    "hour_day" TEXT NOT NULL,
    "hour_morning_status" BOOLEAN NOT NULL,
    "hour_morning_opening" TEXT NOT NULL,
    "hour_morning_closing" TEXT NOT NULL,
    "hour_afternoon_status" BOOLEAN NOT NULL,
    "hour_afternoon_opening" TEXT NOT NULL,
    "hour_afternoon_closing" TEXT NOT NULL,

    CONSTRAINT "Hour_pkey" PRIMARY KEY ("hour_id")
);

-- CreateTable
CREATE TABLE "Picture" (
    "picture_id" SERIAL NOT NULL,
    "picture_name" TEXT NOT NULL,
    "picture_image" TEXT NOT NULL,
    "picture_description" TEXT,
    "picture_published_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "picture_status" TEXT NOT NULL,
    "picture_fileKey" TEXT NOT NULL,

    CONSTRAINT "Picture_pkey" PRIMARY KEY ("picture_id")
);

-- CreateTable
CREATE TABLE "Category" (
    "category_id" SERIAL NOT NULL,
    "category_name" TEXT NOT NULL,
    "category_description" TEXT NOT NULL DEFAULT 'Aucune description',
    "category_name_url" TEXT NOT NULL DEFAULT '',
    "category_picture" TEXT NOT NULL DEFAULT '',
    "category_fileKey" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Category_pkey" PRIMARY KEY ("category_id")
);

-- CreateTable
CREATE TABLE "Service" (
    "service_id" SERIAL NOT NULL,
    "service_title" TEXT NOT NULL,
    "service_paragraph_one" TEXT NOT NULL,
    "service_paragraph_two" TEXT NOT NULL,
    "service_end_sentence" TEXT NOT NULL,
    "service_published_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "service_status" TEXT NOT NULL,
    "category_id" INTEGER NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("service_id")
);

-- CreateTable
CREATE TABLE "Service_picture" (
    "service_picture_id" SERIAL NOT NULL,
    "service_picture_name" TEXT NOT NULL,
    "service_picture_image" TEXT NOT NULL,
    "service_picture_fileKey" TEXT NOT NULL,
    "service_id" INTEGER NOT NULL,

    CONSTRAINT "Service_picture_pkey" PRIMARY KEY ("service_picture_id")
);

-- CreateTable
CREATE TABLE "Message" (
    "message_id" SERIAL NOT NULL,
    "message_contact_first_name" TEXT NOT NULL,
    "message_contact_last_name" TEXT NOT NULL,
    "message_contact_email" TEXT NOT NULL,
    "message_contact_phone" TEXT,
    "message_content" TEXT NOT NULL,
    "message_published_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "message_status" TEXT NOT NULL,
    "message_response" TEXT,
    "message_response_type" TEXT,
    "message_response_date" TIMESTAMP(3),

    CONSTRAINT "Message_pkey" PRIMARY KEY ("message_id")
);

-- CreateTable
CREATE TABLE "Review" (
    "review_id" SERIAL NOT NULL,
    "review_user_first_name" TEXT NOT NULL,
    "review_user_last_name" TEXT NOT NULL,
    "review_user_email" TEXT NOT NULL,
    "review_comment" TEXT NOT NULL,
    "review_note" INTEGER NOT NULL,
    "review_published_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "review_status" TEXT NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("review_id")
);

-- CreateTable
CREATE TABLE "Strength" (
    "strength_id" SERIAL NOT NULL,
    "strength_name" TEXT NOT NULL,

    CONSTRAINT "Strength_pkey" PRIMARY KEY ("strength_id")
);

-- CreateTable
CREATE TABLE "Car" (
    "car_id" SERIAL NOT NULL,
    "car_name" TEXT NOT NULL,
    "car_price" DOUBLE PRECISION NOT NULL,
    "car_fuel" TEXT NOT NULL,
    "car_year" TIMESTAMP(3) NOT NULL,
    "car_kilometers" INTEGER NOT NULL,
    "car_gearbox" TEXT NOT NULL,
    "car_published_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "car_status" TEXT NOT NULL,
    "car_country" TEXT,
    "car_technical_control" BOOLEAN,
    "car_first_hand" BOOLEAN,
    "car_owners" INTEGER,
    "car_color" TEXT,
    "car_doors" INTEGER,
    "car_seats" INTEGER,
    "car_length" DOUBLE PRECISION,
    "car_boot" TEXT,
    "car_fiscal_power" INTEGER,
    "car_horse_power" INTEGER,
    "car_eu_rule" TEXT,
    "car_critair" TEXT,
    "car_consumption" DOUBLE PRECISION,
    "car_carbon_release" DOUBLE PRECISION,
    "car_conversion_bonus" BOOLEAN,

    CONSTRAINT "Car_pkey" PRIMARY KEY ("car_id")
);

-- CreateTable
CREATE TABLE "Car_picture" (
    "car_picture_id" SERIAL NOT NULL,
    "car_picture_name" TEXT NOT NULL,
    "car_picture_image" TEXT NOT NULL,
    "car_picture_fileKey" TEXT NOT NULL,
    "car_id" INTEGER NOT NULL,

    CONSTRAINT "Car_picture_pkey" PRIMARY KEY ("car_picture_id")
);

-- CreateTable
CREATE TABLE "Car_message" (
    "car_message_id" SERIAL NOT NULL,
    "car_message_contact_first_name" TEXT NOT NULL,
    "car_message_contact_last_name" TEXT NOT NULL,
    "car_message_contact_email" TEXT NOT NULL,
    "car_message_contact_phone" TEXT,
    "car_message_content" TEXT NOT NULL,
    "car_message_published_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "car_message_status" TEXT NOT NULL,
    "car_message_response" TEXT,
    "car_message_response_type" TEXT,
    "car_message_response_date" TIMESTAMP(3),
    "car_id" INTEGER NOT NULL,

    CONSTRAINT "Car_message_pkey" PRIMARY KEY ("car_message_id")
);

-- CreateTable
CREATE TABLE "Car_strength" (
    "strength_name" TEXT NOT NULL,
    "strength_id" INTEGER NOT NULL,
    "car_id" INTEGER NOT NULL,

    CONSTRAINT "Car_strength_pkey" PRIMARY KEY ("car_id","strength_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_user_email_key" ON "User"("user_email");

-- CreateIndex
CREATE UNIQUE INDEX "Hour_hour_day_key" ON "Hour"("hour_day");

-- CreateIndex
CREATE UNIQUE INDEX "Picture_picture_fileKey_key" ON "Picture"("picture_fileKey");

-- CreateIndex
CREATE UNIQUE INDEX "Category_category_name_key" ON "Category"("category_name");

-- CreateIndex
CREATE UNIQUE INDEX "Car_picture_car_picture_fileKey_key" ON "Car_picture"("car_picture_fileKey");

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("category_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service_picture" ADD CONSTRAINT "Service_picture_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "Service"("service_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Car_picture" ADD CONSTRAINT "Car_picture_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "Car"("car_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Car_message" ADD CONSTRAINT "Car_message_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "Car"("car_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Car_strength" ADD CONSTRAINT "Car_strength_strength_id_fkey" FOREIGN KEY ("strength_id") REFERENCES "Strength"("strength_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Car_strength" ADD CONSTRAINT "Car_strength_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "Car"("car_id") ON DELETE CASCADE ON UPDATE CASCADE;
