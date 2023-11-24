"use client";

import { ErrorsProps, defaultErrors, defaultMessage } from "@/utils/form/contact";
import { Validation, checkErrors } from "@/utils/form/validation";

import Form from "@/components/ui/form/Form";
import FormAfter from "@/components/ui/form/Form.after";
import FormInput from "@/components/ui/form/Form.input";
import FormPhone from "@/components/ui/form/Form.phone";
import FormReacaptcha from "@/components/ui/form/Form.recaptcha";
import FormSubmit from "@/components/ui/form/Form.submit";
import FormTextarea from "@/components/ui/form/Form.textarea";
import { createMessage } from "@/lib/messages";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({
    values: defaultMessage,
    errors: defaultErrors,
  });
  const [status, setStatus] = useState({
    loading: false,
    sent: false,
    error: false,
  });
  const [captcha, setCaptcha] = useState<null | string>(null);
  const router = useRouter();

  // handle errors
  function isValidForm() {
    let errTemp: ErrorsProps = defaultErrors;

    errTemp.message_content = new Validation(form.values.message_content).min(10).max(500).validate();
    errTemp.message_contact_phone = new Validation(form.values.message_contact_phone).phone().validate();
    errTemp.message_contact_email = new Validation(form.values.message_contact_email).email().validate();
    errTemp.message_contact_first_name = new Validation(form.values.message_contact_first_name)
      .min(3)
      .max(50)
      .validate();
    errTemp.message_contact_last_name = new Validation(form.values.message_contact_last_name).min(3).max(50).validate();
    errTemp.captcha = new Validation(captcha).required("Veuillez cocher la case 'Je ne suis pas un robot'").validate();

    return checkErrors(errTemp, () =>
      setForm((prev) => {
        return { ...prev, errors: errTemp };
      })
    );
  }

  async function handleSubmit() {
    if (!isValidForm()) return;

    setStatus({ ...status, loading: true });
    const response = await createMessage(form.values);
    setTimeout(() => {
      if (response) {
        setStatus({ ...status, loading: false, sent: true });
        toast.success("Votre message a bien été envoyé !");
        setForm({ values: defaultMessage, errors: defaultErrors });
        return;
      }
      setStatus({ ...status, loading: false, error: true });
      toast.error("Une erreur est survenue, veuillez réessayer plus tard");
    }, 2000);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({
      ...form,
      values: { ...form.values, [e.target.name]: e.target.value },
    });
  }
  function handleErrorsReset(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, errors: { ...form.errors, [e.target.name]: "" } });
  }
  return (
    //Form
    <div className="relative">
      <Form
        loading={status.loading}
        explanations={[
          "Vous avez des questions sur votre voiture, sur nos prestations ? Notre équipe est toujours prête à vous aider. Vous pouvez nous appeler ou même nous envoyer un message via le formulaire de contact ci-dessous.",
        ]}
      >
        {/* name & lastName */}
        <div className="flex flex-col md:flex-row md:space-x-5">
          <FormInput
            disabled={status.loading}
            label="Prénom"
            name="message_contact_first_name"
            autocomplete="given-name"
            type="text"
            value={form.values.message_contact_first_name}
            error={form.errors.message_contact_first_name}
            handleChange={handleChange}
            handleFocus={handleErrorsReset}
          />
          <FormInput
            disabled={status.loading}
            label="Nom de famille"
            name="message_contact_last_name"
            autocomplete="family-name"
            type="text"
            value={form.values.message_contact_last_name}
            error={form.errors.message_contact_last_name}
            handleChange={handleChange}
            handleFocus={handleErrorsReset}
          />
        </div>

        {/* email */}
        <FormInput
          disabled={status.loading}
          label="E-mail"
          name="message_contact_email"
          autocomplete="email"
          type="email"
          value={form.values.message_contact_email}
          error={form.errors.message_contact_email}
          handleChange={handleChange}
          handleFocus={handleErrorsReset}
        />

        {/* phone */}
        <FormPhone
          disabled={status.loading}
          label="Téléphone"
          placeholder="0612345678"
          name="message_contact_phone"
          value={form.values.message_contact_phone}
          error={form.errors.message_contact_phone}
          handleChange={handleChange}
          handleFocus={handleErrorsReset}
        />

        {/* content */}
        <FormTextarea
          disabled={status.loading}
          label="Message"
          name="message_content"
          value={form.values.message_content}
          error={form.errors.message_content}
          handleChange={handleChange}
          handleFocus={handleErrorsReset}
        />

        <FormReacaptcha setCaptcha={setCaptcha} error={form.errors.captcha} />

        {/* submit */}
        <FormSubmit
          handleClick={handleSubmit}
          handleCheck={status.loading}
          description="Dans la mesure du possible, nous essayons toujours de vous contacter par téléphone. Le cas échéant, nous vous répondrons par mail."
        />
      </Form>
      <FormAfter status={status} setStatus={setStatus} />
    </div>
  );
}
