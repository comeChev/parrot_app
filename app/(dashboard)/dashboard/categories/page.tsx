import { DescriptionPin, StatusPin } from "@/components/ui/Ui.status.pin";

import CategoriesList from "@/components/dashboard/categories/Categories.list";
import TextMain from "@/components/dashboard/ui/text.main";
import { authOptions } from "@/utils/nextAuth/nextAuth.options";
import { getServerSession } from "next-auth";
import { prisma } from "@/utils/prisma";
import { redirect } from "next/navigation";

export default async function AdminServicesPage() {
  const categories = await prisma.category.findMany({});
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  return (
    <div className="px-4 mt-10 min-h-screen container">
      <TextMain text="Liste des catégories" />

      {/* categories list */}
      <CategoriesList categoriesDB={categories} />
    </div>
  );
}
