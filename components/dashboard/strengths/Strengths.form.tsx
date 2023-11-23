"use client";

import { createStrength, updateStrength } from "@/lib/strengths";

import Form from "@/components/ui/form/Form";
import FormFooter from "@/components/ui/form/Form.footer";
import FormInput from "@/components/ui/form/Form.input";
import { Strength } from "@prisma/client";
import carCreation from "@/assets/dashboard/carCreation.jpg";
import toast from "react-hot-toast";
import { useState } from "react";

export const defaultStrength: Strength = {
  strength_id: 0,
  strength_name: "",
};

const defaultErrors = {
  strength_name: "",
};

type StrengthsFormProps = {
  setStrengths: React.Dispatch<React.SetStateAction<Strength[]>>;
  isNew: boolean;
  currentStrength: Strength;
  setIsOpenForm: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function StrengthForm({
  setStrengths,
  isNew,
  currentStrength,
  setIsOpenForm,
}: StrengthsFormProps) {
  const oldStrength = currentStrength;
  const [strength, setStrength] = useState(currentStrength);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(defaultErrors);

  function isValidForm() {
    if (!strength) return false;
    let errorsTemp = defaultErrors;

    // name validation
    if (
      strength.strength_name.trim().length < 5 ||
      strength.strength_name.trim().length > 60
    ) {
      errorsTemp = {
        ...errorsTemp,
        strength_name:
          "Le nom de la catégorie doit contenir au moins 5 caractères et au maximum 60.",
      };
    }

    //checking errors
    if (Object.values(errorsTemp).some((error) => error.length > 0)) {
      setErrors(errorsTemp);
      toast.error("Veuillez corriger les erreurs dans le formulaire");
      return false;
    }
    return true;
  }

  async function handleSubmit() {
    if (!isValidForm()) return;

    setLoading(true);

    if (isNew === false) {
      //optimistic update
      setStrengths((prev) =>
        prev.map((c) => (c.strength_id === strength.strength_id ? strength : c))
      );

      // update picture in db
      const strengthToUpdate = { ...strength };
      const response = await updateStrength(
        strengthToUpdate.strength_id,
        strengthToUpdate
      );
      // if error, rollback
      if (!response) {
        toast.error("Une erreur est survenue. Veuillez réessayer plus tard");
        setStrengths((prev) =>
          prev.map((c) =>
            c.strength_id === oldStrength.strength_id ? oldStrength : c
          )
        );
        setLoading(false);
        return;
      }
      setTimeout(() => {
        setLoading(false);
        setStrength(defaultStrength);
        toast.success(`Le point fort a bien été mis à jour.`);
        setIsOpenForm(false);
        return;
      }, 2000);

      return;
    } else {
      // create picture in db
      const strengthToCreate = { ...strength };
      delete (strengthToCreate as any).strength_id;
      const response = await createStrength(strengthToCreate);

      if (response) {
        setTimeout(() => {
          setStrengths((prev) => [...prev, response]);
          setStrength(defaultStrength);
          toast.success(`Le point fort a bien été créé.`);
          setIsOpenForm(false);
          setLoading(false);
          return;
        }, 2000);
        // if error, rollback
        if (!response) {
          toast.error("Une erreur est survenue. Veuillez réessayer plus tard");
          setStrengths((prev) =>
            prev.map((c) =>
              c.strength_id === oldStrength.strength_id ? oldStrength : c
            )
          );
          setLoading(false);
          return;
        }
      }
    }

    setLoading(false);
  }

  function handleChange(
    e: React.ChangeEvent<
      HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
    >
  ) {
    setStrength({ ...strength, [e.currentTarget.name]: e.currentTarget.value });
  }

  function handleResetError(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setErrors({ ...errors, [e.currentTarget.name]: "" });
  }

  return (
    strength && (
      <div className="mb-20">
        <Form loading={loading} imgSrc={carCreation}>
          {/* name */}
          <FormInput
            label="Nom du point fort"
            type="text"
            name="strength_name"
            error={errors.strength_name}
            handleChange={handleChange}
            handleFocus={handleResetError}
            value={strength.strength_name ? strength.strength_name : ""}
          />

          {/* submit */}
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
