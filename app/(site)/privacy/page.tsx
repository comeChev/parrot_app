import UiImageMain from "@/components/ui/Ui.image.main";
import UiTextMain from "@/components/ui/Ui.text.main";
import privacyPic from "@/assets/privacy/privacyMain.jpg";
import { textItems } from "@/data/data.privacy";

export default function PrivacyPage() {
  return (
    <div>
      <UiImageMain image={privacyPic} />

      <UiTextMain text="Vos données personnelles" />

      <div className="container mx-auto px-4 mb-[100px]">
        {textItems.map((item, index) => (
          <div key={index} className="mb-[50px] lg:px-[200px]">
            <h4 className="text-lg font-semibold mb-3">
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
  );
}
