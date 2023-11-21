import { User } from "@prisma/client";
import { prisma } from "@/utils/prisma";

export type UserWithoutPassword = Omit<User, "user_password">;

export async function getUsers() {
  const users: UserWithoutPassword[] =
    await prisma.$queryRaw`SELECT "user_id", "user_first_name", "user_last_name", "user_email", "user_role", "user_status", "user_image", "user_fileKey", "user_gender", "user_job", "user_arrival" FROM 
    "User"`;
  return users;
}
