"use client";

import { UiAlertError } from "@/components/ui/Ui.alert.windows";
import { deleteStrength } from "@/lib/strengths";
import { Strength } from "@prisma/client";
import { useState } from "react";
import {
  BsExclamationDiamondFill,
  BsPenFill,
  BsTrash2Fill,
} from "react-icons/bs";

type StrengthsListActionEditProps = {
  strength: Strength;
  setCurrent: React.Dispatch<React.SetStateAction<Strength>>;
  setOpenForm: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsNew: React.Dispatch<React.SetStateAction<boolean>>;
};

export function StrengthsListActionEdit({
  strength,
  setCurrent,
  setOpenForm,
  setIsOpen,
  setIsNew,
}: StrengthsListActionEditProps) {
  function handleEdit() {
    setCurrent(strength);
    setIsNew(false);
    setOpenForm(true);
    setIsOpen(false);
  }

  return (
    <button
      type="button"
      onClick={handleEdit}
      className="text-md text-teal-500 hover:text-teal-700 disabled:text-neutral-300 flex items-center justify-between hover:bg-neutral-200 px-4 py-2"
    >
      <p className="text-sm">Éditer</p>
      <BsPenFill className="" />
    </button>
  );
}

type StrengthsListActionStatusProps = {
  strength: Strength;
  setStrengths: React.Dispatch<React.SetStateAction<Strength[]>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function StrengthsListActionDelete({
  strength,
  setStrengths,
  setIsOpen,
}: StrengthsListActionStatusProps) {
  const [isConfirm, setIsConfirm] = useState(false);
  const [validation, setValidation] = useState({ success: false, message: "" });

  async function handleDelete() {
    //optimistic update
    setStrengths((prev) =>
      prev.filter((c) => c.strength_id !== strength.strength_id)
    );

    //update DB
    const res = await deleteStrength(strength.strength_id);
    if (!res) {
      setStrengths((prev) => [
        ...prev,
        {
          ...strength,
        },
      ]);
      setIsOpen(false);
      setValidation({
        success: false,
        message:
          "Vous ne pouvez pas supprimer ce point fort. Il est lié à des voitures",
      });
      return;
    }

    setIsOpen(false);
  }

  async function handleConfirm() {
    setIsConfirm(true);
    setTimeout(() => {
      setIsConfirm(false);
    }, 2000);
  }
  return (
    <div>
      {isConfirm ? (
        <button
          className="text-md text-red-700 hover:text-red-800 bg-red-200 disabled:text-neutral-300 flex items-center justify-between hover:bg-neutral-200 px-4 py-2"
          onClick={handleDelete}
        >
          <span className="text-sm mr-2">Confirmer la suppression</span>
          <BsExclamationDiamondFill className="" />
        </button>
      ) : (
        <button
          className="text-md text-red-700 hover:text-red-800 disabled:text-neutral-300 flex items-center justify-between hover:bg-neutral-200 px-4 py-2"
          onClick={handleConfirm}
        >
          <span className="text-sm mr-2">Supprimer</span>
          <BsTrash2Fill className="" />
        </button>
      )}
      {!validation.success && validation.message !== "" && (
        <UiAlertError
          handleClose={() => setValidation({ success: false, message: "" })}
          message={validation.message}
        />
      )}
    </div>
  );
}
