// app/sitemap.js

import { getCars } from "@/lib/cars";
import { Car } from "@prisma/client";
import {
  ServiceWithPicturesAndCategory,
  getServicesWithPictures,
} from "@/lib/services";

const URL = "https://garageparrot.vassco.fr";

export default async function sitemap() {
  const cars = await getCars().then((cars) =>
    cars.map((car: Car) => ({
      url: `${URL}/car?id=${car.car_id}`,
      lastModified: new Date().toISOString(),
    }))
  );
  const services = await getServicesWithPictures().then((services) =>
    services.map((service: ServiceWithPicturesAndCategory) => ({
      url: `${URL}/service?name=${service.category.category_name_url}`,
      lastModified: new Date().toISOString(),
    }))
  );

  const routes = [
    "/",
    "/about",
    "/cars",
    "/contact",
    "/gallery",
    "/legals",
    "/privacy",
    "/reviews",
    "/services",
  ].map((route) => ({
    url: `${URL}${route}`,
    lastModified: new Date().toISOString(),
  }));

  return [...routes, ...cars, ...services];
}
