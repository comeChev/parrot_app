import { NextRequest, NextResponse } from "next/server";
import {
  verifyAdmin,
  verifyAuthorization,
} from "@/utils/nextAuth/nextAuth.protections";

import { User } from "@prisma/client";
import { UserWithoutPassword } from "@/lib/sql/users";
import { prisma } from "@/utils/prisma";

export type PublicUser = {
  user_id: number;
  user_first_name: string;
  user_last_name: string;
  user_arrival: Date | null;
  user_gender: string | null;
  user_job: string | null;
  user_image: string | null;
  user_status: string;
};

export async function GET(request: NextRequest) {
  const isAuthorized = await verifyAuthorization(request);
  const isAdmin = await verifyAdmin();
  try {
    if (!isAuthorized)
      throw new Error("Vous n'êtes pas autorisé à effectuer cette action");
    //verification session or API KEY
    if (isAuthorized) {
      // get user by id
      if (request.nextUrl.searchParams.get("id")) {
        const id = Number(request.nextUrl.searchParams.get("id"));
        const user = await prisma.user.findUnique({
          where: { user_id: id },
        });
        if (!user) {
          throw new Error("Aucun utilisateur trouvé");
        }
        //verification if user is ADMIN
        if (isAdmin) {
          const userWithoutPassword: Partial<User> = {
            ...user,
          };
          userWithoutPassword.user_password &&
            delete userWithoutPassword.user_password;
          return new NextResponse(
            JSON.stringify({
              message: "Utilisateur récupéré avec succès",
              data: userWithoutPassword,
            }),
            { status: 200 }
          );
        } else {
          return new NextResponse(
            JSON.stringify({
              message: "Utilisateur récupéré avec succès",
              data: {
                user_id: user.user_id,
                user_first_name: user.user_first_name,
                user_last_name: user.user_last_name,
                user_arrival: user.user_arrival,
                user_job: user.user_job,
                user_gender: user.user_gender,
                user_image: user.user_image,
              } as Partial<User>,
            }),
            { status: 200 }
          );
        }
      }

      //get users by public
      if (request.nextUrl.searchParams.get("public")) {
        if (request.nextUrl.searchParams.get("public") !== "1")
          throw new Error("Impossible de récupérer les utilisateurs publics");
        console.log("ici on est public");
        const users = await prisma.user.findMany({
          where: { user_status: "ACTIVE" },
          select: {
            user_id: true,
            user_first_name: true,
            user_last_name: true,
            user_arrival: true,
            user_gender: true,
            user_job: true,
            user_image: true,
            user_status: true,
          },
        });
        if (!users) throw new Error("Aucun utilisateur trouvé");
        return new NextResponse(
          JSON.stringify({
            message: "Liste des utilisateurs récupérée avec succès",
            data: users,
          }),
          {
            status: 200,
          }
        );
      }

      //get users
      const users = await prisma.user.findMany({});
      if (!users) {
        throw new Error("Aucun utilisateur trouvé");
      }

      //verification if user is ADMIN
      if (isAdmin) {
        const usersWithoutPassword: Partial<User>[] = users.map((user) => {
          const userWithoutPassword: Partial<User> = {
            ...user,
          };
          // userWithoutPassword.user_password &&
          //   delete userWithoutPassword.user_password;
          return userWithoutPassword;
        });
        return new NextResponse(
          JSON.stringify({
            message: "Liste des utilisateurs récupérée avec succès",
            data: usersWithoutPassword,
          }),
          { status: 200 }
        );
      } else {
        const usersForReading: Partial<User>[] = users.map((user) => {
          const userForReading: Partial<User> = {
            user_id: user.user_id,
            user_first_name: user.user_first_name,
            user_last_name: user.user_last_name,
            user_arrival: user.user_arrival,
            user_job: user.user_job,
            user_gender: user.user_gender,
            user_image: user.user_image,
          };
          return userForReading;
        });
        return new NextResponse(
          JSON.stringify({
            message: "Liste des utilisateurs récupérée avec succès",
            data: usersForReading,
          }),
          { status: 200 }
        );
      }
    }
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        message: error.message,
        data: error,
      }),
      { status: 401 }
    );
  }
}

export async function POST(request: NextRequest) {
  const isAuthorized = await verifyAuthorization(request);
  const isAdmin = await verifyAdmin();
  try {
    // user must be logged and admin
    if (isAdmin) {
      const body = await request.json();
      const user = await prisma.user.create({
        data: body,
      });
      return new NextResponse(
        JSON.stringify({
          message: "Utilisateur créé avec succès",
          data: user,
        }),
        { status: 201 }
      );
    } else {
      throw new Error("Vous n'êtes pas autorisé à effectuer cette action");
    }
  } catch (error: any) {
    if (error.code === "P2002") {
      return new NextResponse(
        JSON.stringify({
          message: "Cet email ne peut pas être utilisé",
          error,
        }),
        { status: 409 }
      );
    }
    return new NextResponse(
      JSON.stringify({
        error: error.message,
        data: error,
      }),
      { status: error.status || 401 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  const isAdmin = await verifyAdmin();
  try {
    // user must be logged and admin
    if (isAdmin) {
      if (!request.nextUrl.searchParams.get("id")) {
        throw new Error("Aucun id fourni");
      }
      const id = Number(request.nextUrl.searchParams.get("id"));
      const body: UserWithoutPassword = await request.json();
      const user = await prisma.user.update({
        where: { user_id: id },
        data: {
          ...body,
        },
      });
      return new NextResponse(
        JSON.stringify({
          message: "Utilisateur modifié avec succès",
          data: user,
        }),
        { status: 201 }
      );
    }
    throw new Error("Vous n'êtes pas autorisé à effectuer cette action");
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        error: error.message,
      }),
      { status: 401 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const isAdmin = await verifyAdmin();
    // user must be logged and admin
    if (isAdmin) {
      if (!request.nextUrl.searchParams.get("id")) {
        throw new Error("Aucun id fourni");
      }
      const id = Number(request.nextUrl.searchParams.get("id"));
      const user = await prisma.user.delete({
        where: { user_id: id },
      });
      return new NextResponse(
        JSON.stringify({
          status: 200,
          message: "Utilisateur supprimé avec succès",
          data: user,
        })
      );
    }
    throw new Error("Vous n'êtes pas autorisé à effectuer cette action");
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        status: "failed",
        error: error.message,
        data: error,
      }),
      { status: error.status || 401 }
    );
  }
}
