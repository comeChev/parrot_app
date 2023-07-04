import { verifySession } from "@/utils/nextAuth/nextAuth.protections";
import { prisma } from "@/utils/prisma";

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const hasSession = await verifySession();
  try {
    if (!hasSession)
      return new NextResponse(
        JSON.stringify({
          error: "Vous n'êtes pas autorisé à effectuer cette action",
        }),
        { status: 401 }
      );

    // get strength by id
    if (request.nextUrl.searchParams.get("id")) {
      const id = Number(request.nextUrl.searchParams.get("id"));
      const strength = await prisma.strength.findUnique({
        where: { strength_id: id },
      });
      if (!strength) throw new Error("Impossible de récupérer le point fort");
      return new NextResponse(
        JSON.stringify({
          message: "Point fort récupéré",
          data: strength,
        }),
        { status: 200 }
      );
    }
    // get all strengths
    const strengths = await prisma.strength.findMany();
    if (!strengths) throw new Error("Aucun point fort trouvé");
    return new NextResponse(
      JSON.stringify({
        message: "Points forts récupérés",
        data: strengths,
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

export async function POST(request: NextRequest) {
  const hasSession = await verifySession();
  try {
    if (!hasSession)
      return new NextResponse(
        JSON.stringify({
          error: "Vous n'êtes pas autorisé à effectuer cette action",
        }),
        { status: 401 }
      );
    const body = await request.json();
    const strength = await prisma.strength.create({
      data: body,
    });
    if (!strength) throw new Error("Impossible de créer le point fort");
    return new NextResponse(
      JSON.stringify({
        message: "Point fort créé",
        data: strength,
      }),
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        error: error.message,
      }),
      { status: 500 }
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
      throw new Error("Point fort non renseigné ");
    const id = Number(request.nextUrl.searchParams.get("id"));
    const body = await request.json();
    const strength = await prisma.strength.update({
      where: { strength_id: id },
      data: body,
    });
    if (!strength) throw new Error("Impossible de modifier le point fort");
    return new NextResponse(
      JSON.stringify({
        message: "Point fort modifié",
        data: strength,
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
        JSON.stringify({
          error: "Vous n'êtes pas autorisé à effectuer cette action",
        }),
        { status: 401 }
      );
    if (!request.nextUrl.searchParams.get("id"))
      throw new Error("Point fort non renseigné");
    const id = Number(request.nextUrl.searchParams.get("id"));
    const strength = await prisma.strength.delete({
      where: { strength_id: id },
    });
    if (!strength) throw new Error("Impossible de supprimer le point fort");
    return new NextResponse(
      JSON.stringify({
        message: "Point fort supprimé",
        data: strength,
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
