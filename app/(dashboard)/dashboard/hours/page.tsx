import Explanations, {
  TExplanation,
} from "@/components/dashboard/ui/explanations";

import HoursTable from "@/components/dashboard/hours/Hours.table";
import TextMain from "@/components/dashboard/ui/text.main";
import { authOptions } from "@/utils/nextAuth/nextAuth.options";
import { filterArrayWeedDays } from "@/utils/globals";
import { getServerSession } from "next-auth";
import { prisma } from "@/utils/prisma";
import { redirect } from "next/navigation";

export default async function AdminHoursPage() {
  const hours = await prisma.hour
    .findMany()
    .then((res) => filterArrayWeedDays(res));
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  const explanations: TExplanation[] = [
    {
      status: "READ",
      label: "Garage fermé, peut être rouvert en cliquant sur la porte.",
    },
    {
      status: "OFFLINE",
      label: "Garage ouvert, peut être fermé en cliquant sur la porte",
    },
  ];
  return (
    <div className="px-4 mt-10 min-h-screen container">
      {/* <pre>{JSON.stringify(users, null, 2)}</pre> */}
      <TextMain text="Gestion des horaires" />

      <Explanations items={explanations} />

      <HoursTable hoursDB={hours} />
    </div>
  );
}
