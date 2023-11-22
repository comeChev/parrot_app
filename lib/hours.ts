import { Hour } from "@prisma/client";

type HH =
  | "00"
  | "01"
  | "02"
  | "03"
  | "04"
  | "05"
  | "06"
  | "07"
  | "08"
  | "09"
  | "10"
  | "11"
  | "12"
  | "13"
  | "14"
  | "15"
  | "16"
  | "17"
  | "18"
  | "19"
  | "20"
  | "21"
  | "22"
  | "23";
type MM =
  | "00"
  | "01"
  | "02"
  | "03"
  | "04"
  | "05"
  | "06"
  | "07"
  | "08"
  | "09"
  | "10"
  | "11"
  | "12"
  | "13"
  | "14"
  | "15"
  | "16"
  | "17"
  | "18"
  | "19"
  | "20"
  | "21"
  | "22"
  | "23"
  | "24"
  | "25"
  | "26"
  | "27"
  | "28"
  | "29"
  | "30"
  | "31"
  | "32"
  | "33"
  | "34"
  | "35"
  | "36"
  | "37"
  | "38"
  | "39"
  | "40"
  | "41"
  | "42"
  | "43"
  | "44"
  | "45"
  | "46"
  | "47"
  | "48"
  | "49"
  | "50"
  | "51"
  | "52"
  | "53"
  | "54"
  | "55"
  | "56"
  | "57"
  | "58"
  | "59";

type HourTime = `${HH}:${MM}`;

export interface HourCreate {
  hour_day: string;
  hour_morning_status: boolean;
  hour_morning_opening: HourTime;
  hour_morning_closing: HourTime;
  hour_afternoon_status: boolean;
  hour_afternoon_opening: HourTime;
  hour_afternoon_closing: HourTime;
}

export interface HourUpdate extends HourCreate {
  hour_id: number;
}

export async function getHours() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/hours`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
        },
        // revalidation every 60 seconds
        next: { revalidate: 60 },
      }
    );
    const responseJson = await response.json();
    if (responseJson.error) {
      return [];
    }
    return responseJson.data;
  } catch (error: any) {}
}

export async function createHour(hour: Omit<Hour, "hour_id">) {
  const createdHour = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/hours`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(hour),
    }
  );
  const createdHourJson = await createdHour.json();

  if (createdHourJson.error) {
    return null;
  }
  return createdHourJson.data;
}

/**
 * @param day day of the week (Lundi | Mardi | Mercredi | Jeudi | Vendredi | Samedi | Dimanche)
 * @param hour hour to update (hour_morning_status | hour_morning_opening | hour_morning_closing | hour_afternoon_status | hour_afternoon_opening | hour_afternoon_closing)
 */
export async function updateHour(hour: Hour) {
  const updatedHour = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/hours?id=${hour.hour_id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(hour),
    }
  );
  const updatedHourJson = await updatedHour.json();
  if (updatedHourJson.error) {
    return null;
  }
  return updatedHourJson.data;
}

export async function deleteHour(id: number) {
  return await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/hours?id=${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((data) => data?.data || data?.error)
    .catch((error) => {});
}
