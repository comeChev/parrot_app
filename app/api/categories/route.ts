import { verifySession } from "@/utils/nextAuth/nextAuth.protections";
import { prisma } from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    //get category by id
    if (request.nextUrl.searchParams.get("id")) {
      const id = Number(request.nextUrl.searchParams.get("id"));
      const category = await prisma.category.findUnique({
        where: { category_id: id },
      });
      if (!category) {
        throw new Error("Erreur dans la récupération de la catégorie");
      }
      return new NextResponse(
        JSON.stringify({
          message: "Catégorie récupérée avec succès",
          data: category,
        }),
        { status: 200 }
      );
    }

    //get all categories
    const categories = await prisma.category.findMany();
    if (!categories || categories.length === 0) {
      throw new Error("Aucune catégorie à afficher");
    }
    return new NextResponse(
      JSON.stringify({
        message: "Catégories récupérées avec succès",
        data: categories,
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
    const category = await prisma.category.create({
      data: body,
    });
    if (!category) {
      throw new Error("Erreur dans la création de la catégorie");
    }
    return new NextResponse(
      JSON.stringify({
        status: 200,
        message: "Catégorie créée avec succès",
        data: category,
      })
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

    if (!request.nextUrl.searchParams.get("id")) {
      throw new Error("Aucune catégorie trouvée");
    }
    const id = Number(request.nextUrl.searchParams.get("id"));
    const body = await request.json();
    const category = await prisma.category.update({
      where: { category_id: id },
      data: body,
    });
    if (!category) {
      throw new Error("Erreur dans la modification de la catégorie");
    }
    return new NextResponse(
      JSON.stringify({
        message: "Catégorie modifiée avec succès",
        data: category,
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
      return new NextResponse(JSON.stringify({ error: "Accès non autorisé" }), {
        status: 401,
      });
    if (!request.nextUrl.searchParams.get("id")) {
      throw new Error("Aucune catégorie trouvée");
    }
    const id = Number(request.nextUrl.searchParams.get("id"));
    const category = await prisma.category.delete({
      where: { category_id: id },
    });
    if (!category) {
      throw new Error("Erreur dans la suppression de la catégorie");
    }
    return new NextResponse(
      JSON.stringify({
        message: "Catégorie supprimée avec succès",
        data: category,
      }),
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        error: error.message,
        data: error,
      }),
      { status: error.status || 500 }
    );
  }
}
