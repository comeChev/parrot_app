import Image from "next/image";
import underConstruction from "@/assets/underConstruction.jpeg";
import UiButtonAction from "./Ui.button.action";
import { BsArrowLeft } from "react-icons/bs";

export default function UiUnderConstruction() {
  return (
    <div className="flex flex-col items-center lg:flex-row-reverse mx-auto">
      <Image
        src={underConstruction}
        alt="404"
        width={800}
        height={800}
        className="md:object-right h-auto lg:w-1/2"
      />
      <div className="flex flex-col items-center md:items-end space-y-5 text-neutral-800 lg:w-1/2">
        <h1 className="font-extrabold text-6xl text-center md:text-start w-4/5">
          Page en construction
        </h1>
        <h2 className="font-bold text-2xl text-center md:text-start w-4/5">
          OOPS ! Cette page est en cours de réalisation
        </h2>
        <h3 className="font-light text-base text-center md:text-start w-4/5">
          Nous sommes désolés, la page que vous cherchiez n'existe pas encore.
          Nous faisons le nécessaire pour construire celle-ci au plus vite. Si
          vous avez des questions ou des remarques n'hésitez pas à nous
          contacter.
        </h3>
        <div className="w-4/5 flex items-center justify-center md:justify-start">
          <UiButtonAction
            type="link"
            href="/dashboard"
            Icon={BsArrowLeft}
            text="Retour à la page d'administration"
          />
        </div>
      </div>
    </div>
  );
}
