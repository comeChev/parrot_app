"use client";

import Form from "@/components/ui/form/Form";
import FormInput from "@/components/ui/form/Form.input";
import FormPhone from "@/components/ui/form/Form.phone";
import FormSubmit from "@/components/ui/form/Form.submit";
import FormTextarea from "@/components/ui/form/Form.textarea";
import { CarMessage, PublicCar, createCarMessage } from "@/lib/cars";
import { useState } from "react";

const defaultMessage: CarMessage = {
  car_message_contact_first_name: "",
  car_message_contact_last_name: "",
  car_message_contact_email: "",
  car_message_contact_phone: "",
  car_message_content: "",
  car_message_status: "PENDING",
  car_message_response: null,
  car_message_response_type: null,
  car_message_response_date: null,
  car_id: 0,
};

type ErrorsProps = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  content: string;
};

const defaultErrors: ErrorsProps = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  content: "",
};

type CarFormProps = {
  car: PublicCar;
};

export default function CarForm({ car }: CarFormProps) {
  const [loading, setLoading] = useState(false);
  const [validation, setValidation] = useState({ success: false, message: "" });
  const [errors, setErrors] = useState(defaultErrors);
  const [message, setMessage] = useState({
    ...defaultMessage,
    car_id: car.car_id,
    car_message_content:
      "Bonjour, je suis intéressé par votre véhicule. Merci de bien vouloir me recontacter. Merci et bonne journée. Cordialement.",
  });

  async function handleSubmit() {
    if (!isValidForm()) return;

    setLoading(true);
    setValidation({ success: false, message: "" });
    const response = await createCarMessage(car.car_id, message);
    setTimeout(() => {
      if (response) {
        setLoading(false);
        setValidation({
          success: true,
          message: "Votre message a bien été envoyé !",
        });
        setMessage(defaultMessage);
        return;
      }
      setLoading(false);
      setValidation({
        success: false,
        message: "Une erreur est survenue, veuillez réessayer plus tard.",
      });
    }, 2000);
  }
  function isValidForm() {
    let errorsTemp: ErrorsProps = defaultErrors;

    // content validation
    if (
      message.car_message_content.trim().length < 10 ||
      message.car_message_content.trim().length > 500
    ) {
      errorsTemp = {
        ...errorsTemp,
        content:
          "Votre message doit contenir au moins 10 caractères et au maximum 500.",
      };
    }

    // phone validation
    if (message.car_message_contact_phone.match(/^[0][1-9][0-9]{8}/) === null) {
      errorsTemp = {
        ...errorsTemp,
        phone:
          "Votre numéro de téléphone doit commencer par 0 et contenir 10 chiffres (ex : 0198237645).",
      };
    }

    // firstName validation
    if (
      message.car_message_contact_first_name.trim().length < 3 ||
      message.car_message_contact_first_name.trim().length > 50
    ) {
      errorsTemp = {
        ...errorsTemp,
        firstName:
          "Votre prénom doit comporter un minimum de 3 lettres et un maximum de 50",
      };
    }

    // lastName validation
    if (
      message.car_message_contact_last_name.trim().length < 3 ||
      message.car_message_contact_last_name.trim().length > 50
    ) {
      errorsTemp = {
        ...errorsTemp,
        lastName:
          "Votre nom de famille doit comporter un minimum de 3 lettres et un maximum de 50",
      };
    }
    // email validation
    if (
      !message.car_message_contact_email.match(
        /^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/i
      )
    ) {
      errorsTemp = {
        ...errorsTemp,
        email: "Votre adresse email est invalide.",
      };
    }

    //checking errors
    if (Object.values(errorsTemp).some((error) => error.length > 0)) {
      setErrors(errorsTemp);
      return false;
    }
    return true;
  }

  return (
    <div>
      <div className="flex items-center space-x-2 px-4">
        <p>Référence du véhicule</p>
        <p className="font-bold">{car.car_name.toUpperCase()}</p>
      </div>

      <Form
        loading={loading}
        validation={validation}
        setValidation={setValidation}
        explanations={[
          "Veuillez remplir le formulaire ci-dessous pour nous contacter. Nous vous répondrons dans les plus brefs délais.",
        ]}
      >
        {/* name & lastName */}
        <div className="flex flex-col md:flex-row md:space-x-5">
          <FormInput
            label="Prénom"
            name="firstName"
            value={message.car_message_contact_first_name}
            error={errors.firstName}
            type="text"
            autocomplete="given-name"
            handleChange={(e) =>
              setMessage({
                ...message,
                car_message_contact_first_name: e.target.value,
              })
            }
            handleFocus={(e) => setErrors({ ...errors, firstName: "" })}
          />
          <FormInput
            label="Nom de famille"
            name="lastName"
            value={message.car_message_contact_last_name}
            error={errors.lastName}
            type="text"
            autocomplete="family-name"
            handleChange={(e) =>
              setMessage({
                ...message,
                car_message_contact_last_name: e.target.value,
              })
            }
            handleFocus={(e) => setErrors({ ...errors, lastName: "" })}
          />
        </div>

        {/* email */}
        <FormInput
          label="E-mail"
          name="email"
          value={message.car_message_contact_email}
          error={errors.email}
          type="email"
          autocomplete="email"
          handleChange={(e) =>
            setMessage({
              ...message,
              car_message_contact_email: e.target.value,
            })
          }
          handleFocus={(e) => setErrors({ ...errors, email: "" })}
        />

        {/* phone */}
        <FormPhone
          label="Téléphone"
          placeholder="0612345678"
          handleChange={(e) =>
            setMessage({
              ...message,
              car_message_contact_phone: e.target.value,
            })
          }
          handleFocus={(e) => setErrors({ ...errors, phone: "" })}
          value={message.car_message_contact_phone}
          error={errors.phone}
        />

        {/* content */}
        <FormTextarea
          label="Message"
          name="message"
          value={message.car_message_content}
          error={errors.content}
          handleChange={(e) =>
            setMessage({ ...message, car_message_content: e.target.value })
          }
          handleFocus={(e) => setErrors({ ...errors, content: "" })}
        />

        {/* submit */}
        <FormSubmit
          handleClick={handleSubmit}
          text="Envoyer"
          description="La référence du véhicule est directement intégrée à ce message. Il ne vous est pas nécessaire de l’indiquer."
          handleCheck={loading}
        />
      </Form>
    </div>
  );
}
