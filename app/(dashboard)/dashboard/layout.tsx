import { ReactNode } from "react";
import DashboardNav from "@/components/layout/dashboard/Dashboard.nav";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/nextAuth/nextAuth.options";
import { redirect } from "next/navigation";

type DashboardLayoutProps = { children: ReactNode };

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const session = await getServerSession(authOptions);
  !session && redirect("/login");
  return (
    session && (
      <div className="flex flex-col sm:flex-row min-h-screen font-title">
        <DashboardNav session={session} />
        <main className="flex-1 px-4 py-2">{children}</main>
      </div>
    )
  );
}
