"use client";

import { ErrorsProps, arrayNote, defaultErrors, defaultReview, explanations } from "@/utils/form/review";
import { FaRegStar, FaStar } from "react-icons/fa";
import { Validation, checkErrors } from "@/utils/form/validation";

import Form from "@/components/ui/form/Form";
import FormError from "@/components/ui/form/Form.error";
import FormInput from "@/components/ui/form/Form.input";
import FormReacaptcha from "@/components/ui/form/Form.recaptcha";
import FormSubmit from "@/components/ui/form/Form.submit";
import FormTextarea from "@/components/ui/form/Form.textarea";
import { createReview } from "@/lib/reviews";
import toast from "react-hot-toast";
import { useState } from "react";

export default function ReviewsForm() {
  const [form, setForm] = useState({ values: defaultReview, errors: defaultErrors });
  const [status, setStatus] = useState({ loading: false, sent: false, error: false });
  const [captcha, setCaptcha] = useState<null | string>(null);

  // handle errors
  function isValidForm() {
    let temp: ErrorsProps = defaultErrors;

    temp.review_comment = new Validation(form.values.review_comment).min(10).max(500).validate();
    temp.review_user_email = new Validation(form.values.review_user_email).email().validate();
    temp.review_note = new Validation(form.values.review_note).min(1, "Veuillez choisir une note !").validate();
    temp.review_user_first_name = new Validation(form.values.review_user_first_name).min(3).max(50).validate();
    temp.review_user_last_name = new Validation(form.values.review_user_last_name).min(3).max(50).validate();
    temp.captcha = new Validation(captcha).required("Veuillez cocher la case 'Je ne suis pas un robot'").validate();

    return checkErrors(temp, () => setForm({ ...form, errors: temp }));
  }

  //handle submit
  async function handleSubmit() {
    if (isValidForm()) {
      setStatus({ ...status, loading: true });
      const response = await createReview(form.values);

      setTimeout(() => {
        if (response !== null) {
          setStatus({ ...status, loading: false, sent: true });
          toast.success("Votre avis a bien été enregistré. Merci !");
          setForm({ values: defaultReview, errors: defaultErrors });
          return;
        }
        setStatus({ ...status, loading: false, error: true });
        toast.error("Une erreur est survenue. Veuillez réessayer");
        return;
      }, 2000);
    }
  }
  function handleErrorsFocus(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, errors: { ...form.errors, [e.target.name]: "" } });
  }
  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, values: { ...form.values, [e.target.name]: e.target.value } });
  }

  function handleChangeNote(note: number) {
    setForm({ ...form, errors: { ...form.errors, review_note: "" } });
    setForm({ ...form, values: { ...form.values, review_note: note } });
  }

  return (
    // Form
    <Form explanations={explanations} loading={status.loading}>
      {/* name & lastName */}
      <div className="flex flex-col md:flex-row md:space-x-5">
        <FormInput
          label="Prénom"
          name="review_user_first_name"
          value={form.values.review_user_first_name}
          error={form.errors.review_user_first_name}
          type="text"
          autocomplete="given-name"
          handleChange={handleChange}
          handleFocus={handleErrorsFocus}
        />
        <FormInput
          label="Nom de famille"
          name="review_user_last_name"
          value={form.values.review_user_last_name}
          error={form.errors.review_user_last_name}
          type="text"
          autocomplete="family-name"
          handleChange={handleChange}
          handleFocus={handleErrorsFocus}
        />
      </div>

      {/* email */}
      <FormInput
        label="E-mail"
        name="review_user_email"
        value={form.values.review_user_email}
        error={form.errors.review_user_email}
        type="email"
        autocomplete="email"
        handleChange={handleChange}
        handleFocus={handleErrorsFocus}
      />

      {/* note */}
      <div className="mb-[50px] flex-col relative p-1">
        <p className="px-4 mb-3 font-semibold">
          Note <span className="text-red-500">*</span>
        </p>
        <div className="flex flex-col md:items-center md:justify-between md:flex-row">
          <div className="flex items-center ml-4 space-x-5">
            {arrayNote.map((note) => {
              if (form.values?.review_note >= note) {
                return (
                  <FaStar
                    key={note}
                    aria-label={`note de ${note}`}
                    className="text-4xl text-red-500 cursor-pointer"
                    onClick={() => handleChangeNote(note)}
                    onMouseEnter={() => handleChangeNote(note)}
                  />
                );
              } else {
                return (
                  <FaRegStar
                    key={note}
                    aria-label={`note de ${note}`}
                    className="text-2xl text-red-500 cursor-pointer"
                    onClick={() => handleChangeNote(note)}
                    onMouseEnter={() => handleChangeNote(note)}
                  />
                );
              }
            })}
          </div>
          <span className="text-light italic text-sm pl-4 mt-2 md:mt-0 md:pl-[40px]">{`Note affectée : ${form.values.review_note} sur 5`}</span>
        </div>
        {form.errors.review_note !== "" && <FormError error={form.errors.review_note} />}
      </div>

      {/* comment */}
      <FormTextarea
        label="Commentaire"
        name="review_comment"
        value={form.values.review_comment}
        error={form.errors.review_comment}
        handleChange={handleChange}
        handleFocus={handleErrorsFocus}
      />

      <FormReacaptcha setCaptcha={setCaptcha} error={form.errors.captcha} />

      {/* submit button */}
      <FormSubmit
        handleClick={handleSubmit}
        handleCheck={status.loading}
        description="Votre message apparaîtra en ligne une fois celui-ci validé par nos
          modérateurs."
      />
    </Form>
  );
}
