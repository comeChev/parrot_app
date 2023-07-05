import Image from "next/image";
import logo from "@/public/logo-parrot.png";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/nextAuth/nextAuth.options";
import { ReactNode } from "react";
import Link from "next/link";
import DashboardNavLink from "@/components/layout/dashboard/Dashboard.nav.link";
import DashboardNavLogoutButton from "@/components/layout/dashboard/Dashboard.nav.logout.button";
import DashboardNav from "@/components/layout/dashboard/Dashboard.nav";

type DashboardLayoutProps = { children: ReactNode };

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex flex-col sm:flex-row min-h-screen font-title">
      <DashboardNav />
      <main className="flex-1 px-4 py-2">{children}</main>
    </div>
  );
}
