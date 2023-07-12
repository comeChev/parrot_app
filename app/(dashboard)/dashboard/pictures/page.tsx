import PicturesList from "@/components/dashboard/pictures/Pictures.list";
import { authOptions } from "@/utils/nextAuth/nextAuth.options";
import { prisma } from "@/utils/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function AdminUserPage() {
  const pictures = await prisma.picture.findMany({});
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  return (
    <div className="px-4 mt-10 min-h-screen container">
      {/* <pre>{JSON.stringify(users, null, 2)}</pre> */}
      <h2 className="text-3xl font-bold">Galerie de photos</h2>

      {/* users list */}
      <PicturesList picturesDB={pictures} />
      {/* cars list */}
    </div>
  );
}
