import { Picture } from "@prisma/client";

export async function getPictures() {
  const pictures = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/pictures`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
      },
      next: { revalidate: 60 * 60 },
    }
  );
  const picturesJson = await pictures.json();
  if (picturesJson.error) {
    return [];
  }
  return picturesJson.data;
}

export async function createPicture(picture: Partial<Picture>) {
  const pictures = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/pictures`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(picture),
    }
  );
  const picturesJson = await pictures.json();
  if (picturesJson.error) {
    return null;
  }
  return picturesJson.data;
}

export async function deletePicture(id: number) {
  const pictures = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/pictures?id=${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const picturesJson = await pictures.json();
  if (picturesJson.error) {
    return null;
  }
  return picturesJson.data;
}

export async function updatePicture(id: number, picture: Partial<Picture>) {
  const pictures = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/pictures?id=${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(picture),
    }
  );
  const picturesJson = await pictures.json();
  if (picturesJson.error) {
    return null;
  }
  return picturesJson.data;
}
