import { DescriptionPin, StatusPin } from "@/components/ui/Ui.status.pin";

import UsersList from "@/components/dashboard/users/Users.list";
import { authOptions } from "@/utils/nextAuth/nextAuth.options";
import { getServerSession } from "next-auth";
import { getUsers } from "@/lib/sql/users";
import { prisma } from "@/utils/prisma";
import { redirect } from "next/navigation";

export default async function AdminUserPage() {
  // const users = await prisma.user.findMany({});
  const users = await getUsers();
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  return (
    <div className="px-4 mt-10 min-h-screen container">
      {/* <pre>{JSON.stringify(users, null, 2)}</pre> */}
      <h2 className="text-3xl font-bold">Liste des utilisateurs</h2>

      {/* explanations status */}
      <div className="flex items-center mt-5">
        <div className="flex flex-col">
          <div className="flex mb-1 items-center">
            <StatusPin status="ONLINE" />
            <DescriptionPin label="Utilisateur actif. Visible sur la page de l'équipe." />
          </div>
          <div className="flex mb-1 items-center">
            <StatusPin status="OFFLINE" />
            <DescriptionPin label="Utilisateur inactif. Non visible sur la page de l'équipe." />
          </div>
        </div>
      </div>
      {/* users list */}
      <UsersList usersDB={users} />
      {/* cars list */}
    </div>
  );
}
