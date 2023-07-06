import { getUsers } from "@/lib/users";
import { User } from "@prisma/client";

import UiImageMain from "@/components/ui/Ui.image.main";
import AboutHistoricItem from "@/components/site/about/About.historic.item";
import UiReasons from "@/components/ui/Ui.reasons";
import AboutMembersItem from "@/components/site/about/About.members.item";

import about from "@/assets/about/about.jpg";
import garage from "@/assets/about/garage.jpg";
import vente from "@/assets/about/vente.webp";
import mechanic from "@/assets/about/mechanic4.jpg";

const historicItems = [
  {
    image: garage,
    textOne:
      "Fort de 15 années d’expérience dans la secteur de la réparation et de l’entretien automobile, le garage V. Parrot à St Claude, propose une multitudes de service professionnels destinés à l’entretien des véhicules automobiles.",
    textTwo:
      "Petite entreprise familiale à ses débuts, le garage V. Parrot a su s’adapter aux besoins de son époque et a très rapidement pris ses marques au niveau des véhicules thermiques mais également électriques.",
  },
  {
    image: mechanic,
    textOne:
      "Premier garage sur St Claude à réparer et entretenir des véhicules hybrides (dès 2009) puis électriques (en 2011), le garage V. Parrot garde ses lettres de noblesse dans les véhicules thermiques.",
    textTwo:
      "Amoureux de la mécanique, les techniciens de chez Parrot sauront vous expliquer l’ensemble des opérations de réparations, contrôle et entretien qui seront amenés à effectuer.",
  },
  {
    image: vente,
    textOne:
      "C’est avec ce même état d’esprit que le garage V. Parrot vends ses véhicules d’occasion : des véhicules révisés, entretenus et propres qui n’attendent qu’une chose  : trouver un nouveau propriétaire et.. rouler !",
    textTwo:
      "Électrique, thermique, hybride, nos experts répondent à toutes vos questions. Que vous soyez novices ou confirmés, le garage V. Parrot saura vous aide.",
  },
];

export default async function AboutPage() {
  //loading team members
  const users: User[] = await getUsers();

  return (
    <div className="min-h-screen">
      {/* mainImage */}
      <UiImageMain image={about} />

      <h2 className="text-center text-4xl font-bold mb-12 px-4">
        La confiance en son garagiste est un élément primordial. Apprenez-en
        plus sur nous et notre parcours.
      </h2>

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
        N’hésitez pas, sur St Claude et alentours, le garage V. Parrot c’est le
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
