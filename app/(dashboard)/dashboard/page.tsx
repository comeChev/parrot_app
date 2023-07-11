import { verifySession } from "@/utils/nextAuth/nextAuth.protections";
import { redirect } from "next/navigation";

export default async function page() {
  const hasSession = await verifySession();
  hasSession && redirect("/dashboard/cars");
  !hasSession && redirect("/login");

  return <div>dashboard</div>;
}
