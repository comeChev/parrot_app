import { DescriptionPin, StatusPin } from "@/components/ui/Ui.status.pin";
import Explanations, {
  TExplanation,
} from "@/components/dashboard/ui/explanations";

import TextMain from "@/components/dashboard/ui/text.main";
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

  const explanations: TExplanation[] = [
    { status: "ONLINE", label: "Actif et visible sur le site." },
    { status: "OFFLINE", label: "Inactif et ne peut pas se connecter." },
  ];
  return (
    <div className="px-4 mt-10 min-h-screen container">
      {/* <pre>{JSON.stringify(users, null, 2)}</pre> */}
      <TextMain text="Gestion des utilisateurs" />

      {/* explanations status */}
      <Explanations items={explanations} />

      {/* users list */}
      <UsersList usersDB={users} />
      {/* cars list */}
    </div>
  );
}
