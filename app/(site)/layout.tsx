import { ReactNode } from "react";
import SiteNav from "@/components/layout/site/Site.nav";
import { getHours } from "@/lib/hours";

type SiteLayoutProps = { children: ReactNode };

export default async function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen font-title w-full">
      <SiteNav />
      <main className="flex-1 px-4 py-2">{children}</main>
    </div>
  );
}
