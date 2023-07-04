import {
  verifyAuthorization,
  verifySession,
} from "@/utils/nextAuth/nextAuth.protections";
import { prisma } from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const isVerified = await verifyAuthorization(request);
  try {
    if (!isVerified)
      return new NextResponse(JSON.stringify({ error: "Accès non autorisé" }), {
        status: 401,
      });

    // get pictures by car id
    if (request.nextUrl.searchParams.get("carId")) {
      const carId = Number(request.nextUrl.searchParams.get("carId"));
      const pictures = await prisma.car_picture.findMany({
        where: { car_id: carId },
      });
      if (!pictures) throw new Error("Aucune image pour cette voiture");

      return new NextResponse(
        JSON.stringify({
          message: `Images pour la voiture n°${carId} trouvées`,
          data: pictures,
        }),
        { status: 200 }
      );
    }
    // get picture by id
    if (request.nextUrl.searchParams.get("id")) {
      const id = Number(request.nextUrl.searchParams.get("id"));
      const picture = await prisma.car_picture.findUnique({
        where: { car_picture_id: id },
      });
      if (!picture) throw new Error("Image non trouvée");
      return new NextResponse(
        JSON.stringify({
          message: `Image n°${id} trouvée`,
          data: picture,
        }),
        { status: 200 }
      );
    }
    throw new Error("Aucun paramètre fourni");
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        error: error.message,
      }),
      { status: error.status || 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const hasSession = verifySession();
  try {
    if (!hasSession)
      return new NextResponse(JSON.stringify({ error: "Accès non autorisé" }), {
        status: 401,
      });

    if (!request.nextUrl.searchParams.get("carId"))
      throw new Error("Voiture non renseignée");

    const carId = Number(request.nextUrl.searchParams.get("carId"));
    const body = await request.json();
    const car_picture = await prisma.car_picture.create({
      data: { ...body, car_id: carId },
    });
    if (!car_picture) throw new Error("Erreur lors de la création de l'image");
    return new NextResponse(
      JSON.stringify({
        message: "Image créée",
        data: car_picture,
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

export async function PATCH(request: NextRequest) {
  const hasSession = verifySession();
  try {
    if (!hasSession)
      return new NextResponse(JSON.stringify({ error: "Accès non autorisé" }), {
        status: 401,
      });
    if (!request.nextUrl.searchParams.get("id"))
      throw new Error("Image non renseignée");
    const id = Number(request.nextUrl.searchParams.get("id"));
    const body = await request.json();
    const car_picture = await prisma.car_picture.update({
      where: { car_picture_id: id },
      data: body,
    });
    if (!car_picture)
      throw new Error("Erreur lors de la modification de l'image");
    return new NextResponse(
      JSON.stringify({
        message: "Image modifiée",
        data: car_picture,
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

export async function DELETE(request: NextRequest) {
  const hasSession = verifySession();

  try {
    if (!hasSession)
      return new NextResponse(JSON.stringify({ error: "Accès non autorisé" }), {
        status: 401,
      });
    if (!request.nextUrl.searchParams.get("id"))
      throw new Error("Image non renseignée");
    const id = Number(request.nextUrl.searchParams.get("id"));
    const picture = await prisma.car_picture.delete({
      where: { car_picture_id: id },
    });
    if (!picture) throw new Error("Erreur lors de la suppression de l'image");
    return new NextResponse(
      JSON.stringify({
        message: "Image supprimée",
        data: picture,
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
