"use client";

import { useEffect, useState } from "react";

import Form from "@/components/ui/form/Form";
import FormInput from "@/components/ui/form/Form.input";
import FormFooter from "@/components/ui/form/Form.footer";
import carCreation from "@/assets/dashboard/carCreation.jpg";

import { Hour } from "@prisma/client";
import { createHour, updateHour } from "@/lib/hours";
import FormSelect from "@/components/ui/form/Form.select";

export const defaultHour: Hour = {
  hour_id: 0,
  hour_day: "",
  hour_morning_opening: "08:00",
  hour_morning_closing: "12:00",
  hour_morning_status: false,
  hour_afternoon_opening: "14:00",
  hour_afternoon_closing: "18:00",
  hour_afternoon_status: false,
};

export const defaultErrors = {
  hour_day: "",
  hour_morning_opening: "",
  hour_morning_closing: "",
  hour_afternoon_opening: "",
  hour_afternoon_closing: "",
};

type HoursFormProps = {
  hours: Hour[];
  setHours: React.Dispatch<React.SetStateAction<Hour[]>>;
  isNew: boolean;
  currentHour: Hour;
  setIsOpenForm: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function HourForm({
  hours,
  setHours,
  isNew,
  currentHour,
  setIsOpenForm,
}: HoursFormProps) {
  const oldHour = currentHour;
  const [hour, setHour] = useState(currentHour);
  const [validation, setValidation] = useState({ success: false, message: "" });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(defaultErrors);
  const [availableDays, setAvailableDays] = useState<
    { label: string; value: string }[]
  >([]);

  function isValidForm() {
    if (!hour) return false;
    let errorsTemp = defaultErrors;

    if (hour.hour_day === "") {
      errorsTemp = {
        ...errorsTemp,
        hour_day: "Le jour ne peut pas être vide.",
      };
    }

    if (hour.hour_morning_opening === "") {
      errorsTemp = {
        ...errorsTemp,
        hour_morning_opening: "L'heure d'ouverture ne peut pas être vide.",
      };
    }
    if (hour.hour_morning_closing) {
      if (hour.hour_morning_closing === "") {
        errorsTemp = {
          ...errorsTemp,
          hour_morning_closing: "L'heure de fermeture ne peut pas être vide.",
        };
      }
    }

    if (hour.hour_morning_opening > hour.hour_morning_closing) {
      errorsTemp = {
        ...errorsTemp,
        hour_morning_opening:
          "L'heure d'ouverture doit être inférieure à l'heure de fermeture.",
      };
    }

    if (hour.hour_afternoon_closing) {
      if (hour.hour_afternoon_closing === "") {
        errorsTemp = {
          ...errorsTemp,
          hour_afternoon_closing: "L'heure de fermeture ne peut pas être vide.",
        };
      }
      if (hour.hour_afternoon_opening === "") {
        errorsTemp = {
          ...errorsTemp,
          hour_afternoon_opening: "L'heure d'ouverture ne peut pas être vide.",
        };
      }
    }

    if (hour.hour_afternoon_opening > hour.hour_afternoon_closing) {
      errorsTemp = {
        ...errorsTemp,
        hour_afternoon_opening:
          "L'heure d'ouverture doit être inférieure à l'heure de fermeture.",
      };
    }

    //checking errors
    if (Object.values(errorsTemp).some((error) => error.length > 0)) {
      setErrors(errorsTemp);
      return false;
    }
    return true;
  }

  async function handleSubmit() {
    if (!isValidForm()) return;

    setLoading(true);
    setValidation({ success: false, message: "" });

    if (isNew === false) {
      //optimistic update
      setHours((prev) =>
        prev.map((h) => (h.hour_id === hour.hour_id ? hour : h))
      );

      // update hour in db
      const hourToUpdate = { ...hour };
      const response = await updateHour(hourToUpdate);
      // if error, rollback
      if (!response) {
        setValidation({
          success: false,
          message: "Une erreur est survenue. Veuillez réessayer plus tard.",
        });
        setHours((prev) =>
          prev.map((h) => (h.hour_id === oldHour.hour_id ? oldHour : h))
        );
        setLoading(false);
        return;
      }
      setTimeout(() => {
        setHour(defaultHour);
        setValidation({
          success: true,
          message: `L'horaire a bien été mis à jour.`,
        });
        setIsOpenForm(false);
        setLoading(false);
      }, 2000);

      return;
    } else {
      // create picture in db
      const hourToCreate = { ...hour };
      delete (hourToCreate as any).hour_id;
      const response = await createHour(hourToCreate);

      if (response) {
        setHours((prev) => [...prev, response]);
        setTimeout(() => {
          setHour(defaultHour);
          setValidation({
            success: true,
            message: `L'horaire a bien été créée.`,
          });
          setIsOpenForm(false);
          setLoading(false);
          return;
        }, 2000);
        // if error, rollback
        if (!response) {
          setValidation({
            success: false,
            message: "Une erreur est survenue. Veuillez réessayer plus tard.",
          });
          setHours((prev) =>
            prev.map((h) => (h.hour_id === hour.hour_id ? oldHour : h))
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
    setHour({ ...hour, [e.currentTarget.name]: e.currentTarget.value });
  }

  function handleResetError(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setErrors({ ...errors, [e.currentTarget.name]: "" });
  }

  useEffect(() => {
    function compareRemainingDays() {
      const days = [
        "Lundi",
        "Mardi",
        "Mercredi",
        "Jeudi",
        "Vendredi",
        "Samedi",
        "Dimanche",
      ];
      const remainingDays = days.filter(
        (d) => !hours.some((h) => h.hour_day === d)
      );

      const objectRemainingDays: { value: string; label: string }[] =
        remainingDays.map((d) => ({
          value: d,
          label: d,
        }));
      setAvailableDays(objectRemainingDays);
    }
    compareRemainingDays();
  }, [hours]);

  return (
    hour && (
      <div className="mb-20">
        <Form
          validation={validation}
          setValidation={setValidation}
          loading={loading}
          imgSrc={carCreation}
        >
          {/* jour */}
          {availableDays.length > 0 ? (
            <FormSelect
              label="Jour de la semaine"
              value={hour.hour_day}
              name="hour_day"
              handleChange={handleChange}
              options={[
                { label: "-- Choisir un jour --", value: "" },
                ...availableDays,
              ]}
              handleFocus={(e) => {
                setErrors({ ...errors, hour_day: "" });
              }}
              error={errors.hour_day}
            />
          ) : (
            !isNew && (
              <h4 className="text-2xl font-semibold ml-4 select-none">
                {hour.hour_day}
              </h4>
            )
          )}

          <div className="mt-5">
            {/* morning status */}
            <FormSelect
              label="Matinée"
              value={hour.hour_morning_status ? "ouvert" : "fermé"}
              name="hour_morning_status"
              handleChange={(e) =>
                setHour({
                  ...hour,
                  hour_morning_status:
                    e.currentTarget.value === "ouvert" ? true : false,
                })
              }
              options={[
                {
                  value: "ouvert",
                  label: "Ouvert",
                },
                {
                  value: "fermé",
                  label: "Fermé",
                },
              ]}
              handleFocus={() => {}}
            />
            <div className="flex space-x-2">
              {/* morning opening*/}
              <FormInput
                label="Ouverture"
                type="time"
                name="hour_morning_opening"
                handleChange={handleChange}
                handleFocus={() => {}}
                value={hour.hour_morning_opening}
                error={errors.hour_morning_opening}
              />
              {/* morning closing */}
              <FormInput
                label="Fermeture"
                type="time"
                name="hour_morning_closing"
                handleChange={handleChange}
                handleFocus={() => {}}
                value={hour.hour_morning_closing}
                error={errors.hour_morning_closing}
              />
            </div>
          </div>
          <div className="mt-5">
            {/* afternoon status */}
            <FormSelect
              label="Après-midi"
              value={hour.hour_afternoon_status ? "ouvert" : "fermé"}
              name="hour_afternoon_status"
              handleChange={(e) =>
                setHour({
                  ...hour,
                  hour_afternoon_status:
                    e.currentTarget.value === "ouvert" ? true : false,
                })
              }
              options={[
                {
                  value: "ouvert",
                  label: "Ouvert",
                },
                {
                  value: "fermé",
                  label: "Fermé",
                },
              ]}
              handleFocus={() => {}}
            />
            <div className="flex space-x-2">
              {/* afternoon opening*/}
              <FormInput
                label="Ouverture"
                type="time"
                name="hour_afternoon_opening"
                handleChange={handleChange}
                handleFocus={() => {}}
                value={hour.hour_afternoon_opening}
                error={errors.hour_afternoon_opening}
              />
              {/* afternoon closing */}
              <FormInput
                label="Fermeture"
                type="time"
                name="hour_afternoon_closing"
                handleChange={handleChange}
                handleFocus={() => {}}
                value={hour.hour_afternoon_closing}
                error={errors.hour_afternoon_closing}
              />
            </div>
          </div>

          <FormFooter
            handleSubmit={handleSubmit}
            isNew={isNew}
            loading={loading}
            disabled={availableDays.length === 0 && isNew}
            disabledText="Tous les jours ont été ajoutés"
          />
        </Form>
      </div>
    )
  );
}
