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
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `le ${day}/${month}/${year} à ${hours}:${minutes}`;
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
