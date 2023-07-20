"use client";

import { useState } from "react";

import Form from "@/components/ui/form/Form";
import FormFooter from "@/components/ui/form/Form.footer";
import carCreation from "@/assets/dashboard/carCreation.jpg";

import { Car_message } from "@prisma/client";
import FormSelect from "@/components/ui/form/Form.select";
import { SendMailBody, sendMail } from "@/utils/sendgrid";
import { getFullName, getFullStringDate } from "@/utils/globals";
import FormTextarea from "@/components/ui/form/Form.textarea";
import UiButtonAction from "@/components/ui/Ui.button.action";
import { BsMailbox2, BsPhoneFill } from "react-icons/bs";
import { FullCar } from "@/lib/cars";

export const defaultMessage: Car_message = {
  car_message_id: 0,
  car_message_contact_first_name: "",
  car_message_contact_last_name: "",
  car_message_contact_email: "",
  car_message_contact_phone: "",
  car_message_content: "",
  car_message_published_date: new Date(),
  car_message_status: "PENDING",
  car_message_response: null,
  car_message_response_type: null,
  car_message_response_date: null,
  car_id: 0,
};

export const defaultErrors = {
  message_response: "",
  message_response_type: "",
};

type MessagesFormProps = {
  messages: Car_message[];
  setMessages: React.Dispatch<React.SetStateAction<Car_message[]>>;
  isNew: boolean;
  currentMessage: Car_message;
  setIsOpenForm: React.Dispatch<React.SetStateAction<boolean>>;
  setCar: React.Dispatch<React.SetStateAction<FullCar>>;
};

