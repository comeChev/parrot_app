import HoursTable from "@/components/dashboard/hours/Hours.table";
import PicturesList from "@/components/dashboard/pictures/Pictures.list";
import UiLogoExplanation from "@/components/ui/Ui.logo.explanation";
import Table from "@/components/ui/table/Table";
import TableHeader, {
  TableHeaderProps,
} from "@/components/ui/table/Table.header";
import { authOptions } from "@/utils/nextAuth/nextAuth.options";
import { prisma } from "@/utils/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { BsDoorOpenFill, BsPenFill } from "react-icons/bs";

export default async function AdminHoursPage() {
  const hours = await prisma.hour.findMany({});
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  return (
    <div className="px-4 mt-10 min-h-screen container">
      {/* <pre>{JSON.stringify(users, null, 2)}</pre> */}
      <h2 className="text-3xl font-bold">Gestion des horaires</h2>

      <HoursTable hoursDB={hours} />
    </div>
  );
}
