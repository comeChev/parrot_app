import { ReactNode } from "react";
import DashboardNav from "@/components/layout/dashboard/Dashboard.nav";

type DashboardLayoutProps = { children: ReactNode };

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex flex-col sm:flex-row min-h-screen font-title">
      <DashboardNav />
      <main className="flex-1 px-4 py-2">{children}</main>
    </div>
  );
}
