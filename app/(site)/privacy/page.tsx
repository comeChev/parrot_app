import UiImageMain from "@/components/ui/Ui.image.main";
import UiTextMain from "@/components/ui/Ui.text.main";
import privacyPic from "@/assets/privacy/privacyMain.jpg";
import { textItems } from "@/data/data.privacy";

export const metadata = {
  title: "Vos données personnelles | Garage V. Parrot",
  description:
    "Bienvenue sur le site Garage V. Parrot. Nous sommes spécialisés dans la réparation, l'entretien et la vente de véhicules de toutes marques. Consultez nos règles concernant le traitement de vos données personnelles!",
};

export default function PrivacyPage() {
  return (
    <div>
      <UiImageMain image={privacyPic} />

      <UiTextMain text="Vos données personnelles" />

      <div className="container mx-auto px-4 mb-[100px]">
        {textItems.map((item, index) => (
          <div key={index} className="mb-[50px] lg:px-[200px]">
            <h4 className="mb-3 text-lg font-semibold">
              Article {index + 1} - {item.title}
            </h4>
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
                    className="pr-4 text-blue-600 hover:underline"
                  >
                    {link.text}
                  </a>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
