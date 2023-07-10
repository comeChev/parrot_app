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
    // get car by id
    if (request.nextUrl.searchParams.get("id")) {
      const id = Number(request.nextUrl.searchParams.get("id"));
      const car = await prisma.car.findUnique({
        where: { car_id: id },
        include: {
          car_messages: true,
          car_pictures: true,
          car_strengths: true,
        },
      });
      if (!car) throw new Error("Impossible de récupérer la voiture");
      return new NextResponse(
        JSON.stringify({
          message: "Voiture récupérée",
          data: car,
        }),
        { status: 200 }
      );
    }
    // get all cars
    const cars = await prisma.car.findMany({
      include: {
        car_messages: true,
        car_pictures: true,
        car_strengths: true,
      },
    });
    if (!cars) throw new Error("Aucune voiture trouvée");
    return new NextResponse(
      JSON.stringify({
        message: "Voitures récupérées",
        data: cars,
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
      return new NextResponse(JSON.stringify({ error: "Accès non autorisé" }), {
        status: 401,
      });
    const body = await request.json();
    //const year = new Date(body.car_year, 1);
    let carToCreate = { ...body };
    let strengths = [];
    let pictures = [];
    if (body.car_strengths) {
      strengths = body.car_strengths;
      delete carToCreate.strengths;
    }
    if (body.car_pictures) {
      pictures = body.car_pictures;
      delete carToCreate.pictures;
    }
    const car = await prisma.car.create({
      data: {
        ...carToCreate,
        car_strengths: { create: [...strengths] },
        car_pictures: { create: [...pictures] },
      },
      include: { car_pictures: true, car_strengths: true, car_messages: true },
    });
    if (!car) throw new Error("Impossible de créer la voiture");
    return new NextResponse(
      JSON.stringify({
        message: "Voiture créée",
        data: car,
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
      return new NextResponse(JSON.stringify({ error: "Accès non autorisé" }), {
        status: 401,
      });

    if (!request.nextUrl.searchParams.get("id"))
      throw new Error("Voiture non renseignée");

    const id = Number(request.nextUrl.searchParams.get("id"));
    const body = await request.json();

    let carToUpdate = { ...body };
    if (body.car_year) {
      const year = new Date(body.car_year, 1);
      carToUpdate = { ...body, car_year: year };
    } else {
      carToUpdate = { ...body };
    }
    let strengths = [];
    let pictures = [];
    let messages = [];

    if (body.car_strengths) {
      strengths = body.car_strengths;
      delete carToUpdate.car_strengths;
    }
    if (body.car_pictures) {
      pictures = body.car_pictures;
      delete carToUpdate.car_pictures;
    }
    if (body.car_messages) {
      messages = body.car_messages;
      delete carToUpdate.car_messages;
    }
    const car = await prisma.car.update({
      where: { car_id: id },
      data: {
        ...carToUpdate,
        car_strengths: {
          deleteMany: { car_id: id },
          create: [...strengths],
        },
        car_pictures: {
          deleteMany: { car_id: id },
          create: [...pictures],
        },
        car_messages: {
          deleteMany: { car_id: id },
          create: [...messages],
        },
      },
      include: {
        car_pictures: true,
        car_strengths: true,
        car_messages: true,
      },
    });
    if (!car) throw new Error("Impossible de mettre à jour la voiture");
    return new NextResponse(
      JSON.stringify({
        message: "Voiture mise à jour",
        data: car,
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
  if (!hasSession)
    return new NextResponse(JSON.stringify({ error: "Accès non autorisé" }), {
      status: 401,
    });
  try {
    if (!request.nextUrl.searchParams.get("id"))
      throw new Error("Voiture non renseignée");
    const id = Number(request.nextUrl.searchParams.get("id"));
    const car = await prisma.car.delete({
      where: { car_id: id },
    });
    if (!car) throw new Error("Impossible de supprimer la voiture");
    return new NextResponse(
      JSON.stringify({
        message: "Voiture supprimée",
        data: car,
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