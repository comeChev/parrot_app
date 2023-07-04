import {
  verifyAdmin,
  verifyAuthorization,
} from "@/utils/nextAuth/nextAuth.protections";
import { prisma } from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const isVerified = await verifyAuthorization(request);
  try {
    //check if api key is verified or user is authenticated
    if (!isVerified) {
      return new NextResponse("Accès non autorisé", { status: 401 });
    }

    //get service by id
    if (request.nextUrl.searchParams.get("id")) {
      const id = Number(request.nextUrl.searchParams.get("id"));
      const service = await prisma.service.findUnique({
        where: { service_id: id },
        include: { service_images: true },
      });
      if (!service) {
        throw new Error("Erreur dans la récupération du service");
      }
      return new NextResponse(
        JSON.stringify({
          message: "Service récupéré avec succès",
          data: service,
        }),
        { status: 200 }
      );
    }
    //get all services
    const services = await prisma.service.findMany({
      include: { service_images: true },
    });
    if (!services || services.length === 0) {
      throw new Error("Aucun service à afficher");
    }
    return new NextResponse(
      JSON.stringify({
        message: "Services récupérés avec succès",
        data: services,
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
  //check if user is admin
  const isAdmin = await verifyAdmin();

  try {
    if (!isAdmin)
      return new NextResponse("Accès non autorisé", { status: 401 });
    const body = await request.json();
    const images = body.service_images || [];
    const serviceToCreate = { ...body };
    delete serviceToCreate.service_images;
    const service = await prisma.service.create({
      data: { ...serviceToCreate, service_images: { create: [...images] } },
      include: { service_images: true },
    });
    if (!service) {
      throw new Error("Erreur dans la création du service");
    }
    return new NextResponse(
      JSON.stringify({
        message: "Service créé avec succès",
        data: service,
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
  //check if user is admin
  const isAdmin = await verifyAdmin();
  if (!isAdmin)
    return new NextResponse(JSON.stringify({ error: "Accès non autorisé" }), {
      status: 401,
    });

  try {
    if (!request.nextUrl.searchParams.get("id")) {
      throw new Error("Aucun id de service à modifier");
    }
    const id = Number(request.nextUrl.searchParams.get("id"));
    const body = await request.json();
    const images = body.service_images || [];
    const serviceToUpdate = { ...body };
    delete serviceToUpdate.service_images;

    //update service
    //we delete all the images linked to the service
    //we create new ones (old images are stored in the body of the request)
    let service = null;
    if (images.length > 0) {
      service = await prisma.service.update({
        where: { service_id: id },
        data: {
          ...serviceToUpdate,
          service_images: {
            deleteMany: { service_id: id },
            createMany: { data: images, skipDuplicates: true },
          },
        },
        include: { service_images: true },
      });
    } else {
      service = await prisma.service.update({
        where: { service_id: id },
        data: {
          ...serviceToUpdate,
        },
        include: { service_images: true },
      });
    }
    if (!service) {
      throw new Error("Erreur dans la modification du service");
    }
    return new NextResponse(
      JSON.stringify({
        message: "Service modifié avec succès",
        data: service,
      }),
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error.message);
    return new NextResponse(
      JSON.stringify({
        error: error.message,
      }),
      { status: error.status || 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  //check if user is admin
  const isAdmin = await verifyAdmin();

  try {
    if (!isAdmin)
      return new NextResponse(JSON.stringify({ error: "Accès non autorisé" }), {
        status: 401,
      });

    if (!request.nextUrl.searchParams.get("id")) {
      throw new Error("Aucun id de service à supprimer");
    }

    const id = Number(request.nextUrl.searchParams.get("id"));
    const service = await prisma.service.delete({
      where: { service_id: id },
    });
    if (!service) {
      throw new Error("Erreur dans la suppression du service");
    }
    return new NextResponse(
      JSON.stringify({
        message: "Service supprimé avec succès",
        data: service,
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
