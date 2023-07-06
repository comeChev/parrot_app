import { Strength } from "@prisma/client";

export async function getStrengths() {
  const strengths = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/strengths`,
    { method: "GET" }
  );
  const strengthsJson = await strengths.json();
  if (strengthsJson.error) {
    alert("Une erreur est survenue lors de la récupération des points forts");
    return [];
  }
  return strengthsJson.data;
}

export async function getStrength(id: number) {
  const strength = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/strengths?id=${id}`,
    { method: "GET" }
  );
  const strengthJson = await strength.json();
  if (strengthJson.error) {
    alert("Une erreur est survenue lors de la récupération du point fort");
    return null;
  }
  return strengthJson.data;
}

export async function createStrength(strength: Partial<Strength>) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/strengths`,
    {
      method: "POST",
      body: JSON.stringify(strength),
    }
  );
  const responseJson = await response.json();
  if (responseJson.error) {
    alert("Une erreur est survenue lors de la création du point fort");
    return null;
  }
  return responseJson.data;
}

export async function updateStrength(id: number, strength: Partial<Strength>) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/strengths?id=${id}`,
    {
      method: "PATCH",
      body: JSON.stringify(strength),
      headers: { "Content-Type": "application/json" },
    }
  );
  const responseJson = await response.json();
  if (responseJson.error) {
    alert("Une erreur est survenue lors de la mise à jour du point fort");
    return null;
  }
  return responseJson.data;
}

export async function deleteStrength(id: number) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/strengths?id=${id}`,
    {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }
  );
  const responseJson = await response.json();
  if (responseJson.error) {
    alert("Une erreur est survenue lors de la suppression du point fort");
    return null;
  }
  return responseJson.data;
}
