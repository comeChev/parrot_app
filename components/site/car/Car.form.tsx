"use client";

import { ErrorsProps, defaultErrorsPublic, defaultMessageWithoutId } from "@/utils/form/car.message";
import { PublicCar, createCarMessage } from "@/lib/cars";
import { Validation, checkErrors } from "@/utils/form/validation";

import Form from "@/components/ui/form/Form";
import FormAfter from "@/components/ui/form/Form.after";
import FormInput from "@/components/ui/form/Form.input";
import FormPhone from "@/components/ui/form/Form.phone";
import FormReacaptcha from "@/components/ui/form/Form.recaptcha";
import FormSubmit from "@/components/ui/form/Form.submit";
import FormTextarea from "@/components/ui/form/Form.textarea";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

type CarFormProps = {
  car: PublicCar;
};

export default function CarForm({ car }: CarFormProps) {
  const defaultCarMessage = {
    ...defaultMessageWithoutId,
    car_id: car.car_id,
    car_message_content:
      "Bonjour, je suis intéressé par votre véhicule. Merci de bien vouloir me recontacter. Merci et bonne journée. Cordialement.",
  };
  const router = useRouter();
  const [form, setForm] = useState({
    values: defaultCarMessage,
    errors: { ...defaultErrorsPublic },
  });
  const [status, setStatus] = useState({
    loading: false,
    sent: false,
    error: false,
  });
  const [captcha, setCaptcha] = useState<null | string>(null);

  function isValidForm() {
    let temp: ErrorsProps = defaultErrorsPublic;

    temp.car_message_content = new Validation(form.values.car_message_content).min(10).max(500).validate();
    temp.car_message_contact_phone = new Validation(form.values.car_message_contact_phone).phone().validate();
    temp.car_message_contact_first_name = new Validation(form.values.car_message_contact_first_name)
      .min(3)
      .max(50)
      .validate();
    temp.car_message_contact_last_name = new Validation(form.values.car_message_contact_last_name)
      .min(3)
      .max(50)
      .validate();
    temp.car_message_contact_email = new Validation(form.values.car_message_contact_email).email().validate();
    temp.captcha = new Validation(captcha).required().validate();

    return checkErrors(temp, () => {
      setForm({ ...form, errors: temp });
    });
  }

  async function handleSubmit() {
    if (!isValidForm()) return;

    setStatus({ ...status, loading: true });
    const response = await createCarMessage(car.car_id, form.values);
    setTimeout(() => {
      if (response) {
        setStatus({ ...status, loading: false, sent: true });
        toast.success("Votre message a bien été envoyé !");
        setForm({ values: defaultCarMessage, errors: defaultErrorsPublic });
        return;
      }
      setStatus({ ...status, loading: false, error: true });
      toast.error("Une erreur est survenue, veuillez réessayer plus tard");
    }, 2000);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, values: { ...form.values, [e.target.name]: e.target.value } });
  }

  function handleErrorsFocus(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, errors: { ...form.errors, [e.target.name]: "" } });
  }

  return (
    <div>
      <div className="flex items-center space-x-2 px-4">
        <p>Référence du véhicule</p>
        <p className="font-bold">{car.car_name.toUpperCase()}</p>
      </div>

      <div className="relative">
        <Form
          loading={status.loading}
          explanations={[
            "Veuillez remplir le formulaire ci-dessous pour nous contacter. Nous vous répondrons dans les plus brefs délais.",
          ]}
        >
          {/* name & lastName */}
          <div className="flex flex-col md:flex-row md:space-x-5">
            <FormInput
              label="Prénom"
              name="car_message_contact_first_name"
              value={form.values.car_message_contact_first_name}
              error={form.errors.car_message_contact_first_name}
              type="text"
              autocomplete="given-name"
              handleChange={handleChange}
              handleFocus={handleErrorsFocus}
            />
            <FormInput
              label="Nom de famille"
              name="car_message_contact_last_name"
              value={form.values.car_message_contact_last_name}
              error={form.errors.car_message_contact_last_name}
              type="text"
              autocomplete="family-name"
              handleChange={handleChange}
              handleFocus={handleErrorsFocus}
            />
          </div>

          {/* email */}
          <FormInput
            label="E-mail"
            name="car_message_contact_email"
            value={form.values.car_message_contact_email}
            error={form.errors.car_message_contact_email}
            type="email"
            autocomplete="email"
            handleChange={handleChange}
            handleFocus={handleErrorsFocus}
          />

          {/* phone */}
          <FormPhone
            label="Téléphone"
            placeholder="0612345678"
            name="car_message_contact_phone"
            handleChange={handleChange}
            handleFocus={handleErrorsFocus}
            value={form.values.car_message_contact_phone ?? ""}
            error={form.errors.car_message_contact_phone}
          />

          {/* content */}
          <FormTextarea
            label="Message"
            name="car_message_content"
            value={form.values.car_message_content}
            error={form.errors.car_message_content}
            handleChange={handleChange}
            handleFocus={handleErrorsFocus}
          />

          <FormReacaptcha setCaptcha={setCaptcha} error={form.errors.captcha} />

          {/* submit */}
          <FormSubmit
            handleClick={handleSubmit}
            text="Envoyer"
            description="La référence du véhicule est directement intégrée à ce message. Il ne vous est pas nécessaire de l’indiquer."
            handleCheck={status.loading}
          />
        </Form>
        <FormAfter status={status} setStatus={setStatus} />
      </div>
    </div>
  );
}
