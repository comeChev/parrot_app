import {
  verifyAuthorization,
  verifySession,
} from "@/utils/nextAuth/nextAuth.protections";
import { prisma } from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const hasSession = verifySession();
  try {
    if (!hasSession)
      return new NextResponse(
        JSON.stringify({
          error: "Vous n'êtes pas autorisé à effectuer cette action",
        }),
        { status: 401 }
      );

    // get messages by car id
    if (request.nextUrl.searchParams.get("carId")) {
      const carId = Number(request.nextUrl.searchParams.get("carId"));
      const messages = await prisma.car_message.findMany({
        where: { car_id: carId },
      });
      if (!messages || messages.length === 0)
        throw new Error("Aucun message pour cette voiture");

      return new NextResponse(
        JSON.stringify({
          message: `Messages pour la voiture n°${carId} trouvés`,
          data: messages,
        }),
        { status: 200 }
      );
    }
    // get message by id
    if (request.nextUrl.searchParams.get("id")) {
      const id = Number(request.nextUrl.searchParams.get("id"));
      const message = await prisma.car_message.findUnique({
        where: { car_message_id: id },
      });
      if (!message) throw new Error("Message non trouvé");
      return new NextResponse(
        JSON.stringify({
          message: `Message n°${id} trouvé`,
          data: message,
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
  const isAuthorized = verifyAuthorization(request);
  try {
    if (!isAuthorized)
      return new NextResponse(
        JSON.stringify({
          error: "Vous n'êtes pas autorisé à effectuer cette action",
        }),
        { status: 401 }
      );
    if (!request.nextUrl.searchParams.get("carId"))
      throw new Error("Voiture non renseignée");
    const carId = request.nextUrl.searchParams.get("carId");
    const body = await request.json();
    const message = await prisma.car_message.create({
      data: { ...body, car_id: Number(carId) },
    });
    if (!message) throw new Error("Erreur lors de la création du message");
    return new NextResponse(
      JSON.stringify({
        message: "Message créé",
        data: message,
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
  const hasSession = await verifySession();
  try {
    if (!hasSession)
      return new NextResponse(
        JSON.stringify({
          error: "Vous n'êtes pas autorisé à effectuer cette action",
        }),
        { status: 401 }
      );
    if (!request.nextUrl.searchParams.get("id"))
      throw new Error("Message non renseigné");
    const id = Number(request.nextUrl.searchParams.get("id"));
    const body = await request.json();
    const message = await prisma.car_message.update({
      where: { car_message_id: id },
      data: body,
    });
    if (!message) throw new Error("Erreur lors de la modification du message");
    return new NextResponse(
      JSON.stringify({
        message: "Message modifié",
        data: message,
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
  try {
    if (!request.nextUrl.searchParams.get("id"))
      throw new Error("Message non renseigné");
    const id = request.nextUrl.searchParams.get("id");
    const message = await prisma.car_message.delete({
      where: { car_message_id: Number(id) },
    });
    if (!message) throw new Error("Erreur lors de la suppression du message");
    return new NextResponse(
      JSON.stringify({
        status: 200,
        message: "Message supprimé",
        data: message,
      })
    );
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
