import ServicesList from "@/components/dashboard/services/Services.list";
import { ServiceWithPicturesAndCategory } from "@/lib/services";
import { authOptions } from "@/utils/nextAuth/nextAuth.options";
import { prisma } from "@/utils/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function AdminServicesPage() {
  const services: ServiceWithPicturesAndCategory[] =
    await prisma.service.findMany({
      include: { service_images: true, category: true },
    });

  const categories = await prisma.category.findMany();

  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  return (
    <div className="px-4 mt-10 min-h-screen container">
      {/* <pre>{JSON.stringify(users, null, 2)}</pre> */}
      <h2 className="text-3xl font-bold">Liste des prestations</h2>

      {/* users list */}
      <ServicesList servicesDB={services} categoriesDB={categories} />
      {/* cars list */}
    </div>
  );
}
