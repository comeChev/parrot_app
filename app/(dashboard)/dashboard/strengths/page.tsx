import StrengthsList from "@/components/dashboard/strengths/Strengths.list";
import { prisma } from "@/utils/prisma";

export default async function AdminStrengthPage() {
  const strengths = await prisma.strength.findMany();

  return (
    <div className="px-4 mt-10 min-h-screen container">
      {/* <pre>{JSON.stringify(users, null, 2)}</pre> */}
      <h2 className="text-3xl font-bold">Liste des points forts</h2>
      <p className="text-sm italic font-light">
        Poins forts utilisés pour la création des annonces des voitures
      </p>

      <StrengthsList strengthsDB={strengths} />
    </div>
  );
}
