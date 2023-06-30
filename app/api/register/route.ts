import { prisma } from "@/utils/prisma";
import { hash } from "bcryptjs";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, password } = (await req.json()) as {
      name: string;
      email: string;
      password: string;
    };

    // hashing the password with bcrypt
    const hashed_password = await hash(password, 12);

    const user = await prisma.user.create({
      data: {
        user_first_name: name,
        user_email: email.toLowerCase(),
        user_password: hashed_password,
        user_last_name: "", //default value
        user_role: "ADMIN", //default value // TODO: change to EMPLOYEE
        user_status: "ACTIVE", //default value
      },
    });

    if (!user) throw new Error("Error creating user");

    return NextResponse.json({
      user: {
        name: user.user_first_name,
        email: user.user_email,
        username: user.user_last_name,
      },
    });
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        status: "failed",
        message: error.message,
      }),
      { status: 500 }
    );
  }
}
