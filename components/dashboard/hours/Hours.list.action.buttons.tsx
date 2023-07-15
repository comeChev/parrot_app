"use client";

import { deleteCategory } from "@/lib/categories";
import { deleteHour } from "@/lib/hours";
import { deleteFile } from "@/utils/supabase.upload";
import { Category, Hour } from "@prisma/client";
import { useState } from "react";
import {
  BsExclamationDiamondFill,
  BsPenFill,
  BsTrash2Fill,
} from "react-icons/bs";

type HoursListActionEditProps = {
  hour: Hour;
  setCurrent: React.Dispatch<React.SetStateAction<Hour>>;
  setOpenForm: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsNew: React.Dispatch<React.SetStateAction<boolean>>;
  list: React.RefObject<HTMLDivElement>;
};

export function HoursListActionEdit({
  hour,
  setCurrent,
  setOpenForm,
  setIsOpen,
  setIsNew,
  list,
}: HoursListActionEditProps) {
  function handleEdit() {
    setCurrent(hour);
    setIsNew(false);
    setOpenForm(true);
    setIsOpen(false);
    setTimeout(() => {
      list.current?.scrollIntoView({ behavior: "smooth" });
    }, 300);
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

type HoursListActionStatusProps = {
  hour: Hour;
  setHours: React.Dispatch<React.SetStateAction<Hour[]>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function HoursListActionDelete({
  hour,
  setHours,
  setIsOpen,
}: HoursListActionStatusProps) {
  const [isConfirm, setIsConfirm] = useState(false);

  async function handleDelete() {
    //optimistic update
    setHours((prev) => prev.filter((h) => h.hour_day !== hour.hour_day));

    //update DB
    const res = await deleteHour(hour.hour_id);
    if (!res) {
      setHours((prev) => [
        ...prev,
        {
          ...hour,
        },
      ]);
      setIsOpen(false);
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

  return isConfirm ? (
    <button
      className="text-md text-red-700 hover:text-red-800 bg-red-200 disabled:text-neutral-300 flex items-center justify-between hover:bg-neutral-200 px-4 py-2"
      onClick={handleDelete}
    >
      <span className="text-sm">Confirmer la suppression</span>
      <BsExclamationDiamondFill className="" />
    </button>
  ) : (
    <button
      className="text-md text-red-700 hover:text-red-800 disabled:text-neutral-300 flex items-center justify-between hover:bg-neutral-200 px-4 py-2"
      onClick={handleConfirm}
    >
      <span className="text-sm">Supprimer</span>
      <BsTrash2Fill className="" />
    </button>
  );
}
