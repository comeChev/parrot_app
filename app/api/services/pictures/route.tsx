import {
  verifyAdmin,
  verifyAuthorization,
} from "@/utils/nextAuth/nextAuth.protections";
import { prisma } from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const hasAuthorization = await verifyAuthorization(request);
  try {
    if (!hasAuthorization)
      return new NextResponse(JSON.stringify({ error: "Accès non autorisé" }), {
        status: 401,
      });
    //get service image by id
    if (request.nextUrl.searchParams.get("id")) {
      const id = Number(request.nextUrl.searchParams.get("id"));
      const picture = await prisma.service_picture.findUnique({
        where: { service_picture_id: id },
      });
      if (!picture) {
        throw new Error("Image non trouvée");
      }
      return new NextResponse(
        JSON.stringify({
          message: "Image trouvée",
          data: picture,
        }),
        { status: 200 }
      );
    }
    //get service images by service id
    if (request.nextUrl.searchParams.get("serviceId")) {
      const serviceId = request.nextUrl.searchParams.get("serviceId");
      const pictures = await prisma.service_picture.findMany({
        where: { service_id: Number(serviceId) },
      });
      if (!pictures) {
        throw new Error("Images non trouvées");
      }
      return new NextResponse(
        JSON.stringify({
          message: "Images trouvées",
          data: pictures,
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
  //only admin can create service image
  const isAdmin = await verifyAdmin();

  try {
    if (!isAdmin)
      return new NextResponse("Accès non autorisé", { status: 401 });

    if (!request.nextUrl.searchParams.get("serviceId")) {
      throw new Error("Service non renseigné");
    }
    const body = await request.json();
    const id = Number(request.nextUrl.searchParams.get("serviceId"));
    const picture = await prisma.service_picture.create({
      data: { ...body, service_id: id },
    });
    return new NextResponse(
      JSON.stringify({
        message: "Image ajoutée",
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

export async function PATCH(request: NextRequest) {
  //only admin can update service image
  const isAdmin = await verifyAdmin();

  try {
    if (!isAdmin)
      return new NextResponse("Accès non autorisé", { status: 401 });
    if (!request.nextUrl.searchParams.get("id")) {
      throw new Error("Image non renseignée");
    }
    const id = Number(request.nextUrl.searchParams.get("id"));
    const body = await request.json();
    const picture = await prisma.service_picture.update({
      where: { service_picture_id: id },
      data: { ...body },
    });
    return new NextResponse(
      JSON.stringify({
        message: "Image modifiée",
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

export async function DELETE(request: NextRequest) {
  //only admin can remove service image
  const isAdmin = await verifyAdmin();

  try {
    if (!isAdmin)
      return new NextResponse(JSON.stringify({ error: "Accès non autorisé" }), {
        status: 401,
      });

    if (!request.nextUrl.searchParams.get("id")) {
      throw new Error("Image non renseignée");
    }
    const id = Number(request.nextUrl.searchParams.get("id"));
    const picture = await prisma.service_picture.delete({
      where: { service_picture_id: id },
    });
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
        message: error.message,
        data: error,
      }),
      { status: error.status || 500 }
    );
  }
}
