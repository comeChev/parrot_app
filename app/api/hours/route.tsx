import {
  verifyAdmin,
  verifyAuthorization,
} from "@/utils/nextAuth/nextAuth.protections";
import { prisma } from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, response: Response) {
  const isVerified = await verifyAuthorization(request);
  const isAdmin = await verifyAdmin(r);

  try {
    if (isVerified) {
      if (request.nextUrl.searchParams.get("day")) {
        const day = await prisma.hour.findUnique({
          where: {
            hour_day: request.nextUrl.searchParams.get("day") as string,
          },
        });

        if (!day) {
          throw new Error("Aucun horaire n'a été trouvé");
        }

        return new NextResponse(
          JSON.stringify({
            status: 200,
            message: "Horaire récupéré avec succès",
            data: day,
          })
        );
      }

      const hours = await prisma.hour.findMany({});

      if (hours.length === 0) {
        throw new Error("Aucun horaire n'a été trouvé");
      }

      return new NextResponse(
        JSON.stringify({
          status: 200,
          message: "Liste des horaires récupérée avec succès",
          data: hours,
        })
      );
    }
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        status: 500,
        message: error.message,
        data: error,
      })
    );
  }
}

export async function POST(request: NextRequest, response: Response) {
  try {
    if ((await isVerified(request)) && (await isAdmin())) {
      const body = await request.json();

      const hour = await prisma.hour.create({
        data: {
          hour_day: body.hour_day,
          hour_morning_status: body.hour_morning_status,
          hour_morning_opening: new Date(
            `2019-01-16 ${body.hour_morning_opening}:00`
          ),
          hour_morning_closing: new Date(
            `2019-01-16 ${body.hour_morning_closing}:00`
          ),
          hour_afternoon_status: body.hour_afternoon_status,
          hour_afternoon_closing: new Date(
            `2019-01-16 ${body.hour_afternoon_closing}:00`
          ),
          hour_afternoon_opening: new Date(
            `2019-01-16 ${body.hour_afternoon_opening}:00`
          ),
        },
      });
      return new NextResponse(
        JSON.stringify({
          status: 200,
          message: "Horaire créé avec succès",
          data: hour,
        })
      );
    }
  } catch (error: any) {
    if (error.code === "P2002") {
      return new NextResponse(
        JSON.stringify({
          status: 500,
          message: "Cet jour existe déjà",
          data: error,
        })
      );
    }
    return new NextResponse(
      JSON.stringify({
        status: 500,
        message: error.message,
        data: error,
      })
    );
  }
}

export async function PATCH(request: NextRequest, response: Response) {
  try {
    if ((await isVerified(request)) && (await isAdmin())) {
      if (!request.nextUrl.searchParams.get("day")) {
        throw new Error("Aucun jour n'a été trouvé");
      }
      const queryDay = request.nextUrl.searchParams.get("day") as string;
      const body = await request.json();
      const day = await prisma.hour.update({
        where: { hour_day: queryDay },
        data: {
          hour_day: body.hour_day,
          hour_morning_status: body.hour_morning_status,
          hour_morning_opening: new Date(
            `2019-01-16 ${body.hour_morning_opening}:00`
          ),
          hour_morning_closing: new Date(
            `2019-01-16 ${body.hour_morning_closing}:00`
          ),
          hour_afternoon_status: body.hour_afternoon_status,
          hour_afternoon_closing: new Date(
            `2019-01-16 ${body.hour_afternoon_closing}:00`
          ),
          hour_afternoon_opening: new Date(
            `2019-01-16 ${body.hour_afternoon_opening}:00`
          ),
        },
      });
      return new NextResponse(
        JSON.stringify({
          status: 200,
          message: "Horaire modifié avec succès",
          data: day,
        })
      );
    }
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        status: 500,
        message: error.message,
        data: error,
      })
    );
  }
}

export async function DELETE(request: NextRequest, response: Response) {
  try {
    if ((await isVerified(request)) && (await isAdmin())) {
      if (!request.nextUrl.searchParams.get("day")) {
        throw new Error("Aucun jour n'a été trouvé");
      }
      const queryDay = request.nextUrl.searchParams.get("day") as string;
      const day = await prisma.hour.delete({
        where: { hour_day: queryDay },
      });
      return new NextResponse(
        JSON.stringify({
          status: 200,
          message: "Horaire supprimé avec succès",
          data: day,
        })
      );
    }
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        status: 500,
        message: error.message,
        data: error,
      })
    );
  }
}
