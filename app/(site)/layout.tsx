import { ReactNode } from "react";
import SiteNav from "@/components/layout/site/Site.nav";
import { getHours } from "@/lib/hours";
import SiteFooter from "@/components/layout/site/Site.footer";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/nextAuth/nextAuth.options";
import UiCookieConsent from "@/components/ui/Ui.cookie.consent";
import { filterArrayWeedDays } from "@/utils/globals";
import { getCategories } from "@/lib/categories";

type SiteLayoutProps = { children: ReactNode };

export default async function SiteLayout({ children }: SiteLayoutProps) {
  const hours = await getHours().then((res) => filterArrayWeedDays(res));
  const session = await getServerSession(authOptions);
  const categories = await getCategories();

  return (
    <>
      <SiteNav hours={hours} session={session} />
      <main className="flex-1">{children}</main>
      <SiteFooter hours={hours} session={session} categories={categories} />
      <UiCookieConsent />
    </>
  );
}
