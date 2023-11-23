import { PublicUser } from "@/app/api/users/route";
import { User } from "@prisma/client";
import { hash } from "bcryptjs";

export async function getUsers() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/users`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
      },
      // revalidate every 24 hours
      next: { revalidate: 60 * 60 * 24 },
    }
  );
  const responseJson = await response.json();
  if (responseJson.error) {
    return [];
  }
  return responseJson.data;
}

export async function getUsersPublic(): Promise<PublicUser[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/users?public=1`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
      },
      // revalidate every 24 hours
      next: { revalidate: 60 * 60 * 24 },
    }
  );
  const responseJson = await response.json();
  if (responseJson.error) {
    return [];
  }
  return responseJson.data;
}

export async function updateUser(id: number, data: Partial<User>) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/users?id=${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
      body: JSON.stringify(data),
    }
  );
  const responseJson = await response.json();
  if (responseJson.error) {
    return null;
  }
  return responseJson.data;
}

export async function createUser(user: Partial<User>) {
  if (user.user_password) {
    const hashedPassword = await hash(user.user_password, 12);
    const userToCreate = { ...user, user_password: hashedPassword };
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/users`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-cache",
        body: JSON.stringify(userToCreate),
      }
    );
    const responseJson = await response.json();
    if (responseJson.error) {
      return null;
    }
    return responseJson.data;
  }
}
