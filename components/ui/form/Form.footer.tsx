"use client";

import { BsExclamationDiamond } from "react-icons/bs";
import Link from "next/link";

type FormFooterProps = {
  isNew: boolean;
  loading: boolean;
  hrefBack?: string;
  hrefBackText?: string;
  handleSubmit: () => void;
  disabled?: boolean;
  disabledText?: string;
  onLoadText?: string;
  validText?: string;
};

export default function FormFooter({
  isNew,
  loading,
  hrefBack,
  hrefBackText,
  handleSubmit,
  disabled = false,
  disabledText = "Enregistrement en cours",
  onLoadText = "Enregistrement en cours",
  validText = "Enregistrer",
}: FormFooterProps) {
  return (
    <div className="lg:sticky lg:bottom-0 mt-16 py-4 right-0  w-full z-50">
      <div className="h-full w-full bg-slate-300 border border-gray-600 bg-opacity-90 rounded-md flex items-center justify-between py-4 lg:px-8">
        {/* name & type action */}

        <p className="hidden lg:flex items-center gap-2 py-2 px-3 rounded-md bg-red-200 text-red-800 border border-red-800">
          <BsExclamationDiamond />
          {`${!isNew ? "Modification" : "Création"} en cours`}
        </p>

        <div className="justify-between flex w-full lg:w-auto px-4">
          {/* back button */}
          {hrefBack && hrefBackText && !loading && (
            <Link
              href={hrefBack}
              className="text-gray-600 text-sm md:text-base rounded-md flex items-center hover:underline underline-offset-2"
            >
              {hrefBackText}
            </Link>
          )}

          {/* submit button */}
          <button
            className="shadow-md bg-sky-800 border border-sky-900 text-gray-100 text-base md:text-xl px-3 md:px-4 py-1 md:py-3 rounded-md mx-3 disabled:bg-opacity-50 hover:scale-[1.01] transition-all duration-300"
            disabled={disabled}
            onClick={handleSubmit}
          >
            {disabled ? `${disabledText}` : loading ? onLoadText : validText}
          </button>
        </div>
      </div>
    </div>
  );
}
