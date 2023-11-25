"use client";

import { BsExclamationDiamondFill, BsPenFill, BsTrash2Fill } from "react-icons/bs";

import { Strength } from "@prisma/client";
import { UiAlertError } from "@/components/ui/Ui.alert.windows";
import { deleteStrength } from "@/lib/strengths";
import { useState } from "react";

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
      className="flex items-center justify-between w-full px-4 py-2 text-teal-500 text-md hover:text-teal-700 disabled:text-neutral-300 hover:bg-neutral-200"
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

export function StrengthsListActionDelete({ strength, setStrengths, setIsOpen }: StrengthsListActionStatusProps) {
  const [isConfirm, setIsConfirm] = useState(false);
  const [validation, setValidation] = useState({ success: false, message: "" });

  async function handleDelete() {
    //optimistic update
    setStrengths((prev) => prev.filter((c) => c.strength_id !== strength.strength_id));

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
        message: "Vous ne pouvez pas supprimer ce point fort. Il est lié à des voitures",
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
          className="flex items-center justify-between px-4 py-2 text-red-700 bg-red-200 text-md hover:text-red-800 disabled:text-neutral-300 hover:bg-neutral-200"
          onClick={handleDelete}
        >
          <span className="mr-2 text-sm">Confirmer la suppression</span>
          <BsExclamationDiamondFill className="" />
        </button>
      ) : (
        <button
          className="flex items-center justify-between px-4 py-2 text-red-700 text-md hover:text-red-800 disabled:text-neutral-300 hover:bg-neutral-200"
          onClick={handleConfirm}
        >
          <span className="mr-2 text-sm">Supprimer</span>
          <BsTrash2Fill className="" />
        </button>
      )}
      {!validation.success && validation.message !== "" && (
        <UiAlertError handleClose={() => setValidation({ success: false, message: "" })} message={validation.message} />
      )}
    </div>
  );
}
