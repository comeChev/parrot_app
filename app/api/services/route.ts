import {
  verifyAdmin,
  verifyAuthorization,
} from "@/utils/nextAuth/nextAuth.protections";
import { prisma } from "@/utils/prisma";
import { Service_picture } from "@prisma/client";
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

    //get services by category name
    if (request.nextUrl.searchParams.get("category")) {
      const name = request.nextUrl.searchParams.get("category");

      const services = await prisma.service.findMany({
        where: { category: { category_name_url: name as string } },
        include: { service_images: true, category: true },
      });

      if (!services)
        throw new Error("Erreur dans la récupération des services");

      // const servicesByCategory = services.filter(
      //   (service) => service.category.category_name_url === name
      // );

      return new NextResponse(
        JSON.stringify({
          data: services,
          message: "Services récupérés avec succès",
        }),
        { status: 200 }
      );
    }

    //get all services
    const services = await prisma.service.findMany({
      include: { service_images: true, category: true },
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
    const images = [...body.service_images];
    const serviceToCreate = { ...body };
    delete serviceToCreate.service_images;
    delete serviceToCreate.category_id;
    delete serviceToCreate.category;

    //delele all images from the db before creating new ones
    //we do this because we don't want to have images in the db that are not linked to a service
    const response = await prisma.service_picture.deleteMany({
      where: { service_id: undefined },
    });

    const service = await prisma.service.create({
      data: {
        ...serviceToCreate,
        service_images: { create: [...images] },
        category: { connect: { category_id: Number(body.category_id) } },
      },
      include: { service_images: true, category: true },
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
    const images: Service_picture[] = [...body.service_images];
    const imagesToCreate = images.map((image) => {
      let imageToCreate = {
        service_picture_image: image.service_picture_image,
        service_picture_fileKey: image.service_picture_fileKey,
        service_picture_name: image.service_picture_name,
      };
      return imageToCreate;
    });

    const serviceToUpdate = { ...body };
    delete serviceToUpdate.service_id;
    delete serviceToUpdate.service_images;
    delete serviceToUpdate.category_id;
    delete serviceToUpdate.category;

    //update service
    //we delete all the images linked to the service
    //we create new ones (old images are stored in the body of the request)

    const response = await prisma.service_picture.deleteMany({
      where: { service_id: id },
    });
    if (!response)
      throw new Error("Erreur dans la suppression des images du service");

    const service = await prisma.service.update({
      where: { service_id: id },
      data: {
        ...serviceToUpdate,

        service_images: { create: [...imagesToCreate] },
        category: { connect: { category_id: Number(body.category_id) } },
      },
    });

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
