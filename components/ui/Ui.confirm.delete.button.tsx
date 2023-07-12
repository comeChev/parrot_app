"use client";

import { useState } from "react";
import {
  BsExclamation,
  BsExclamationDiamondFill,
  BsTrash2,
} from "react-icons/bs";

type UiConfirmDeleteButtonProps = {
  textConfirm?: string;
  cssConfirmButton?: string;
  cssDiv?: string;
  textClick?: string;
  cssClickButton?: string;
  timeout?: number;
  handleDelete: () => void;
};

export default function UiConfirmDeleteButton({
  textConfirm = "Confirmer",
  textClick = "Supprimer",
  cssConfirmButton,
  cssDiv,
  cssClickButton,
  timeout = 2000,
  handleDelete,
}: UiConfirmDeleteButtonProps) {
  const [askConfirm, setAskConfirm] = useState(false);

  function handleClick() {
    setAskConfirm(true);

    setTimeout(() => {
      setAskConfirm(false);
    }, timeout);
  }

  return (
    <div className={`${cssDiv}`}>
      {askConfirm ? (
        <button
          onClick={handleDelete}
          className={`bg-red-200 text-red-700 hover:text-red-800 py-1 px-3 text-sm rounded-md ${cssConfirmButton}`}
        >
          <div className="flex items-center">
            <BsExclamationDiamondFill className="text-md mr-2" />
            <span>{textConfirm}</span>
          </div>
        </button>
      ) : (
        <button
          onClick={handleClick}
          className={`bg-neutral-200 border border-neutral-400 text-red-700 hover:text-red-800 py-1 px-3 text-sm rounded-md ${cssClickButton}`}
        >
          <div className="flex items-center">
            <BsTrash2 className="text-md mr-2" />
            <span>{textClick}</span>
          </div>
        </button>
      )}
    </div>
  );
}
