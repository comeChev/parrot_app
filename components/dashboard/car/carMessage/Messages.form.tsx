"use client";

import { BsMailbox2, BsPhoneFill } from "react-icons/bs";
import { SendMailBody, sendMail } from "@/utils/sendgrid";
import { Validation, checkErrors } from "@/utils/form/validation";
import { defaultErrors, defaultMessage } from "@/utils/form/car.message";
import { getFullName, getFullStringDate } from "@/utils/globals";

import { Car_message } from "@prisma/client";
import Form from "@/components/ui/form/Form";
import FormFooter from "@/components/ui/form/Form.footer";
import FormSelect from "@/components/ui/form/Form.select";
import FormTextarea from "@/components/ui/form/Form.textarea";
import { FullCar } from "@/lib/cars";
import UiButtonAction from "@/components/ui/Ui.button.action";
import carCreation from "@/assets/dashboard/carCreation.jpg";
import toast from "react-hot-toast";
import { useState } from "react";

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
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(defaultErrors);

  function isValidForm() {
    let errorsTemp = defaultErrors;
    const carResponseT = new Validation(message.car_message_response_type).enum(["MAIL", "PHONE"]);
    const carResponseM = new Validation(message.car_message_response)
      .conditional(message.car_message_response_type === "MAIL")
      .min(10)
      .max(500);

    errorsTemp = { message_response_type: carResponseT.validate(), message_response: carResponseM.validate() };

    return checkErrors(errorsTemp, () => setErrors(errorsTemp));
  }

  async function handleSubmit() {
    if (!isValidForm()) return;
    //cannot create a new message from admin dashboard
    if (isNew) return;

    setLoading(true);

    //optimistic update
    setMessages((prev) =>
      prev.map((m) => (m.car_message_id === message.car_message_id ? { ...message, car_message_status: "REPLIED" } : m))
    );

    //send mail via sendgrid
    const sendOptions: SendMailBody = {
      subject: "Notre réponse à votre demande",
      message: message.car_message_content,
      response: message.car_message_response as string,
      sendDate: getFullStringDate(message.car_message_published_date),
      email: message.car_message_contact_email,
      contactName: getFullName(message.car_message_contact_first_name, message.car_message_contact_last_name),
    };
    const res = await sendMail(sendOptions);
    if (!res) {
      toast.error("Une erreur est survenue. Veuillez réessayer plus tard.");

      setMessages((prev) => prev.map((m) => (m.car_message_id === oldMessage.car_message_id ? oldMessage : m)));
      setLoading(false);
      return;
    }

    setCar((prev) => ({
      ...prev,
      car_messages: prev.car_messages.map((m) =>
        m.car_message_id === message.car_message_id ? { ...message, car_message_status: "REPLIED" } : m
      ),
    }));

    setTimeout(() => {
      toast.success(
        `Le message a bien été envoyé à ${message.car_message_contact_first_name} ${message.car_message_contact_last_name}`
      );

      setMessage(defaultMessage);
      setIsOpenForm(false);
      setLoading(false);
      return;
    }, 2000);

    setLoading(false);
    return;
  }

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>) {
    setMessage({ ...message, [e.currentTarget.name]: e.currentTarget.value });
  }

  function handleResetError(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setErrors({ ...errors, [e.currentTarget.name]: "" });
  }

  return (
    message && (
      <div className="mb-20">
        <Form loading={loading} imgSrc={carCreation} mainContainerCSS="">
          {/* user */}
          <div className="px-3 font-medium">
            <p>
              {`Message de ${getFullName(
                message.car_message_contact_first_name,
                message.car_message_contact_last_name
              )}`}
            </p>
            <p>{`Envoyé ${getFullStringDate(new Date(message.car_message_published_date))}`}</p>
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
                value={message.car_message_response_type ? message.car_message_response_type : ""}
                handleChange={handleChange}
                handleFocus={() => setErrors({ ...errors, message_response_type: "" })}
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
          {message.car_message_response_type && message.car_message_response_type === "MAIL" && (
            <FormTextarea
              label="Réponse"
              name="car_message_response"
              handleChange={handleChange}
              handleFocus={handleResetError}
              value={message.car_message_response ? message.car_message_response : ""}
              error={errors.message_response}
            />
          )}

          <FormFooter handleSubmit={handleSubmit} isNew={isNew} loading={loading} />
        </Form>
      </div>
    )
  );
}
