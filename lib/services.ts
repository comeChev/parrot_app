import { Category, Service, Service_picture } from "@prisma/client";

import { deleteFile } from "@/utils/supabase.upload";

export interface ServiceWithPictures extends Service {
  service_images: Partial<Service_picture>[];
}

export interface ServiceWithPicturesAndCategory extends ServiceWithPictures {
  category: Category;
}

export async function getServicesWithPictures(): Promise<
  ServiceWithPicturesAndCategory[]
> {
  const services = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/services`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
      },
    }
  );
  const servicesJson = await services.json();
  if (servicesJson.error) {
    return [];
  }
  return servicesJson.data;
}

export async function getServiceWithPictures(id: number) {
  const service = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/services?id=${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
      },
    }
  );
  const serviceJson = await service.json();
  if (serviceJson.error) {
    return null;
  }
  return serviceJson.data;
}

export async function createService(service: Partial<ServiceWithPictures>) {
  const newService = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/services`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(service),
    }
  );
  const newServiceJson = await newService.json();
  if (newServiceJson.error) {
    return null;
  }
  return newServiceJson.data;
}

export async function updateService(
  id: number,
  service: Partial<ServiceWithPictures>
) {
  const updatedService = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/services?id=${id}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(service),
    }
  );
  const updatedServiceJson = await updatedService.json();
  if (updatedServiceJson.error) {
    return null;
  }
  return updatedServiceJson.data;
}

export async function deleteService(id: number) {
  const deletedService = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/services?id=${id}`,
    {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }
  );
  const deletedServiceJson = await deletedService.json();
  if (deletedServiceJson.error) {
    return null;
  }
  return deletedServiceJson.data;
}

// -----------------------------

export async function createServicePicture(
  serviceId: number,
  picture: Partial<Service_picture>
) {
  const newServicePicture = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/services/pictures?serviceId=${serviceId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(picture),
    }
  );
  const newServicePictureJson = await newServicePicture.json();
  if (newServicePictureJson.error) {
    return null;
  }
  return newServicePictureJson.data;
}

export async function deleteServicePicture(picture: Service_picture) {
  // first delete the picture from the supabase storage
  const { data, success } = await deleteFile(picture.service_picture_fileKey);
  if (!success) return null;
  // then delete the picture from the database
  const deletedServicePicture = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/services/pictures?id=${picture.service_picture_id}`,
    { method: "DELETE", headers: { "Content-Type": "application/json" } }
  );
  const deletedServicePictureJson = await deletedServicePicture.json();
  if (deletedServicePictureJson.error) {
    return null;
  }
  return deletedServicePictureJson.data;
}

export async function getServicesByCategory(name: string) {
  const services = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/services?category=${name}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
      },
      next: { revalidate: 60 * 60 },
    }
  );
  const servicesJson = await services.json();
  if (servicesJson.error) {
    return [];
  }
  return servicesJson.data;
}
