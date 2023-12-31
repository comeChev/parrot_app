import DashboardNav from "@/components/layout/dashboard/Dashboard.nav";
import { ReactNode } from "react";
import { authOptions } from "@/utils/nextAuth/nextAuth.options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

type DashboardLayoutProps = { children: ReactNode };

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const session = await getServerSession(authOptions);
  !session && redirect("/login");
  return (
    session && (
      <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 font-body">
        <DashboardNav session={session} />
        <main className="flex-1 px-4 py-2 mt-12 md:mt-2 min-h-screen">
          {children}
        </main>
      </div>
    )
  );
}
