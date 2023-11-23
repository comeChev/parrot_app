"use client";

import { MessageCreate, createMessage } from "@/lib/messages";

import Form from "@/components/ui/form/Form";
import FormError from "@/components/ui/form/Form.error";
import FormInput from "@/components/ui/form/Form.input";
import FormPhone from "@/components/ui/form/Form.phone";
import FormReacaptcha from "@/components/ui/form/Form.recaptcha";
import FormSubmit from "@/components/ui/form/Form.submit";
import FormTextarea from "@/components/ui/form/Form.textarea";
import ReCAPTCHA from "react-google-recaptcha";
import toast from "react-hot-toast";
import { useState } from "react";

const defaultMessage: MessageCreate = {
  message_contact_first_name: "",
  message_contact_last_name: "",
  message_contact_email: "",
  message_contact_phone: "",
  message_content: "",
  message_status: "PENDING",
  message_response: null,
  message_response_type: null,
  message_response_date: null,
};

type ErrorsProps = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  content: string;
  captcha: string;
};

const defaultErrors: ErrorsProps = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  content: "",
  captcha: "",
};

export default function ContactForm() {
  const [message, setMessage] = useState(defaultMessage);
  const [errors, setErrors] = useState(defaultErrors);
  const [loading, setLoading] = useState(false);
  const [captcha, setCaptcha] = useState<null | string>(null);

  // handle errors
  function isValidForm() {
    let errorsTemp: ErrorsProps = defaultErrors;

    // content validation
    if (
      message.message_content.trim().length < 10 ||
      message.message_content.trim().length > 500
    ) {
      errorsTemp = {
        ...errorsTemp,
        content:
          "Votre message doit contenir au moins 10 caractères et au maximum 500.",
      };
    }

    // phone validation
    if (message.message_contact_phone.match(/^[0][1-9][0-9]{8}/) === null) {
      errorsTemp = {
        ...errorsTemp,
        phone:
          "Votre numéro de téléphone doit commencer par 0 et contenir 10 chiffres (ex : 0198237645).",
      };
    }

    // email validation
    if (
      !message.message_contact_email.match(
        /^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/i
      )
    ) {
      errorsTemp = {
        ...errorsTemp,
        email: "Votre adresse email est invalide.",
      };
    }
    // firstName validation
    if (
      message.message_contact_first_name.trim().length < 3 ||
      message.message_contact_first_name.trim().length > 50
    ) {
      errorsTemp = {
        ...errorsTemp,
        firstName:
          "Votre prénom doit comporter un minimum de 3 lettres et un maximum de 50",
      };
    }

    // lastName validation
    if (
      message.message_contact_last_name.trim().length < 3 ||
      message.message_contact_last_name.trim().length > 50
    ) {
      errorsTemp = {
        ...errorsTemp,
        lastName:
          "Votre nom de famille doit comporter un minimum de 3 lettres et un maximum de 50",
      };
    }

    if (captcha === null) {
      errorsTemp = {
        ...errorsTemp,
        captcha: "Veuillez cocher la case 'Je ne suis pas un robot'.",
      };
    }

    //checking errors
    if (Object.values(errorsTemp).some((error) => error.length > 0)) {
      setErrors(errorsTemp);
      return false;
    }
    setErrors(defaultErrors);
    return true;
  }

  async function handleSubmit() {
    if (!isValidForm()) return;

    setLoading(true);
    const response = await createMessage(message);
    setTimeout(() => {
      if (response) {
        setLoading(false);
        toast.success("Votre message a bien été envoyé !");
        setMessage(defaultMessage);
        return;
      }
      setLoading(false);
      toast.error("Une erreur est survenue, veuillez réessayer plus tard");
    }, 2000);
  }

  return (
    //Form
    <Form
      loading={loading}
      explanations={[
        "Vous avez des questions sur votre voiture, sur nos prestations ? Notre équipe est toujours prête à vous aider. Vous pouvez nous appeler ou même nous envoyer un message via le formulaire de contact ci-dessous.",
      ]}
    >
      {/* name & lastName */}
      <div className="flex flex-col md:flex-row md:space-x-5">
        <FormInput
          label="Prénom"
          name="firstName"
          value={message.message_contact_first_name}
          error={errors.firstName}
          type="text"
          autocomplete="given-name"
          handleChange={(e) =>
            setMessage({
              ...message,
              message_contact_first_name: e.target.value,
            })
          }
          handleFocus={(e) => setErrors({ ...errors, firstName: "" })}
        />
        <FormInput
          label="Nom de famille"
          name="lastName"
          value={message.message_contact_last_name}
          error={errors.lastName}
          type="text"
          autocomplete="family-name"
          handleChange={(e) =>
            setMessage({
              ...message,
              message_contact_last_name: e.target.value,
            })
          }
          handleFocus={(e) => setErrors({ ...errors, lastName: "" })}
        />
      </div>

      {/* email */}
      <FormInput
        label="E-mail"
        name="email"
        value={message.message_contact_email}
        error={errors.email}
        type="email"
        autocomplete="email"
        handleChange={(e) =>
          setMessage({ ...message, message_contact_email: e.target.value })
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
            message_contact_phone: e.target.value.trim(),
          })
        }
        handleFocus={(e) => setErrors({ ...errors, phone: "" })}
        value={message.message_contact_phone}
        error={errors.phone}
      />

      {/* content */}
      <FormTextarea
        label="Message"
        name="message"
        value={message.message_content}
        error={errors.content}
        handleChange={(e) =>
          setMessage({ ...message, message_content: e.target.value })
        }
        handleFocus={(e) => setErrors({ ...errors, content: "" })}
      />

      <FormReacaptcha setCaptcha={setCaptcha} error={errors.captcha} />

      {/* submit */}
      <FormSubmit
        handleClick={handleSubmit}
        handleCheck={loading}
        description="Dans la mesure du possible, nous essayons toujours de vous contacter par téléphone. Le cas échéant, nous vous répondrons par mail."
      />
    </Form>
  );
}
