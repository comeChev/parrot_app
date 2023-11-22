"use client";

import { BsStar, BsStarFill } from "react-icons/bs";
import { NewReview, createReview } from "@/lib/reviews";

import Form from "@/components/ui/form/Form";
import FormError from "@/components/ui/form/Form.error";
import FormInput from "@/components/ui/form/Form.input";
import FormReacaptcha from "@/components/ui/form/Form.recaptcha";
import FormSubmit from "@/components/ui/form/Form.submit";
import FormTextarea from "@/components/ui/form/Form.textarea";
import { useState } from "react";

const defaultReview: NewReview = {
  review_user_email: "",
  review_user_first_name: "",
  review_user_last_name: "",
  review_comment: "",
  review_note: 0,
  review_status: null,
};

const arrayNote = [1, 2, 3, 4, 5];

type ErrorsProps = {
  email: string;
  firstName: string;
  lastName: string;
  comment: string;
  note: string;
  captcha: string;
};

type ValidationProps = {
  success: boolean;
  message: string;
};

const defaultErrors: ErrorsProps = {
  email: "",
  firstName: "",
  lastName: "",
  comment: "",
  note: "",
  captcha: "",
};

const defaultValidation: ValidationProps = {
  success: false,
  message: "",
};

const explanations = [
  "Votre expérience nous intéresse. Votre avis nous permettra d’améliorer nos services afin de mieux subvenir à vos besoins. Pour des raisons de sécurité, votre avis sera soumis à modération avant d’être publié sur notre site.",
  "Soyez rassurés,tous les avis sont acceptés (bons comme moins bons) sous réserve de respect et de courtoisie.",
  "Une note minimale de 1 est nécessaire pour valider l'avis.",
];

export default function ReviewsForm() {
  const [review, setReview] = useState<NewReview>(defaultReview);
  const [errors, setErrors] = useState<ErrorsProps>(defaultErrors);
  const [loading, setLoading] = useState<boolean>(false);
  const [captcha, setCaptcha] = useState<null | string>(null);
  const [validation, setValidation] =
    useState<ValidationProps>(defaultValidation);

  // handle errors
  function isValidForm() {
    let errorsTemp: ErrorsProps = defaultErrors;
    // comment validation
    if (
      review.review_comment.trim().length < 10 ||
      review.review_comment.trim().length > 500
    ) {
      errorsTemp = {
        ...errorsTemp,
        comment:
          "Votre commentaire doit contenir au moins 10 caractères et au maximum 500.",
      };
    }

    // email validation
    if (
      !review.review_user_email.match(
        /^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/i
      )
    ) {
      errorsTemp = {
        ...errorsTemp,
        email: "Votre adresse email est invalide.",
      };
    }
    // note validation
    if (review.review_note < 1) {
      errorsTemp = { ...errorsTemp, note: "Veuillez choisir une note." };
    }

    // firstName validation
    if (
      review.review_user_first_name.trim().length < 3 ||
      review.review_user_first_name.trim().length > 50
    ) {
      errorsTemp = {
        ...errorsTemp,
        firstName:
          "Votre prénom doit comporter un minimum de 3 lettres et un maximum de 50",
      };
    }

    // lastName validation
    if (
      review.review_user_last_name.trim().length < 3 ||
      review.review_user_last_name.trim().length > 50
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

  //handle submit
  async function handleSubmit() {
    if (isValidForm()) {
      setValidation({ success: false, message: "" });
      setLoading(true);
      const response = await createReview(review);

      setTimeout(() => {
        if (response !== null) {
          setLoading(false);
          setValidation({
            success: true,
            message: "Votre avis a bien été enregistré. Merci !",
          });
          setReview(defaultReview);
          return;
        }
        setLoading(false);
        setValidation({
          success: false,
          message: "Une erreur est survenue. Veuillez réessayer.",
        });
        return;
      }, 2000);
    }
  }

  return (
    // Form
    <Form
      explanations={explanations}
      loading={loading}
      validation={validation}
      setValidation={setValidation}
    >
      {/* name & lastName */}
      <div className="flex flex-col md:flex-row md:space-x-5">
        <FormInput
          label="Prénom"
          name="firstName"
          value={review.review_user_first_name}
          error={errors.firstName}
          type="text"
          autocomplete="given-name"
          handleChange={(e) =>
            setReview({ ...review, review_user_first_name: e.target.value })
          }
          handleFocus={(e) => setErrors({ ...errors, firstName: "" })}
        />
        <FormInput
          label="Nom de famille"
          name="lastName"
          value={review.review_user_last_name}
          error={errors.lastName}
          type="text"
          autocomplete="family-name"
          handleChange={(e) =>
            setReview({ ...review, review_user_last_name: e.target.value })
          }
          handleFocus={(e) => setErrors({ ...errors, lastName: "" })}
        />
      </div>

      {/* email */}
      <FormInput
        label="E-mail"
        name="email"
        value={review.review_user_email}
        error={errors.email}
        type="email"
        autocomplete="email"
        handleChange={(e) =>
          setReview({ ...review, review_user_email: e.target.value })
        }
        handleFocus={(e) => setErrors({ ...errors, email: "" })}
      />

      {/* note */}
      <div className="mb-[50px] flex-col">
        <p className="mb-3 px-4 font-semibold">
          Note <span className="text-red-500">*</span>
        </p>
        <div className="flex flex-col md:items-center md:justify-between md:flex-row">
          <div className="flex items-center space-x-5 ml-4">
            {arrayNote.map((note) => {
              if (review.review_note && review.review_note >= note) {
                return (
                  <BsStarFill
                    key={note}
                    aria-label={`note de ${note}`}
                    className="text-red-500 text-4xl cursor-pointer"
                    onClick={() => setReview({ ...review, review_note: note })}
                    onMouseEnter={() =>
                      setReview({ ...review, review_note: note })
                    }
                  />
                );
              } else {
                return (
                  <BsStar
                    key={note}
                    aria-label={`note de ${note}`}
                    className="text-red-500 cursor-pointer text-2xl"
                    onMouseEnter={() =>
                      setReview({ ...review, review_note: note })
                    }
                  />
                );
              }
            })}
          </div>
          <span className="text-light italic text-sm pl-4 mt-2 md:mt-0 md:pl-[40px]">{`Note affectée : ${review.review_note} sur 5`}</span>
        </div>
        <div className="mt-2 mx-2">
          <FormError error={errors.note} />
        </div>
      </div>

      {/* comment */}
      <FormTextarea
        label="Commentaire"
        name="comment"
        value={review.review_comment}
        error={errors.comment}
        handleChange={(e) =>
          setReview({ ...review, review_comment: e.currentTarget.value })
        }
        handleFocus={() => setErrors({ ...errors, comment: "" })}
      />
      <FormReacaptcha setCaptcha={setCaptcha} error={errors.captcha} />
      {/* submit button */}
      <FormSubmit
        handleClick={handleSubmit}
        handleCheck={loading}
        description="Votre message apparaîtra en ligne une fois celui-ci validé par nos
          modérateurs."
      />
    </Form>
  );
}
