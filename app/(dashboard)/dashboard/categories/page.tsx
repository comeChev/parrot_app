import CategoriesList from "@/components/dashboard/categories/Categories.list";
import { DescriptionPin, StatusPin } from "@/components/ui/Ui.status.pin";
import { authOptions } from "@/utils/nextAuth/nextAuth.options";
import { prisma } from "@/utils/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function AdminServicesPage() {
  const categories = await prisma.category.findMany();
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  return (
    <div className="px-4 mt-10 min-h-screen container">
      {/* <pre>{JSON.stringify(users, null, 2)}</pre> */}
      <h2 className="text-3xl font-bold">Liste des catégories</h2>

      {/* explanations status */}
      <div className="flex items-center mt-5">
        <div className="flex flex-col">
          <div className="flex mb-1 items-center">
            <StatusPin status="ONLINE" />
            <DescriptionPin label="Service actuellement en ligne et visible sur le site" />
          </div>
          <div className="flex mb-1 items-center">
            <StatusPin status="ARCHIVED" />
            <DescriptionPin label="Service actuellement hors ligne. Peut être remis en ligne." />
          </div>
        </div>
      </div>

      {/* categories list */}
      <CategoriesList categoriesDB={categories} />
    </div>
  );
}
