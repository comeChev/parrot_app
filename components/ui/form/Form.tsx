import { Dispatch, SetStateAction } from "react";
import { UiAlertError, UiAlertSuccess } from "../Ui.alert.windows";

import { StaticImageData } from "next/image";
import UiLoadingWindow from "../Ui.loading.window";
import mailSendingPic from "@/assets/contact/message_sending.gif";

type FormProps = {
  explanations?: string[];
  children: React.ReactNode;
  mainContainerCSS?: string;
  loading: boolean;
  validation: {
    success: boolean;
    message: string;
  };
  setValidation: Dispatch<
    SetStateAction<{ success: boolean; message: string }>
  >;
  imgSrc?: StaticImageData;
};

export default function Form({
  explanations,
  children,
  loading,
  mainContainerCSS = "container mx-auto",
  validation,
  setValidation,
  imgSrc = mailSendingPic,
}: FormProps) {
  return (
    <div className={`${mainContainerCSS} px-4 relative`}>
      {/* Explanations */}
      {explanations && (
        <div className="mb-10 leading-relaxed">
          {explanations.map((explanation, index) => (
            <p key={index} className="mb-2">
              {explanation}
            </p>
          ))}
        </div>
      )}

      <div>
        {children}
        {/* loading window */}
        {loading && (
          <UiLoadingWindow
            text="Envoi en cours. Merci de patienter."
            imgSrc={imgSrc}
          />
        )}

        {/* success or error message */}
        {validation.success && (
          <UiAlertSuccess
            handleClose={() => setValidation({ success: false, message: "" })}
            message={validation.message}
          />
        )}
        {!validation.success && validation.message !== "" && (
          <UiAlertError
            handleClose={() => setValidation({ success: false, message: "" })}
            message={validation.message}
          />
        )}
      </div>
    </div>
  );
}
