import MessagesTable from "@/components/dashboard/messages/Messages.table";
import UiUnderConstruction from "@/components/ui/Ui.underConstruction";
import { prisma } from "@/utils/prisma";

export default async function AdminProfilePage() {
  return (
    <div className="px-4 mt-10 min-h-screen container">
      {/* <pre>{JSON.stringify(users, null, 2)}</pre> */}
      <h2 className="text-3xl font-bold">Page de profil</h2>

      <UiUnderConstruction />
    </div>
  );
}
