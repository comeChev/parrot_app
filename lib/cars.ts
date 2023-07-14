import { deleteFile } from "@/utils/supabase.upload";
import { Car, Car_message, Car_picture, Strength } from "@prisma/client";

export interface FullCar extends Car {
  car_status: "ONLINE" | "OFFLINE" | "ARCHIVED";
  car_pictures: Car_picture[];
  car_messages: Car_message[];
  car_strengths: Strength[];
}

export interface PublicCar extends Car {
  car_pictures: Car_picture[];
  car_strengths: Strength[];
}

export async function getCars() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/cars`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
    },
    cache: "no-cache",
  });
  const responseJson = await response.json();
  if (responseJson.error) {
    return [];
  }
  return responseJson.data;
}

export async function getAdminCars() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/cars`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-cache",
  });
  const responseJson = await response.json();
  if (responseJson.error) {
    return [];
  }
  return responseJson.data;
}

export async function getCar(id: number) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/cars?id=${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
      },
      cache: "no-cache",
    }
  );
  const responseJson = await response.json();
  if (responseJson.error) {
    return null;
  }
  return responseJson.data;
}

export async function createCar(car: Partial<Car>) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/cars`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(car),
  });
  const responseJson = await response.json();
  if (responseJson.error) {
    return null;
  }
  return responseJson.data;
}

export async function updateCar(id: number, car: Partial<Car>) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/cars?id=${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(car),
    }
  );
  const responseJson = await response.json();
  if (responseJson.error) {
    return null;
  }
  return responseJson.data;
}

export async function deleteCar(id: number) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/cars?id=${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const responseJson = await response.json();
  if (responseJson.error) {
    return null;
  }
  return responseJson.data;
}

export async function createCarPicture(
  carId: number,
  car_picture: Partial<Car_picture>
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/cars/pictures?carId=${carId}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(car_picture),
    }
  );
  const responseJson = await response.json();
  if (responseJson.error) {
    return null;
  }
  return responseJson.data;
}

export async function updateCarPicture(
  id: number,
  picture: Partial<Car_picture>
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/cars/pictures?id=${id}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(picture),
    }
  );
  const responseJson = await response.json();
  if (responseJson.error) {
    return null;
  }
  return responseJson.data;
}

export async function deleteCarPicture(id: number, fileKey: string) {
  //delete from supabase
  const { data, success } = await deleteFile(fileKey);
  if (!success) {
    return null;
  }
  //delete from db
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/cars/pictures?id=${id}`,
    {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }
  );
  const responseJson = await response.json();
  if (responseJson.error) {
    return null;
  }
  return responseJson.data;
}

export type CarMessage = {
  car_message_contact_first_name: string;
  car_message_contact_last_name: string;
  car_message_contact_email: string;
  car_message_contact_phone: string;
  car_message_content: string;
  car_message_status: "PENDING" | "ANSWERED";
  car_message_response: string | null;
  car_message_response_date: Date | null;
  car_message_response_type: "PHONE" | "EMAIL" | null;
  car_id: number;
};

export async function createCarMessage(
  carId: number,
  car_message: Partial<Car_message>
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/cars/messages?carId=${carId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
      },
      body: JSON.stringify(car_message),
    }
  );
  const responseJson = await response.json();
  if (responseJson.error) {
    return null;
  }
  return responseJson.data;
}

export async function updateCarMessage(
  id: number,
  message: Partial<Car_message>
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/cars/messages?id=${id}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
    }
  );
  const responseJson = await response.json();
  if (responseJson.error) {
    return null;
  }
  return responseJson.data;
}

export async function deleteCarMessage(id: number) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/cars/messages?id=${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const responseJson = await response.json();
  if (responseJson.error) {
    return null;
  }
  return responseJson.data;
}
