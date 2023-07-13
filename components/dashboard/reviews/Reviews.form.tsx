"use client";

import { useState } from "react";

import Form from "@/components/ui/form/Form";
import FormFooter from "@/components/ui/form/Form.footer";
import carCreation from "@/assets/dashboard/carCreation.jpg";

import { Message, Review } from "@prisma/client";
import FormSelect from "@/components/ui/form/Form.select";
import { MessageUpdate, updateMessage } from "@/lib/messages";
import { SendMailBody, sendMail } from "@/utils/sendgrid";
import { getFullName, getFullStringDate } from "@/utils/globals";
import FormTextarea from "@/components/ui/form/Form.textarea";
import UiButtonAction from "@/components/ui/Ui.button.action";
import { BsMailbox2, BsPhoneFill, BsStar, BsStarFill } from "react-icons/bs";
import { NewReview, createReview, updateReview } from "@/lib/reviews";
import FormInput from "@/components/ui/form/Form.input";
import FormError from "@/components/ui/form/Form.error";

export const defaultReview: Review = {
  review_id: 0,
  review_user_first_name: "",
  review_user_last_name: "",
  review_user_email: "",
  review_comment: "",
  review_note: 0,
  review_published_date: new Date(),
  review_status: "",
};

const arrayNote = [1, 2, 3, 4, 5];

const defaultErrors = {
  email: "",
  firstName: "",
  lastName: "",
  comment: "",
  note: "",
};

type ReviewsFormProps = {
  reviews: Review[];
  setReviews: React.Dispatch<React.SetStateAction<Review[]>>;
  isNew: boolean;
  currentReview: Review;
  setIsOpenForm: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ReviewsForm({
  reviews,
  setReviews,
  isNew,
  currentReview,
  setIsOpenForm,
}: ReviewsFormProps) {
  const oldReview = currentReview;
  const [review, setReview] = useState(currentReview);
  const [validation, setValidation] = useState({ success: false, message: "" });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(defaultErrors);

  function isValidForm() {
    let errorsTemp = defaultErrors;

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

    //update review in db
    if (!isNew) {
      //optimistic update
      setReviews((prev) =>
        prev.map((m) => (m.review_id === review.review_id ? review : m))
      );

      // update message in db
      const response = await updateReview(review.review_id, review);
      // if error, rollback
      if (!response) {
        setValidation({
          success: false,
          message: "Une erreur est survenue. Veuillez réessayer plus tard.",
        });
        setReviews((prev) =>
          prev.map((m) => (m.review_id === review.review_id ? oldReview : m))
        );
        setLoading(false);
        return;
      }
      setTimeout(() => {
        setReview(defaultReview);
        setValidation({
          success: true,
          message: `Le commentaire a bien été mis à jour`,
        });
        setIsOpenForm(false);
        setLoading(false);
        return;
      }, 2000);
    }

    //create review in db
    const reviewToUpdate = { ...review };
    delete (reviewToUpdate as any).review_id;
    const response = await createReview(reviewToUpdate as NewReview);
    if (!response) {
      setValidation({
        success: false,
        message: "Une erreur est survenue. Veuillez réessayer plus tard.",
      });
      setLoading(false);
      return;
    }
    setTimeout(() => {
      setReviews((prev) => [...prev, response]);
      setReview(defaultReview);
      setValidation({
        success: true,
        message: `Le commentaire a bien été créé`,
      });
      setIsOpenForm(false);
      setLoading(false);
    }, 2000);
  }

  function handleChange(
    e: React.ChangeEvent<
      HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
    >
  ) {
    setReview({ ...review, [e.currentTarget.name]: e.currentTarget.value });
  }

  function handleResetError(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setErrors({ ...errors, [e.currentTarget.name]: "" });
  }

  return (
    review && (
      <div className="mb-20 select-none">
        <Form
          validation={validation}
          setValidation={setValidation}
          loading={loading}
          imgSrc={carCreation}
        >
          {/* name & lastName */}
          <div className="flex flex-col md:flex-row md:space-x-5">
            <FormInput
              disabled={!isNew}
              label="Prénom"
              name="review_user_first_name"
              value={review.review_user_first_name}
              error={errors.firstName}
              type="text"
              autocomplete="given-name"
              handleChange={handleChange}
              handleFocus={handleResetError}
            />
            <FormInput
              disabled={!isNew}
              label="Nom de famille"
              name="review_user_last_name"
              value={review.review_user_last_name}
              error={errors.lastName}
              type="text"
              autocomplete="family-name"
              handleChange={handleChange}
              handleFocus={handleResetError}
            />
          </div>

          {/* email */}
          <FormInput
            disabled={!isNew}
            label="E-mail"
            name="review_user_email"
            value={review.review_user_email}
            error={errors.email}
            type="email"
            autocomplete="email"
            handleChange={handleChange}
            handleFocus={handleResetError}
          />

          {/* note */}
          <div className="mb-[50px] flex-col relative">
            <p className="mb-3 px-4 font-semibold">
              Note <span className="text-red-500">*</span>
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-5 ml-4">
                {arrayNote.map((note) => {
                  if (review.review_note && review.review_note >= note) {
                    return (
                      <BsStarFill
                        key={note}
                        aria-label={`note de ${note}`}
                        className="text-red-500 text-4xl cursor-pointer"
                        onClick={() =>
                          setReview({ ...review, review_note: note })
                        }
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
              <span className="text-light italic text-sm pl-[40px]">{`Note affectée : ${review.review_note} sur 5`}</span>
            </div>
            <div className="ml-2 mt-2">
              <FormError error={errors.note} />
            </div>
            {!isNew && (
              <div className="absolute top-0 left-0 w-full h-full opacity-0" />
            )}
          </div>

          {/* comment */}
          <FormTextarea
            disabled={!isNew}
            label="Commentaire"
            name="comment"
            value={review.review_comment}
            error={errors.comment}
            handleChange={(e) =>
              setReview({ ...review, review_comment: e.currentTarget.value })
            }
            handleFocus={() => setErrors({ ...errors, comment: "" })}
          />

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
