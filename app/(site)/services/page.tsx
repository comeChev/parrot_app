import { ServiceWithPicturesAndCategory, getServicesByCategory } from "@/lib/services";

import HomeServiceOldCar from "@/components/site/home/Home.service.oldCar";
import HomeServicesItem from "@/components/site/home/Home.services.item";
import ServicesListItem from "@/components/site/services/Services.list.item";
import UiImageMain from "@/components/ui/Ui.image.main";
import { carItem } from "@/data/data.home";
import { getCategories } from "@/lib/categories";
import mechanicPic from "@/assets/services/mechanic/mechanicMain.jpg";
import repairPic from "@/assets/services/repair/repairMain.jpg";

export const metadata = {
  title: "Nos services | Garage V. Parrot",
  description:
    "Bienvenue sur le site Garage V. Parrot. Nous sommes spécialisés dans la réparation, l'entretien et la vente de véhicules de toutes marques. Retrouvez l'ensemble de nos services !",
};

export default async function ServicesPage(params: { searchParams: { name: string } }) {
  const services: ServiceWithPicturesAndCategory[] = await getServicesByCategory(params.searchParams.name);
  const categories = await getCategories();

  return (
    <div className="min-h-screen">
      <UiImageMain image={params.searchParams.name === "repair" ? repairPic : mechanicPic} />

      {!params.searchParams.name ? (
        // {/* section 3 - services */}
        <section className="container mx-auto px-4 mb-[100px]" id="services">
          <h3 className="mb-10 text-3xl font-bold font-title">Les services que nous vous proposons</h3>
          <div className="flex flex-col md:flex-row md:space-x-5">
            {categories.map((c) => (
              <HomeServicesItem
                url={`/services?name=${c.category_name_url}`}
                key={c.category_id}
                imageSrc={c.category_picture}
                text={c.category_description}
                title={c.category_name}
              />
            ))}
            <HomeServiceOldCar
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
            <h2 className="px-4 text-4xl font-bold font-title">
              Nous ne proposons aucun service de ce type à l'heure actuelle
            </h2>
            <div className="mx-4 w-1/2 h-[4px] bg-red-800 mt-5 mb-28"></div>
            {/* section 3 - services */}
            <section className="container mx-auto px-4 mb-[100px]" id="services">
              <h3 className="mb-10 text-3xl font-bold">Les services que nous pouvons vous proposer</h3>
            </section>
          </div>
        )
      )}

      {services.length > 0 && (
        <div className="container mx-auto px-4 mb-[100px]">
          <h2 className="px-4 mb-10 text-4xl font-bold text-center font-title">{services[0].category.category_name}</h2>
          <h3 className="mb-10 text-2xl font-light leading-relaxed text-gray-700 font-subtitle">
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
