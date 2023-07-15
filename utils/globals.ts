import { Hour } from "@prisma/client";

export function getPrice(price: number) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: price % 1 === 0 ? 0 : 2,
  }).format(price);
}

export function getKilometers(kilometers: number) {
  return (
    new Intl.NumberFormat("fr-FR", {
      style: "unit",
      unit: "kilometer",
    }).format(kilometers) + "s"
  );
}

export function getUpperCaseFirstLetter(str: string | null) {
  if (!str) return null;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getFiscalPower(num: number | null, unit: "CV" | "ch") {
  if (!num) return null;
  return `${num} ${unit}`;
}
export function getConsumption(num: number | null, unit: "fuel" | "carbon") {
  if (!num) return null;
  return unit === "fuel" ? `${num} L/100km` : `${num} g/km`;
}

export function getInputDate(date: Date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function getFullStringDate(date: Date) {
  return `le ${new Date(date).toLocaleDateString("fr-FR")} à ${new Date(
    date
  ).toLocaleTimeString("fr-FR")}`;
}

export function getOpeningHoursString(
  opening: Date,
  closing: Date,
  status: boolean
) {
  const openHour = opening.getHours().toString().padStart(2, "0");
  const openMinutes = opening.getMinutes().toString().padStart(2, "0");

  const closeHour = closing.getHours().toString().padStart(2, "0");
  const closeMinutes = closing.getMinutes().toString().padStart(2, "0");

  if (!status) return `Fermé`;

  return ` de ${openHour}:${openMinutes} à ${closeHour}:${closeMinutes}`;
}

export function getFullName(firstName: string, lastName: string) {
  return `${getUpperCaseFirstLetter(firstName)} ${lastName.toUpperCase()}`;
}

export function filterArrayWeedDays(array: Hour[]) {
  interface HourWithDayId extends Hour {
    day_id: number;
  }

  const arrayDays: HourWithDayId[] = array.map((day) => {
    switch (day.hour_day) {
      case "Lundi":
        return { ...day, day_id: 1 };
      case "Mardi":
        return { day_id: 2, ...day };
      case "Mercredi":
        return { day_id: 3, ...day };
      case "Jeudi":
        return { day_id: 4, ...day };
      case "Vendredi":
        return { day_id: 5, ...day };
      case "Samedi":
        return { day_id: 6, ...day };
      case "Dimanche":
        return { day_id: 7, ...day };
      default:
        return { day_id: 0, ...day };
    }
  });

  const arrayDaysSorted: HourWithDayId[] = arrayDays.sort(
    (a, b) => a.day_id - b.day_id
  );

  const arrayDaysSortedWithoutId: Hour[] = arrayDaysSorted.map((day) => {
    const { day_id, ...rest } = day;
    return rest;
  });

  return arrayDaysSortedWithoutId;
}
