import {
  verifyAdmin,
  verifyAuthorization,
} from "@/utils/nextAuth/nextAuth.protections";
import { prisma } from "@/utils/prisma";
import { User } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, response: NextRequest) {
  const isAuthorized = await verifyAuthorization(request);
  const isAdmin = await verifyAdmin();
  try {
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

      //get users
      const users = await prisma.user.findMany({});
      if (!users || users.length === 0) {
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
          data: error,
        }),
        { status: 409 }
      );
    }
    return new NextResponse(
      JSON.stringify({
        message: error.message,
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
      if (Number(request.nextUrl.searchParams.get("id"))) {
        throw new Error("Aucun id fourni");
      }
      const id = Number(request.nextUrl.searchParams.get("id"));
      const body = await request.json();
      const user = await prisma.user.update({
        where: { user_id: id },
        data: body,
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
        message: error.message,
        data: error,
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
        message: error.message,
        data: error,
      }),
      { status: error.status || 401 }
    );
  }
}