export default function MessagesForm({
  messages,
  setMessages,
  setCar,
  isNew,
  currentMessage,
  setIsOpenForm,
}: MessagesFormProps) {
  const oldMessage = currentMessage;
  const [message, setMessage] = useState(currentMessage);
  const [validation, setValidation] = useState({ success: false, message: "" });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(defaultErrors);

  function isValidForm() {
    let errorsTemp = defaultErrors;

    if (
      message.car_message_response_type === "" ||
      !message.car_message_response_type
    ) {
      errorsTemp = {
        ...errorsTemp,
        message_response_type: "Veuillez choisir un type de réponse.",
      };
    }

    if (message.car_message_response_type === "MAIL") {
      if (!message.car_message_response) {
        errorsTemp = {
          ...errorsTemp,
          message_response: "Veuillez entrer une réponse.",
        };
      } else if (
        message.car_message_response.trim().length < 10 ||
        message.car_message_response.trim().length > 500
      ) {
        errorsTemp = {
          ...errorsTemp,
          message_response:
            "Votre message doit contenir au moins 10 caractères et au maximum 500.",
        };
      }
    }

    //checking errors
    if (Object.values(errorsTemp).some((error) => error.length > 0)) {
      setValidation({
        success: false,
        message:
          "Veuillez corriger les erreurs avant de soumettre le formulaire.",
      });
      setErrors(errorsTemp);
      return false;
    }
    return true;
  }

  async function handleSubmit() {
    if (!isValidForm()) return;

    setLoading(true);
    setValidation({ success: false, message: "" });

    //cannot create a new message from admin dashboard
    if (isNew) return;

    //optimistic update
    setMessages((prev) =>
      prev.map((m) =>
        m.car_message_id === message.car_message_id
          ? { ...message, car_message_status: "REPLIED" }
          : m
      )
    );

    //send mail via sendgrid
    const sendOptions: SendMailBody = {
      subject: "Notre réponse à votre demande",
      message: message.car_message_content,
      response: message.car_message_response as string,
      sendDate: getFullStringDate(message.car_message_published_date),
      email: message.car_message_contact_email,
      contactName: getFullName(
        message.car_message_contact_first_name,
        message.car_message_contact_last_name
      ),
    };
    const res = await sendMail(sendOptions);
    if (!res) {
      setValidation({
        success: false,
        message: "Une erreur est survenue. Veuillez réessayer plus tard.",
      });
      setMessages((prev) =>
        prev.map((m) =>
          m.car_message_id === oldMessage.car_message_id ? oldMessage : m
        )
      );
      setLoading(false);
      return;
    }

    setCar((prev) => ({
      ...prev,
      car_messages: prev.car_messages.map((m) =>
        m.car_message_id === message.car_message_id
          ? { ...message, car_message_status: "REPLIED" }
          : m
      ),
    }));

    setTimeout(() => {
      setValidation({
        success: true,
        message: `Le message a bien été envoyé à ${message.car_message_contact_first_name} ${message.car_message_contact_last_name}.`,
      });
      setMessage(defaultMessage);
      setIsOpenForm(false);
      setLoading(false);
      return;
    }, 2000);

    setLoading(false);
    return;
  }

  function handleChange(
    e: React.ChangeEvent<
      HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
    >
  ) {
    setMessage({ ...message, [e.currentTarget.name]: e.currentTarget.value });
  }

  function handleResetError(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setErrors({ ...errors, [e.currentTarget.name]: "" });
  }

  return (
    message && (
      <div className="mb-20">
        <Form
          validation={validation}
          setValidation={setValidation}
          loading={loading}
          imgSrc={carCreation}
          mainContainerCSS=""
        >
          {/* user */}
          <div className="px-3 font-medium">
            <p>
              {`Message de ${getFullName(
                message.car_message_contact_first_name,
                message.car_message_contact_last_name
              )}`}
            </p>
            <p>{`Envoyé ${getFullStringDate(
              new Date(message.car_message_published_date)
            )}`}</p>
          </div>

          {/* content */}
          <FormTextarea
            required={false}
            label=""
            name="car_message_content"
            handleChange={handleChange}
            handleFocus={() => {}}
            value={message.car_message_content}
            disabled={true}
          />
          <div className="flex flex-col md:flex-row md:items-center mx-3 md:justify-between">
            <div className="flex items-center space-x-2 mb-3 md:mb-0">
              <UiButtonAction
                Icon={BsMailbox2}
                href=""
                text="Répondre par écrit"
                type="button"
                onClick={() => {
                  setMessage({
                    ...message,
                    car_message_response_date: new Date(),
                    car_message_response_type: "MAIL",
                  });
                }}
              />
              <UiButtonAction
                Icon={BsPhoneFill}
                text="Appeler"
                type="button"
                href=""
                onClick={() => {
                  setMessage({
                    ...message,
                    car_message_response_date: new Date(),
                    car_message_response_type: "PHONE",
                  });
                  window.open(`tel:${message.car_message_contact_phone}`);
                }}
              />
            </div>
            <div className="">
              <FormSelect
                label="Type de réponse"
                value={
                  message.car_message_response_type
                    ? message.car_message_response_type
                    : ""
                }
                handleChange={handleChange}
                handleFocus={() =>
                  setErrors({ ...errors, message_response_type: "" })
                }
                error={errors.message_response_type}
                name="car_message_response_type"
                options={[
                  { value: "", label: "-- Choisir un type de réponse --" },
                  { value: "MAIL", label: "Réponse par mail" },
                  { value: "PHONE", label: "Réponse par téléphone" },
                ]}
              />
            </div>
          </div>
          {/* response */}
          {message.car_message_response_type &&
            message.car_message_response_type === "MAIL" && (
              <FormTextarea
                label="Réponse"
                name="car_message_response"
                handleChange={handleChange}
                handleFocus={handleResetError}
                value={
                  message.car_message_response
                    ? message.car_message_response
                    : ""
                }
                error={errors.message_response}
              />
            )}

          <FormFooter
            handleSubmit={handleSubmit}
            isNew={isNew}
            loading={loading}
          />
        </Form>
      </div>
    )
  );
}
