"use client";
import { useState } from "react";
import { BsExclamationDiamondFill } from "react-icons/bs";

export default function FormDelete({
  handleDelete,
  textConfirm,
}: {
  handleDelete: () => void;
  textConfirm: string;
}) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  return confirmDelete ? (
    <button
      className="flex items-center bg-red-200 px-2 py-1 rounded-md border border-red-800 mx-3"
      onClick={handleDelete}
    >
      <BsExclamationDiamondFill className="text-red-800 text-md mr-1 " />
      <p className="text-red-800 text-sm">{textConfirm}</p>
    </button>
  ) : (
    <button
      type="button"
      className="bg-red-800 border border-red-900 hover:bg-red-900 text-neutral-100 text-sm px-2 py-1 rounded-md mx-3 disabled::hover-indigo-500 disabled:bg-opacity-50"
      onClick={() => {
        setConfirmDelete(true);
        setTimeout(() => {
          setConfirmDelete(false);
        }, 2000);
      }}
    >
      Supprimer
    </button>
  );
}
