import UiImageMain from "@/components/ui/Ui.image.main";
import {
  ServiceWithPicturesAndCategory,
  getServicesByCategory,
} from "@/lib/services";
import repairPic from "@/assets/services/repair/repairMain.jpg";
import mechanicPic from "@/assets/services/mechanic/mechanicMain.jpg";
import ServicesListItem from "@/components/site/services/Services.list.item";
import { carItem, servicesItems } from "@/app/(site)/page";
import HomeServicesItem from "@/components/site/home/Home.services.item";
import { prisma } from "@/utils/prisma";

export default async function ServicesPage(params: {
  searchParams: { name: string };
}) {
  const services: ServiceWithPicturesAndCategory[] =
    await getServicesByCategory(params.searchParams.name);
  const categories = await prisma.category.findMany();

  return (
    <div className="min-h-screen">
      <UiImageMain
        image={params.searchParams.name === "repair" ? repairPic : mechanicPic}
      />

      {!params.searchParams.name ? (
        // {/* section 3 - services */}
        <section className="container mx-auto px-4 mb-[100px]" id="services">
          <h3 className="text-3xl font-bold mb-10">
            Les services que nous vous proposons
          </h3>
          <div className="flex flex-col md:flex-row md:space-x-5">
            {categories.map((c) => (
              <HomeServicesItem
                key={c.category_id}
                url={c.category_name_url}
                imageSrc={c.category_picture}
                text={c.category_description}
                title={c.category_name}
              />
            ))}
            <HomeServicesItem
              url={carItem.url}
              imageSrc={carItem.imageSrc}
              text={carItem.text}
              title={carItem.title}
            />
          </div>
        </section>
      ) : (
        services.length === 0 && (
          <div className="container mx-auto px-4 mb-[100px] flex flex-col">
            {/* <Image /> */}
            <h2 className="text-4xl font-bold px-4">
              Nous ne proposons aucun service de ce type à l'heure actuelle
            </h2>
            <div className="mx-4 w-1/2 h-[4px] bg-red-800 mt-5 mb-28"></div>
            {/* section 3 - services */}
            <section
              className="container mx-auto px-4 mb-[100px]"
              id="services"
            >
              <h3 className="text-3xl font-bold mb-10">
                Les services que nous pouvons vous proposer
              </h3>
              <div className="flex flex-col md:flex-row md:space-x-5">
                {servicesItems.map((s) => (
                  <HomeServicesItem
                    url={`/services?name=${s.url}`}
                    imageSrc={s.imageSrc}
                    text={s.text}
                    title={s.title}
                  />
                ))}
              </div>
            </section>
          </div>
        )
      )}

      {services.length > 0 && (
        <div className="container mx-auto px-4 mb-[100px]">
          <h2 className="text-center text-4xl font-bold px-4 mb-10">
            {services[0].category.category_name}
          </h2>
          <h3 className="text-3xl font-bold mb-10">
            {services[0].category.category_description}
          </h3>
          <div>
            {services.map((service, index) => (
              <ServicesListItem key={index} service={service} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
