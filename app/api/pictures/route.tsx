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
      return new NextResponse(
        JSON.stringify({ error: "Vous n'êtes pas autorisé" }),
        { status: 401 }
      );

    //get picture by id
    if (request.nextUrl.searchParams.get("id")) {
      const id = Number(request.nextUrl.searchParams.get("id"));
      const picture = await prisma.picture.findUnique({
        where: { picture_id: id },
      });
      if (!picture)
        return new NextResponse(
          JSON.stringify({ error: "Cette image n'existe pas !" }),
          { status: 404 }
        );

      return new NextResponse(
        JSON.stringify({
          message: "Image trouvée !",
          data: picture,
        }),
        { status: 200 }
      );
    }

    //get all pictures
    const pictures = await prisma.picture.findMany();
    if (pictures.length === 0) {
      return new NextResponse(
        JSON.stringify({ message: "Aucune image trouvée !", data: [] }),
        { status: 200 }
      );
    }
    return new NextResponse(
      JSON.stringify({
        message: "Images trouvées !",
        data: pictures,
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
  const hasSession = await verifySession();

  try {
    if (!hasSession)
      return new NextResponse(
        JSON.stringify({ error: "Vous n'êtes pas autorisé" }),
        { status: 401 }
      );
    const body = await request.json();
    const picture = await prisma.picture.create({ data: body });
    if (!picture) {
      return new NextResponse(
        JSON.stringify({ error: "Erreur lors de la création de l'image" }),
        {
          status: 500,
        }
      );
    }
    return new NextResponse(
      JSON.stringify({
        message: "Image créée avec succès",
        data: picture,
      }),
      { status: 200 }
    );
  } catch (error: any) {
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
        JSON.stringify({ error: "Vous n'êtes pas autorisé" }),
        { status: 401 }
      );

    if (!request.nextUrl.searchParams.get("id")) {
      throw new Error("Aucun id n'a été fourni");
    }
    const id = Number(request.nextUrl.searchParams.get("id"));
    const body = await request.json();
    const picture = await prisma.picture.update({
      where: { picture_id: id },
      data: body,
    });
    if (!picture) {
      throw new Error("Erreur lors de la modification de l'image");
    }
    return new NextResponse(
      JSON.stringify({
        message: "Image modifiée avec succès",
        data: picture,
      }),
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: error.status || 500,
    });
  }
}

export async function DELETE(request: NextRequest) {
  const hasSession = await verifySession();
  try {
    if (!hasSession)
      return new NextResponse(
        JSON.stringify({ error: "Vous n'êtes pas autorisé" }),
        { status: 401 }
      );

    if (!request.nextUrl.searchParams.get("id")) {
      throw new Error("Aucun id n'a été fourni");
    }
    const id = Number(request.nextUrl.searchParams.get("id"));
    const picture = await prisma.picture.delete({
      where: { picture_id: id },
    });
    if (!picture) {
      throw new Error("Erreur lors de la suppression de l'image");
    }
    return new NextResponse(
      JSON.stringify({
        message: "Image supprimée avec succès",
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
