import React, { Dispatch, SetStateAction } from "react";
import UiLoadingWindow from "../Ui.loading.window";
import { UiAlertError, UiAlertSuccess } from "../Ui.alert.windows";

type FormProps = {
  explanations?: string[];
  children: React.ReactNode;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  loading: boolean;
  validation: {
    success: boolean;
    message: string;
  };
  setValidation: Dispatch<
    SetStateAction<{ success: boolean; message: string }>
  >;
};

export default function Form({
  explanations,
  children,
  handleSubmit,
  loading,
  validation,
  setValidation,
}: FormProps) {
  return (
    <div className="container mx-auto px-4 relative lg:px-[200px]">
      {/* Explanations */}
      {explanations && (
        <div className="mb-10">
          {explanations.map((explanation, index) => (
            <p key={index} className="mb-2">
              {explanation}
            </p>
          ))}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        {children}

        {/* loading window */}
        {loading && (
          <UiLoadingWindow text="Envoi en cours. Merci de patienter." />
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
      </form>
    </div>
  );
}
