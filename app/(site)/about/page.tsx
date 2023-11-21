import AboutHistoricItem from "@/components/site/about/About.historic.item";
import AboutMembersItem from "@/components/site/about/About.members.item";
import UiImageMain from "@/components/ui/Ui.image.main";
import UiReasons from "@/components/ui/Ui.reasons";
import UiTextMain from "@/components/ui/Ui.text.main";
import { User } from "@prisma/client";
import about from "@/assets/about/about.jpg";
import { getUsers } from "@/lib/users";
import { historicItems } from "@/data/data.about";

export default async function AboutPage() {
  //loading team members
  const users: User[] = await getUsers();

  return (
    <div className="min-h-screen">
      {/* mainImage */}
      <UiImageMain image={about} />

      <UiTextMain
        text={`La confiance en son garagiste est un élément primordial. Apprenez-en
        plus sur nous et notre parcours`}
      />

      {/* historic */}
      <section className="container mx-auto mb-[100px]">
        {historicItems.map((item, index) => (
          <AboutHistoricItem
            key={index}
            image={item.image}
            textOne={item.textOne}
            textTwo={item.textTwo}
            reverse={index === 1}
          />
        ))}
      </section>

      {/* good sentence */}
      <h3 className="lg:text-center text-3xl font-bold mb-[100px] px-4">
        N’hésitez pas, sur TOULOUSE et alentours, le garage V. Parrot c’est le
        garage qu’il vous faut !
      </h3>

      {/* team members */}
      <section className="container mx-auto mb-[100px] px-4">
        <h3 className="text-3xl font-bold mb-10">
          Notre équipe de professionnels
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3">
          {users &&
            users.map((user, index) => (
              <AboutMembersItem user={user} key={index} />
            ))}
        </div>
      </section>

      {/* Reasons to choose garage */}
      <UiReasons />
    </div>
  );
}
