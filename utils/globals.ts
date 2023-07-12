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
