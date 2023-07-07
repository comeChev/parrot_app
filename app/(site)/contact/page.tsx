import UiImageMain from "@/components/ui/Ui.image.main";
import React from "react";
import mailPic from "@/assets/contact/mail.jpg";
import { BsFillTelephoneFill } from "react-icons/bs";
import ContactForm from "@/components/site/contact/Contact.form";
import UiReasons from "@/components/ui/Ui.reasons";

export default function PageContact() {
  return (
    <div>
      <UiImageMain image={mailPic} />

      <div className=" mb-12 px-4">
        <h2 className="text-center text-4xl font-bold mb-5">
          Nous sommes là pour vous aider !
        </h2>
        <div className="h-[3px] bg-red-700 w-2/3 md:w-1/3 lg:w-1/4 mx-auto" />
      </div>

      <a
        type="button"
        href="tel:+33987654321"
        className="flex items-center mt-4 text-xl bg-red-700 text-neutral-100 justify-center w-[280px] py-4 rounded-lg font-light mx-auto mb-[50px] hover:bg-red-800 transition-all duration-150 ease-in-out"
      >
        <BsFillTelephoneFill className="mr-5" />
        <span>09 87 65 43 21</span>
      </a>

      {/* Form */}
      <ContactForm />

      {/* Reasons */}
      <UiReasons />
    </div>
  );
}
