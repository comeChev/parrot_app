"use client";

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
      <div className="h-full w-full bg-slate-300 border border-neutral-600 bg-opacity-90 rounded-md flex items-center justify-between py-4 lg:px-8">
        {/* name & type action */}
        <div className="flex-col hidden lg:flex">
          <p>{`${!isNew ? "Modification" : "Création"} en cours`}</p>
        </div>
        <div className="justify-between flex w-full lg:w-auto px-4">
          {/* back button */}
          {hrefBack && hrefBackText && !loading && (
            <Link
              href={hrefBack}
              className="text-neutral-800 text-lg rounded-md mx-3 flex items-center hover:underline underline-offset-2"
            >
              {hrefBackText}
            </Link>
          )}

          {/* submit button */}
          <button
            className="bg-sky-800 border border-sky-900 hover:bg-sky-900 text-neutral-100 text-xl px-8 py-3 rounded-md mx-3 disabled:bg-opacity-50"
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
