import { BsFillTelephoneFill } from "react-icons/bs";
import ContactForm from "@/components/site/contact/Contact.form";
import React from "react";
import UiButtonAction from "@/components/ui/Ui.button.action";
import UiImageMain from "@/components/ui/Ui.image.main";
import UiReasons from "@/components/ui/Ui.reasons";
import UiTextMain from "@/components/ui/Ui.text.main";
import mailPic from "@/assets/contact/mail.jpg";

export const metadata = {
  title: "Contactez-nous | Garage V. Parrot",
  description:
    "Bienvenue sur le site Garage V. Parrot. Nous sommes spécialisés dans la réparation, l'entretien et la vente de véhicules de toutes marques. Retrouvez les avis de nos clients !",
};

export default function PageContact() {
  return (
    <div className="container mx-auto">
      <UiImageMain image={mailPic} />

      <UiTextMain text="Nous sommes là pour vous aider" />

      {/* phone button */}
      <div className="flex justify-center mb-[50px]">
        <UiButtonAction type="a" href="tel:+33987654321" Icon={BsFillTelephoneFill} text="09 87 65 43 21" />
      </div>

      {/* Form */}

      <ContactForm />

      {/* Reasons */}
      <UiReasons />
    </div>
  );
}
