import { NextRequest, NextResponse } from "next/server";
import {
  verifyAuthorization,
  verifySession,
} from "@/utils/nextAuth/nextAuth.protections";

import { prisma } from "@/utils/prisma";

export async function GET(request: NextRequest) {
  const hasSession = await verifySession();

  try {
    if (!hasSession) {
      return new NextResponse(
        JSON.stringify({ error: "Vous n'êtes pas connecté" }),
        { status: 401 }
      );
    }
    //get message by id
    if (request.nextUrl.searchParams.get("id")) {
      const id = Number(request.nextUrl.searchParams.get("id"));
      const message = await prisma.message.findUnique({
        where: { message_id: id },
      });
      if (!message) {
        return new NextResponse(
          JSON.stringify({ error: "Message non trouvé" }),
          { status: 400 }
        );
      }
      return new NextResponse(
        JSON.stringify({
          message: "Message récupéré avec succès",
          data: message,
        }),
        { status: 200 }
      );
    }

    //get all messages
    const messages = await prisma.message.findMany({});
    if (messages.length === 0) {
      return new NextResponse(
        JSON.stringify({
          error: "Aucun message trouvé",
        }),
        { status: 404 }
      );
    }
    return new NextResponse(
      JSON.stringify({
        message: "Messages récupérés avec succès",
        data: messages,
      }),
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: error.status || 500,
    });
  }
}

export async function POST(request: NextRequest) {
  const isAuthorized = await verifyAuthorization(request);
  try {
    if (!isAuthorized)
      return new NextResponse(
        JSON.stringify({ error: "Vous n'êtes pas autorisé" }),
        { status: 401 }
      );
    const body = await request.json();
    const message = await prisma.message.create({
      data: body,
    });
    return new NextResponse(
      JSON.stringify({
        message: "Message créé avec succès",
        data: message,
      }),
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error);
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: error.status || 500,
    });
  }
}

export async function PATCH(request: NextRequest) {
  const hasSession = await verifySession();

  try {
    if (!hasSession)
      return new NextResponse(
        JSON.stringify({ error: "Vous n'êtes pas connecté" }),
        { status: 401 }
      );
    if (!request.nextUrl.searchParams.get("id"))
      return new NextResponse(
        JSON.stringify({ error: "Aucun message trouvé" }),
        { status: 400 }
      );
    const id = Number(request.nextUrl.searchParams.get("id"));
    const body = await request.json();
    const message = await prisma.message.update({
      where: { message_id: id },
      data: body,
    });
    if (!message)
      return new NextResponse(JSON.stringify({ error: "Message non trouvé" }), {
        status: 404,
      });
    return new NextResponse(
      JSON.stringify({
        message: "Message modifié avec succès",
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
  const hasSession = await verifySession();
  try {
    if (!hasSession)
      return new NextResponse(
        JSON.stringify({ error: "Vous n'êtes pas connecté" }),
        { status: 401 }
      );

    if (!request.nextUrl.searchParams.get("id"))
      return new NextResponse(JSON.stringify({ error: "Message manquant" }), {
        status: 400,
      });

    const id = Number(request.nextUrl.searchParams.get("id"));
    const message = await prisma.message.delete({ where: { message_id: id } });
    return new NextResponse(
      JSON.stringify({
        message: "Message supprimé avec succès",
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
