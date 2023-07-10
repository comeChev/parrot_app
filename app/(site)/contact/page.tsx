import UiImageMain from "@/components/ui/Ui.image.main";
import React from "react";
import mailPic from "@/assets/contact/mail.jpg";
import { BsFillTelephoneFill } from "react-icons/bs";
import ContactForm from "@/components/site/contact/Contact.form";
import UiReasons from "@/components/ui/Ui.reasons";
import UiTextMain from "@/components/ui/Ui.text.main";
import UiButtonAction from "@/components/ui/Ui.button.action";

export default function PageContact() {
  return (
    <div>
      <UiImageMain image={mailPic} />

      <UiTextMain text="Nous sommes là pour vous aider" />

      {/* phone button */}
      <div className="flex justify-center mb-[50px]">
        <UiButtonAction
          type="a"
          href="tel:+33987654321"
          Icon={BsFillTelephoneFill}
          text="09 87 65 43 21"
        />
      </div>

      {/* Form */}
      <ContactForm />

      {/* Reasons */}
      <UiReasons />
    </div>
  );
}
