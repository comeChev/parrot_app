import { DescriptionPin, StatusPin } from "@/components/ui/Ui.status.pin";
import Explanations, {
  TStatusPin,
} from "@/components/dashboard/ui/explanations";

import { ServiceWithPicturesAndCategory } from "@/lib/services";
import ServicesList from "@/components/dashboard/services/Services.list";
import TextMain from "@/components/dashboard/ui/text.main";
import { authOptions } from "@/utils/nextAuth/nextAuth.options";
import { getServerSession } from "next-auth";
import { prisma } from "@/utils/prisma";
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

  const explanations = [
    {
      status: "ONLINE" as TStatusPin,
      label: "En ligne et visible sur le site",
    },
    {
      status: "ARCHIVED" as TStatusPin,
      label: "Hors ligne, peut être remis en ligne.",
    },
  ];

  return (
    <div className="px-4 mt-10 min-h-screen container">
      <TextMain text="Gestion des prestations" />

      {/* explanations status */}
      <Explanations items={explanations} />

      {/* users list */}
      <ServicesList servicesDB={services} categoriesDB={categories} />
      {/* cars list */}
    </div>
  );
}
