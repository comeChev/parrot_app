import { ReactNode } from "react";
import SiteNav from "@/components/layout/site/Site.nav";
import { getHours } from "@/lib/hours";
import SiteFooter from "@/components/layout/site/Site.footer";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/nextAuth/nextAuth.options";

type SiteLayoutProps = { children: ReactNode };

export default async function SiteLayout({ children }: SiteLayoutProps) {
  const hours = await getHours();
  const session = await getServerSession(authOptions);
  return (
    <>
      <SiteNav hours={hours} session={session} />
      <main className="flex-1">{children}</main>
      <SiteFooter hours={hours} session={session} />
    </>
  );
}
