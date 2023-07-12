import UserAddOrCreate from "@/components/dashboard/users/User.add";
import UsersList from "@/components/dashboard/users/Users.list";
import UiLogoExplanation from "@/components/ui/Ui.logo.explanation";
import { authOptions } from "@/utils/nextAuth/nextAuth.options";
import { prisma } from "@/utils/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { BsKeyFill, BsSignStopFill } from "react-icons/bs";

export default async function AdminUserPage() {
  const users = await prisma.user.findMany({});
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  return (
    <div className="px-4 mt-10 min-h-screen container">
      {/* <pre>{JSON.stringify(users, null, 2)}</pre> */}
      <h2 className="text-3xl font-bold">Liste des utilisateurs</h2>

      {/* users list */}
      <UsersList usersDB={users} />
      {/* cars list */}

      <div className="">
        <UiLogoExplanation
          Icon={BsKeyFill}
          text="Vous pouvez réinitialiser le mot de passe de n’importe quel utilisateur. Un nouveau mot de passe est généré aléatoirement. L’utilisateur recevra un email avec son nouveau mot de passe."
        />
        <UiLogoExplanation
          Icon={BsSignStopFill}
          text="Vous pouvez bloquer l’accès temporairement à un employé (arrêt maladie, absence ...) ou définitivement (départ de l’entreprise)."
        />
      </div>
    </div>
  );
}
