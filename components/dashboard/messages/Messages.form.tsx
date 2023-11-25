"use client";

import { BsMailbox2, BsPhoneFill } from "react-icons/bs";
import { MessageUpdate, updateMessage } from "@/lib/messages";
import { SendMailBody, sendMail } from "@/utils/sendgrid";
import { Validation, checkErrors } from "@/utils/form/validation";
import { defaultErrors, defaultMessage } from "@/utils/form/dashboard/message";
import { getFullName, getFullStringDate } from "@/utils/globals";

import Form from "@/components/ui/form/Form";
import FormFooter from "@/components/ui/form/Form.footer";
import FormSelect from "@/components/ui/form/Form.select";
import FormTextarea from "@/components/ui/form/Form.textarea";
import { Message } from "@prisma/client";
import UiButtonAction from "@/components/ui/Ui.button.action";
import carCreation from "@/assets/dashboard/carCreation.jpg";
import toast from "react-hot-toast";
import { useState } from "react";

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
  const messageToUpdate: MessageUpdate = {
    ...currentMessage,
    message_status: "REPLIED",
    message_response_date: new Date(),
    message_response: "",
    message_response_type: currentMessage.message_response_type as MessageUpdate["message_response_type"],
    message_contact_phone: currentMessage.message_contact_phone ?? "",
  };

  const [form, setForm] = useState({
    values: messageToUpdate,
    errors: defaultErrors,
  });
  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: false,
  });

  function isValidForm() {
    let temp = defaultErrors;
    temp.message_response = new Validation(form.values.message_response)
      .conditional(form.values.message_response_type === "MAIL")
      .min(10)
      .max(500)
      .validate();
    temp.message_response_type = new Validation(form.values.message_response_type).enum(["MAIL", "PHONE"]).validate();
    return checkErrors(temp, () => setForm({ ...form, errors: temp }));
  }

  async function handleSubmit() {
    if (!isValidForm()) return;
    if (isNew) return;

    setStatus({ ...status, loading: true });

    //optimistic update
    setMessages((prev) =>
      prev
        .map((m) => (m.message_id === currentMessage.message_id ? { ...m, messageStatus: "REPLIED" } : m))
        .sort((a, b) => (a.message_status === "PENDING" && b.message_status === "REPLIED" ? -1 : 1))
    );

    //send mail
    const sendOptions: SendMailBody = {
      subject: "Notre réponse à votre demande",
      message: form.values.message_content,
      response: form.values.message_response,
      sendDate: getFullStringDate(form.values.message_published_date),
      email: form.values.message_contact_email,
      contactName: getFullName(form.values.message_contact_first_name, form.values.message_contact_last_name),
    };
    const res = await sendMail(sendOptions);
    if (!res) {
      toast.error("Une erreur est survenue lors de l'envoi du mail");
      setMessages((prev) =>
        prev
          .map((m) => (m.message_id === oldMessage.message_id ? oldMessage : m))
          .sort((a, b) => (a.message_status === "PENDING" && b.message_status === "REPLIED" ? -1 : 1))
      );
      setStatus({ ...status, loading: false, error: true });
      return;
    }

    // update message in db
    const messageToUpdate = {
      ...form.values,
      message_status: "REPLIED" as MessageUpdate["message_status"],
      message_response_date: new Date(),
    };
    const response = await updateMessage(currentMessage.message_id, messageToUpdate);
    // if error, rollback
    if (!response) {
      toast.error("Une erreur est survenue. Veuillez réessayer plus tard");
      setMessages((prev) => prev.map((m) => (m.message_id === oldMessage.message_id ? oldMessage : m)));
      setStatus({ ...status, loading: false, error: true });
      return;
    }

    setTimeout(() => {
      setForm({
        errors: defaultErrors,
        values: defaultMessage,
      });
      toast.success(
        `Le message a bien été envoyé à ${form.values.message_contact_first_name} ${form.values.message_contact_last_name}`
      );
      setIsOpenForm(false);
      setStatus({ ...status, loading: false, success: true });
      return;
    }, 500);
  }

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>) {
    setForm({ ...form, values: { ...form.values, [e.currentTarget.name]: e.currentTarget.value } });
  }

  function handleResetError(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm({ ...form, errors: { ...form.errors, [e.currentTarget.name]: "" } });
  }

  return (
    currentMessage && (
      <div className="mb-20">
        <Form loading={status.loading} imgSrc={carCreation}>
          {/* user */}
          <div className="px-3 font-medium">
            <p>{`Message de ${getFullName(
              form.values.message_contact_first_name,
              form.values.message_contact_last_name
            )}`}</p>
            <p>{`Envoyé ${getFullStringDate(new Date(form.values.message_published_date))}`}</p>
          </div>

          {/* only to see the previous message */}
          <FormTextarea
            required={false}
            label=""
            name="message_content"
            handleChange={() => {}}
            handleFocus={() => {}}
            value={form.values.message_content}
            disabled={true}
          />
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between">
            <div className="flex flex-col mb-3 lg:flex-row lg:items-center lg:space-x-2">
              <UiButtonAction
                Icon={BsMailbox2}
                href=""
                text="Répondre par écrit"
                type="button"
                onClick={() => {
                  setForm({
                    ...form,
                    values: { ...form.values, message_response_date: new Date(), message_response_type: "MAIL" },
                  });
                }}
              />
              {form.values.message_contact_phone !== "" && (
                <UiButtonAction
                  Icon={BsPhoneFill}
                  text="Appeler"
                  type="button"
                  href=""
                  onClick={() => {
                    setForm({
                      ...form,
                      values: { ...form.values, message_response_date: new Date(), message_response_type: "PHONE" },
                    });
                    window.open(`tel:${form.values.message_contact_phone}`);
                  }}
                />
              )}
            </div>
            <div className="">
              <FormSelect
                label="Type de réponse"
                name="message_response_type"
                value={form.values.message_response_type ? form.values.message_response_type : ""}
                handleChange={handleChange}
                handleFocus={handleResetError}
                error={form.errors.message_response_type}
                options={
                  form.values.message_contact_phone !== ""
                    ? [
                        { value: "", label: "-- Choisir un type de réponse --" },
                        { value: "MAIL", label: "Réponse par mail" },
                        { value: "PHONE", label: "Réponse par téléphone" },
                      ]
                    : [
                        { value: "", label: "-- Choisir un type de réponse --" },
                        { value: "MAIL", label: "Réponse par mail" },
                      ]
                }
              />
            </div>
          </div>
          {/* response */}
          {form.values.message_response_type && form.values.message_response_type === "MAIL" && (
            <FormTextarea
              label="Réponse"
              name="message_response"
              handleChange={handleChange}
              handleFocus={handleResetError}
              value={form.values.message_response}
              error={form.errors.message_response}
            />
          )}

          <FormFooter handleSubmit={handleSubmit} isNew={isNew} loading={status.loading} />
        </Form>
      </div>
    )
  );
}
