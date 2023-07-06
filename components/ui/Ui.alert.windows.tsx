"use client";

import React, { useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";

export function UiAlertSuccess({
  handleClose,
  message,
}: {
  handleClose: () => void;
  message: string;
}) {
  useEffect(() => {
    setTimeout(() => {
      handleClose();
    }, 3000);
  }, []);

  return (
    <div className="flex items-center justify-between w-4/5 fixed top-2  bg-green-200 py-4 px-4">
      <p className="text-xl text-green-800">{message}</p>
      <button>
        <AiOutlineClose
          className="text-2xl text-green-800"
          onClick={handleClose}
        />
      </button>
    </div>
  );
}

export function UiAlertError({
  handleClose,
  message,
}: {
  handleClose: () => void;
  message: string;
}) {
  useEffect(() => {
    setTimeout(() => {
      handleClose();
    }, 3000);
  }, []);
  return (
    <div className="flex items-center justify-between w-4/5 fixed top-2  bg-red-200 py-4 px-4">
      <p className="text-xl text-red-800">{message}</p>
      <button>
        <AiOutlineClose
          className="text-2xl text-red-800"
          onClick={handleClose}
        />
      </button>
    </div>
  );
}
