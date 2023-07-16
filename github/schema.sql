/* ON CREE LA BASE DE DONNEES / AU PREALABLE ON VERIFIE QU'ELLE N'EST PAS DEJA EXISTANTE */
CREATE DATABASE IF NOT EXISTS garage_parrot CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

/* ON SELECTIONNE ENSUITE LA DATABASE garage_parrot */
USE garage_parrot;


/* ON CREE LES DIFFERENTES TABLES / ON VERIFIE AU PREALABLE QU'ELLES N'EXISTENT PAS */

CREATE TABLE IF NOT EXISTS user (
  user_id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  user_first_name VARCHAR NOT NULL
  user_last_name VARCHAR NOT NULL
  user_email VARCHAR NOT NULL
  user_password VARCHAR NOT NULL
  user_role VARCHAR NOT NULL
  user_status VARCHAR NOT NULL
  user_image VARCHAR
  user_gender VARCHAR NOT NULL
  user_job VARCHAR NOT NULL
  user_arrival DATE
) engine=INNODB;

CREATE TABLE IF NOT EXISTS picture (
  picture_id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  picture_image VARCHAR NOT NULL,
  picture_name VARCHAR NOT NULL,
  picture_description VARCHAR,
  picture_published_date DATE,
  picture_status VARCHAR,
) engine=INNODB;

CREATE TABLE IF NOT EXISTS hour (
  hour_id INTEGER AUTO_INCREMENT NOT NULL UNIQUE, 
  hour_day VARCHAR NOT NULL,
  hour_morning_status VARCHAR NOT NULL,
  hour_morning_opening TIME(HH:MI) NOT NULL,
  hour_morning_closing TIME(HH:MI) NOT NULL,
  hour_afternoon_status VARCHAR NOT NULL,
  hour_afternoon_opening TIME(HH:MI) NOT NULL,
  hour_afternoon_closing TIME(HH:MI) NOT NULL,
) engine=INNODB;

CREATE TABLE IF NOT EXISTS category(
  category_id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  category_name VARCHAR(30) NOT NULL,
) engine=INNODB;

CREATE TABLE IF NOT EXISTS service (
  service_id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  service_title VARCHAR(60) NOT NULL,
  service_paragraph_one TEXT NOT NULL,
  service_paragraph_two TEXT NOT NULL,
  service_end_sentence VARCHAR NOT NULL,
  service_published_date DATE NOT NULL,
  service_status VARCHAR NOT NULL,
  category_id INTEGER NOT NULL,
  FOREIGN KEY (category_id)
    REFERENCES category(category_id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
) engine=INNODB;

CREATE TABLE IF NOT EXISTS service_picture(
  service_picture_id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  service_picture_image VARCHAR NOT NULL,
  service_picture_name VARCHAR NOT NULL,
  service_id INTEGER NOT NULL,
  FOREIGN KEY (service_id)
    REFERENCES service(service_id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
) engine=INNODB;

CREATE TABLE IF NOT EXISTS message(
  message_id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  message_contact_first_name VARCHAR NOT NULL,
  message_contact_last_name VARCHAR NOT NULL,
  message_contact_email VARCHAR NOT NULL,
  message_contact_phone VARCHAR,
  message_content TEXT NOT NULL,
  message_published_date DATE NOT NULL,
  message_status VARCHAR NOT NULL,
  message_response TEXT,
  message_response_type VARCHAR,
  message_response_date DATE,
) engine=INNODB;

CREATE TABLE IF NOT EXISTS review(
  review_id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  review_user_first_name VARCHAR NOT NULL,
  review_user_last_name VARCHAR NOT NULL,
  review_user_email VARCHAR NOT NULL,
  review_comment TEXT NOT NULL,
  review_note INTEGER NOT NULL,
  review_published_date DATE NOT NULL,
  review_status VARCHAR NOT NULL,
) engine=INNODB;

CREATE TABLE IF NOT EXISTS strong_point(
  strong_point_id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  strong_point_name VARCHAR NOT NULL,
) engine=INNODB;

CREATE TABLE IF NOT EXISTS car(
  car_id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  car_name VARCHAR NOT NULL,
  car_price FLOAT(6,2) NOT NULL,
  car_fuel VARCHAR NOT NULL,
  car_year INTEGER NOT NULL,
  car_kilometers INTEGER NOT NULL,
  car_gearbox VARCHAR NOT NULL,
  car_published_date DATE NOT NULL,
  car_status VARCHAR NOT NULL,
  car_country VARCHAR,
  car_technical_control BOOLEAN,
  car_first_hand BOOLEAN,
  car_owners INTEGER,
  car_color VARCHAR,
  car_doors INTEGER,
  car_seats INTEGER,
  car_length FLOAT(1,2),
  car_boot VARCHAR,
  car_fiscal_power INTEGER,
  car_horsepower INTEGER,
  car_eu_rule VARCHAR,
  car_critair VARCHAR,
  car_consumption FLOAT(3,1),
  car_carbon_release FLOAT(3,1),
  car_conversion_bonus BOOLEAN
) engine=INNODB;

CREATE TABLE IF NOT EXISTS car_picture(
  car_picture_id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  car_picture_name VARCHAR NOT NULL,
  car_picture_image VARCHAR NOT NULL,
  car_id INTEGER NOT NULL,
  FOREIGN KEY (car_id)
    REFERENCES car(car_id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
) engine=INNODB;

CREATE TABLE IF NOT EXISTS car_message(
  car_message_id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  car_message_contact_first_name VARCHAR NOT NULL,
  car_message_contact_last_name VARCHAR NOT NULL,
  car_message_contact_email VARCHAR NOT NULL,
  car_message_contact_phone VARCHAR,
  car_message_content TEXT NOT NULL,
  car_message_published_date DATE NOT NULL,
  car_message_status VARCHAR NOT NULL,
  car_message_response TEXT,
  car_message_response_type VARCHAR,
  car_message_response_date DATE,
  car_id INTEGER NOT NULL,
  FOREIGN KEY (car_id)
    REFERENCES car(car_id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
) engine=INNODB;
