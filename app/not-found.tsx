import SiteFooter from "@/components/layout/site/Site.footer";
import SiteNav from "@/components/layout/site/Site.nav";
import { getHours } from "@/lib/hours";
import { authOptions } from "@/utils/nextAuth/nextAuth.options";
import { getServerSession } from "next-auth";
import Image from "next/image";
import errorImg from "@/assets/error-img.png";
import UiButtonAction from "@/components/ui/Ui.button.action";
import { BsArrowLeft } from "react-icons/bs";
import { getCategories } from "@/lib/categories";

export default async function NotFound() {
  const hours = await getHours();
  const session = await getServerSession(authOptions);
  const categories = await getCategories();

  return (
    <div>
      <div className="flex flex-col min-h-screen font-title w-full">
        <SiteNav hours={hours} session={session} />
        <main className="container mx-auto flex-1 py-[100px]">
          <div className="flex flex-col items-center md:flex-row-reverse mx-auto">
            <Image
              src={errorImg}
              alt="404"
              width={800}
              height={800}
              className="md:object-right h-auto md:w-1/2"
            />
            <div className="flex flex-col items-center md:items-end space-y-5 text-neutral-800 md:w-1/2">
              <h1 className="font-extrabold text-6xl text-center md:text-start w-4/5">
                404
              </h1>
              <h2 className="font-bold text-2xl text-center md:text-start w-4/5">
                OOPS ! Page introuvable
              </h2>
              <h3 className="font-light text-base text-center md:text-start w-4/5">
                Nous sommes désolés, la page que vous cherchiez n'existe pas. Si
                vous pensez que quelque chose n'a pas fonctionné, n'hésitez pas
                à nous le signaler.
              </h3>
              <div className="w-4/5 flex items-center justify-center md:justify-start">
                <UiButtonAction
                  type="link"
                  href="/"
                  Icon={BsArrowLeft}
                  text="Retour à l'accueil"
                />
              </div>
            </div>
          </div>
        </main>
        <SiteFooter hours={hours} session={session} categories={categories} />
      </div>
    </div>
  );
}
