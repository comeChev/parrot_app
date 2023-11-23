import PicturesList from "@/components/dashboard/pictures/Pictures.list";
import TextMain from "@/components/dashboard/ui/text.main";
import { authOptions } from "@/utils/nextAuth/nextAuth.options";
import { getServerSession } from "next-auth";
import { prisma } from "@/utils/prisma";
import { redirect } from "next/navigation";

export default async function AdminPicturesPage() {
  const pictures = await prisma.picture.findMany({});
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  return (
    <div className="px-4 mt-10 min-h-screen container">
      <TextMain text="Gestion des photos" />

      {/* Pictures list */}
      <PicturesList picturesDB={pictures} />
    </div>
  );
}
