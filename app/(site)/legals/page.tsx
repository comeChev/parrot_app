import UiImageMain from "@/components/ui/Ui.image.main";
import UiTextMain from "@/components/ui/Ui.text.main";
import legalsPic from "@/assets/legals/legalsMain.jpg";
import { textItems } from "@/data/data.legals";

export default function LegalsPage() {
  return (
    <div>
      <UiImageMain image={legalsPic} />

      <UiTextMain text="Politique de confidentialité. Mentions légales" />

      <div className="container mx-auto px-4 mb-[100px] lg:px-[200px]">
        <div className="flex flex-col space-y-2 font-medium text-base mb-[50px]">
          <p>
            La société GARAGE V.PARROT, soucieuse des droits des individus,
            notamment au regard des traitements automatisés et dans une volonté
            de transparence avec ses clients, a mis en place une politique
            reprenant l’ensemble de ces traitements, des finalités poursuivies
            par ces derniers ainsi que des moyens d’actions à la disposition des
            individus afin qu’ils puissent au mieux exercer leurs droits.
          </p>
          <p>
            Pour toute information complémentaire sur la protection des données
            personnelles, nous vous invitons à consulter le site de la{" "}
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.cnil.fr/"
              className="hover:underline text-blue-600"
            >
              Commission Nationale Informatique et Libertés (CNIL)
            </a>
          </p>
          <p>
            La poursuite de la navigation sur ce site vaut acceptation sans
            réserve des dispositions et conditions d'utilisation qui suivent.
          </p>
          <p>
            La version actuellement en ligne de ces conditions d'utilisation est
            la seule opposable pendant toute la durée d'utilisation du site et
            jusqu'à ce qu'une nouvelle version la remplace.
          </p>
        </div>
        <div className="container mx-auto mb-[100px]">
          {textItems.map((item, index) => (
            <div key={index} className="mb-[50px] lg:px-[200px]">
              <h3 className="text-lg font-semibold mb-3">
                Article {index + 1} - {item.title}
              </h3>
              <div className="pl-2">
                {item.text.map((text, index) => (
                  <p key={index} className="mb-2">
                    {text}
                  </p>
                ))}
                {item.link &&
                  item.link.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 hover:underline pr-4"
                    >
                      {link.text}
                    </a>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
