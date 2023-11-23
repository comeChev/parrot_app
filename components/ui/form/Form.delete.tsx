"use client";

import { BsExclamationDiamondFill } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import { useState } from "react";

export default function FormDelete({
  handleDelete,
  textConfirm,
}: {
  handleDelete: () => void;
  textConfirm: string;
}) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleConfirm = () => {
    setConfirmDelete(true);
    setTimeout(() => {
      setConfirmDelete(false);
    }, 2000);
  };

  return (
    <button
      type="button"
      className={`flex items-center border  text-neutral-100 text-sm px-3 py-2 rounded-md mx-3 disabled::hover-indigo-500 disabled:bg-opacity-50 transition-all duration-300 ${
        confirmDelete
          ? "bg-red-200 border-red-800"
          : "bg-red-800 border-red-900"
      }`}
      onClick={confirmDelete ? handleDelete : handleConfirm}
    >
      {confirmDelete ? (
        <BsExclamationDiamondFill className="text-red-800 text-md mr-1 " />
      ) : (
        <FaTrash className="text-neutral-100 text-md mr-1" />
      )}
      {confirmDelete ? (
        <span className="text-red-800 text-sm">{textConfirm}</span>
      ) : (
        "Supprimer"
      )}
    </button>
  );

  confirmDelete ? (
    <button
      className="flex items-center bg-red-200 px-2 py-1 rounded-md border border-red-800 mx-3"
      onClick={handleDelete}
    ></button>
  ) : (
    <button
      type="button"
      className="flex items-center bg-red-800 border border-red-900 hover:bg-red-900 text-neutral-100 text-sm px-3 py-2 rounded-md mx-3 disabled::hover-indigo-500 disabled:bg-opacity-50"
      onClick={() => {}}
    >
      <FaTrash className="text-neutral-100 text-md mr-1" />
      Supprimer
    </button>
  );
}
