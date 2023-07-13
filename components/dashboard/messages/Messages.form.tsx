"use client";

import { useState } from "react";

import Form from "@/components/ui/form/Form";
import FormFooter from "@/components/ui/form/Form.footer";
import carCreation from "@/assets/dashboard/carCreation.jpg";

import { Message } from "@prisma/client";
import FormSelect from "@/components/ui/form/Form.select";
import { MessageUpdate, updateMessage } from "@/lib/messages";
import { SendMailBody, sendMail } from "@/utils/sendgrid";
import { getFullName, getFullStringDate } from "@/utils/globals";
import FormTextarea from "@/components/ui/form/Form.textarea";
import UiButtonAction from "@/components/ui/Ui.button.action";
import { BsMailbox2, BsPhoneFill } from "react-icons/bs";

export const defaultMessage: Message = {
  message_id: 0,
  message_contact_first_name: "",
  message_contact_last_name: "",
  message_contact_email: "",
  message_contact_phone: "",
  message_content: "",
  message_published_date: new Date(),
  message_status: "PENDING",
  message_response: null,
  message_response_type: null,
  message_response_date: null,
};

export const defaultErrors = {
  message_response: "",
  message_response_type: "",
};

type MessagesFormProps = {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  isNew: boolean;
  currentMessage: Message;
  setIsOpenForm: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function MessagesForm({
  messages,
  setMessages,
  isNew,
  currentMessage,
  setIsOpenForm,
}: MessagesFormProps) {
  const oldMessage = currentMessage;
  const [message, setMessage] = useState(currentMessage as MessageUpdate);
  const [validation, setValidation] = useState({ success: false, message: "" });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(defaultErrors);

  function isValidForm() {
    let errorsTemp = defaultErrors;

    if (
      message.message_response_type === "" ||
      !message.message_response_type
    ) {
      errorsTemp = {
        ...errorsTemp,
        message_response_type: "Veuillez choisir un type de réponse.",
      };
    }

    if (message.message_response_type === "MAIL") {
      if (!message.message_response) {
        errorsTemp = {
          ...errorsTemp,
          message_response: "Veuillez entrer une réponse.",
        };
      } else if (
        message.message_response.trim().length < 10 ||
        message.message_response.trim().length > 500
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
        m.message_id === message.message_id
          ? { ...message, message_status: "REPLIED" }
          : m
      )
    );

    //send mail via sendgrid
    const sendOptions: SendMailBody = {
      subject: "Notre réponse à votre demande",
      message: message.message_content,
      response: message.message_response,
      sendDate: getFullStringDate(message.message_published_date),
      email: message.message_contact_email,
      contactName: getFullName(
        message.message_contact_first_name,
        message.message_contact_last_name
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
          m.message_id === oldMessage.message_id ? oldMessage : m
        )
      );
      setLoading(false);
      return;
    }

    // update message in db
    const messageToUpdate = {
      ...message,
      message_status: "REPLIED",
      message_response_date: new Date(),
    };
    const response = await updateMessage(message.message_id, messageToUpdate);
    // if error, rollback
    if (!response) {
      setValidation({
        success: false,
        message: "Une erreur est survenue. Veuillez réessayer plus tard.",
      });
      setMessages((prev) =>
        prev.map((m) =>
          m.message_id === oldMessage.message_id ? oldMessage : m
        )
      );
      setLoading(false);
      return;
    }

    setTimeout(() => {
      setMessage(defaultMessage as MessageUpdate);
      setValidation({
        success: true,
        message: `Le message a bien été envoyé à ${message.message_contact_first_name} ${message.message_contact_last_name}.`,
      });
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
        >
          {/* user */}
          <div className="px-3 font-medium">
            <p>
              {`Message de ${getFullName(
                message.message_contact_first_name,
                message.message_contact_last_name
              )}`}
            </p>
            <p>{`Envoyé ${getFullStringDate(
              new Date(message.message_published_date)
            )}`}</p>
          </div>

          {/* content */}
          <FormTextarea
            required={false}
            label=""
            name="message_content"
            handleChange={handleChange}
            handleFocus={() => {}}
            value={message.message_content}
            disabled={true}
          />
          <div className="flex items-center mx-3 justify-between">
            <div className="flex items-center space-x-2">
              <UiButtonAction
                Icon={BsMailbox2}
                href=""
                text="Répondre par écrit"
                type="button"
                onClick={() => {
                  setMessage({
                    ...message,
                    message_response_date: new Date(),
                    message_response_type: "MAIL",
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
                    message_response_date: new Date(),
                    message_response_type: "PHONE",
                  });
                  window.open(`tel:${message.message_contact_phone}`);
                }}
              />
            </div>
            <div className="">
              <FormSelect
                label="Type de réponse"
                value={
                  message.message_response_type
                    ? message.message_response_type
                    : ""
                }
                handleChange={handleChange}
                handleFocus={() =>
                  setErrors({ ...errors, message_response_type: "" })
                }
                error={errors.message_response_type}
                name="message_response_type"
                options={[
                  { value: "", label: "-- Choisir un type de réponse --" },
                  { value: "MAIL", label: "Réponse par mail" },
                  { value: "PHONE", label: "Réponse par téléphone" },
                ]}
              />
            </div>
          </div>
          {/* response */}
          {message.message_response_type &&
            message.message_response_type === "MAIL" && (
              <FormTextarea
                label="Réponse"
                name="message_response"
                handleChange={handleChange}
                handleFocus={handleResetError}
                value={message.message_response}
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
