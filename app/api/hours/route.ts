import {
  verifyAdmin,
  verifyAuthorization,
} from "@/utils/nextAuth/nextAuth.protections";
import { prisma } from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, response: Response) {
  const isVerified = await verifyAuthorization(request);

  try {
    if (!isVerified)
      return new NextResponse(
        JSON.stringify({ error: "Vous n'êtes pas autorisé" }),
        { status: 401 }
      );

    if (request.nextUrl.searchParams.get("day")) {
      const day = await prisma.hour.findUnique({
        where: {
          hour_day: request.nextUrl.searchParams.get("day") as string,
        },
      });

      if (!day) {
        return new NextResponse(JSON.stringify({ error: "Jour non trouvé" }), {
          status: 404,
        });
      }

      return new NextResponse(
        JSON.stringify({
          message: "Horaire récupéré avec succès",
          data: day,
        }),
        { status: 200 }
      );
    }

    const hours = await prisma.hour.findMany({});

    if (!hours) {
      return new NextResponse(JSON.stringify({ error: "Aucune donnée" }), {
        status: 500,
      });
    }

    return new NextResponse(
      JSON.stringify({
        message: "Liste des horaires récupérée avec succès",
        data: hours,
      }),
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: error.status || 500,
    });
  }
}

export async function POST(request: NextRequest, response: Response) {
  const isAdmin = await verifyAdmin();
  try {
    if (!isAdmin) {
      return new NextResponse(
        JSON.stringify({ error: "Vous n'êtes pas autorisé" }),
        {
          status: 401,
        }
      );
    }
    const body = await request.json();

    // const hour = await prisma.hour.create({
    //   data: {
    //     hour_day: body.hour_day,
    //     hour_morning_status: body.hour_morning_status,
    //     hour_morning_opening: new Date(
    //       `2019-01-16 ${body.hour_morning_opening}:00`
    //     ),
    //     hour_morning_closing: new Date(
    //       `2019-01-16 ${body.hour_morning_closing}:00`
    //     ),
    //     hour_afternoon_status: body.hour_afternoon_status,
    //     hour_afternoon_closing: new Date(
    //       `2019-01-16 ${body.hour_afternoon_closing}:00`
    //     ),
    //     hour_afternoon_opening: new Date(
    //       `2019-01-16 ${body.hour_afternoon_opening}:00`
    //     ),
    //   },
    // });

    const hour = await prisma.hour.create({
      data: body,
    });
    if (!hour) throw new Error("Erreur lors de la création de l'horaire");

    return new NextResponse(
      JSON.stringify({
        message: "Horaire créé avec succès",
        data: hour,
      }),
      { status: 201 }
    );
  } catch (error: any) {
    if (error.code === "P2002") {
      return new NextResponse(
        JSON.stringify({
          error: "Cet jour existe déjà",
        }),
        { status: 400 }
      );
    }
    return new NextResponse(
      JSON.stringify({
        error: error.message,
      }),
      { status: error.status || 401 }
    );
  }
}

export async function PATCH(request: NextRequest, response: Response) {
  const isAdmin = await verifyAdmin();
  try {
    if (!isAdmin)
      return new NextResponse(
        JSON.stringify({ error: "Vous n'êtes pas autorisé" }),
        { status: 401 }
      );
    if (!request.nextUrl.searchParams.get("id")) {
      throw new Error("Aucun jour n'a été trouvé");
    }
    const id = request.nextUrl.searchParams.get("id") as string;
    const body = await request.json();

    const day = await prisma.hour.update({
      where: { hour_id: Number(id) },
      data: body,
    });
    return new NextResponse(
      JSON.stringify({
        message: "Horaire modifié avec succès",
        data: day,
      }),
      { status: 201 }
    );
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        message: error.message,
        data: error,
      }),
      { status: error.status || 500 }
    );
  }
}

export async function DELETE(request: NextRequest, response: Response) {
  const isAdmin = await verifyAdmin();
  try {
    if (!isAdmin)
      return new NextResponse(
        JSON.stringify({ error: "Vous n'êtes pas autorisé" }),
        { status: 401 }
      );
    if (!request.nextUrl.searchParams.get("id")) {
      return new NextResponse(JSON.stringify({ error: "Aucun jour trouvé" }), {
        status: 400,
      });
    }
    const id = request.nextUrl.searchParams.get("id") as string;
    const day = await prisma.hour
      .delete({
        where: { hour_id: Number(id) },
      })
      .catch((error) => {
        return new NextResponse(JSON.stringify({ error: error.message }), {
          status: error.status || 500,
        });
      });
    if (!day)
      return new NextResponse(JSON.stringify({ error: "Aucun jour trouvé" }), {
        status: 400,
      });
    return new NextResponse(
      JSON.stringify({
        message: "Horaire supprimé avec succès",
        data: day,
      }),
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        error: error.message,
      }),
      { status: error.status || 500 }
    );
  }
}
