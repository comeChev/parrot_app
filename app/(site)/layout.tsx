import { ReactNode, Suspense } from "react";

import Loading from "./loading";
import SiteFooter from "@/components/layout/site/Site.footer";
import SiteNav from "@/components/layout/site/Site.nav";
import StoreCar from "@/store/store.car";
import UiCookieConsent from "@/components/ui/Ui.cookie.consent";
import { authOptions } from "@/utils/nextAuth/nextAuth.options";
import { filterArrayWeedDays } from "@/utils/globals";
import { getCategories } from "@/lib/categories";
import { getHours } from "@/lib/hours";
import { getServerSession } from "next-auth";

type SiteLayoutProps = { children: ReactNode };

export default async function SiteLayout({ children }: SiteLayoutProps) {
  const session = await getServerSession(authOptions);
  const hours = await getHours().then((res) => filterArrayWeedDays(res));
  const categories = await getCategories();

  return (
    <div className="bg-gray-100">
      <SiteNav hours={hours} session={session} />
      {/* <Suspense fallback={<Loading />}> */}
      <StoreCar>
        <main className="flex-1 bg-gray-100">{children}</main>
      </StoreCar>
      {/* </Suspense> */}
      <SiteFooter hours={hours} session={session} categories={categories} />
      <UiCookieConsent />
    </div>
  );
}
