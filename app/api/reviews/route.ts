import { NextRequest, NextResponse } from "next/server";
import { verifyAuthorization, verifySession } from "@/utils/nextAuth/nextAuth.protections";

import { prisma } from "@/utils/prisma";

export async function GET(request: NextRequest) {
  const isAuthorized = await verifyAuthorization(request);
  const hasSession = await verifySession();

  try {
    if (!isAuthorized)
      return new NextResponse(
        JSON.stringify({
          error: "Vous n'êtes pas autorisé à effectuer cette action",
        }),
        { status: 401 }
      );

    if (hasSession) {
      //get review by id
      if (request.nextUrl.searchParams.get("id")) {
        const id = Number(request.nextUrl.searchParams.get("id"));
        const review = await prisma.review.findUnique({
          where: { review_id: id },
        });
        if (!review) {
          throw new Error("Aucune review trouvée");
        }
        return new NextResponse(
          JSON.stringify({
            status: 200,
            message: "Review récupérée avec succès",
            data: review,
          })
        );
      }

      //get all reviews
      const reviews = await prisma.review.findMany({});
      if (!reviews) {
        throw new Error("Aucune review trouvée");
      }

      return new NextResponse(
        JSON.stringify({
          message: "Liste des reviews récupérée avec succès",
          data: reviews,
        }),
        { status: 200 }
      );
    }

    // for site visitors
    if (isAuthorized) {
      //get fresh reviews
      if (request.nextUrl.searchParams.get("fresh")) {
        const take = Number(request.nextUrl.searchParams.get("fresh"));
        const reviews = await prisma.review.findMany({
          where: { review_status: "ONLINE" },
          orderBy: { review_id: "desc" },
          take,
        });
        if (!reviews) {
          throw new Error("Aucune review trouvée");
        }
        return new NextResponse(
          JSON.stringify({
            message: "Liste des 3 reviews les plus récentes récupérée avec succès",
            data: reviews,
          }),
          { status: 200 }
        );
      }

      //get all reviews if online
      const reviews = await prisma.review.findMany({
        where: { review_status: "ONLINE" },
        orderBy: { review_id: "desc" },
      });
      if (!reviews) {
        throw new Error("Aucune review trouvée");
      }

      return new NextResponse(
        JSON.stringify({
          message: "Liste des reviews en ligne récupérée avec succès",
          data: reviews,
        }),
        { status: 200 }
      );
    }
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
  const isAuthorized = await verifyAuthorization(request);
  try {
    if (!isAuthorized)
      return new NextResponse(
        JSON.stringify({
          error: "Vous n'êtes pas autorisé à effectuer cette action",
        }),
        { status: 401 }
      );
    const body = await request.json();
    const review = await prisma.review.create({
      data: body,
    });
    return new NextResponse(
      JSON.stringify({
        message: "Review créée avec succès",
        data: review,
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
    if (!request.nextUrl.searchParams.get("id")) {
      throw new Error("Aucun id fourni");
    }
    const id = Number(request.nextUrl.searchParams.get("id"));
    const body = await request.json();
    const review = await prisma.review.update({
      where: { review_id: id },
      data: body,
    });
    return new NextResponse(
      JSON.stringify({
        message: "Review modifiée avec succès",
        data: review,
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
    if (!request.nextUrl.searchParams.get("id")) {
      throw new Error("Aucun id fourni");
    }
    const id = Number(request.nextUrl.searchParams.get("id"));
    const review = await prisma.review.delete({ where: { review_id: id } });
    if (!review) {
      throw new Error("Aucune review trouvée");
    }
    return new NextResponse(
      JSON.stringify({
        message: "Review supprimée avec succès",
        data: review,
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
