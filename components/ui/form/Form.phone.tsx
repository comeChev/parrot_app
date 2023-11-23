import FormError from "./Form.error";
import React from "react";

type FormInputProps = {
  label: string;

  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFocus: (e: React.FocusEvent<HTMLInputElement>) => void;
  value: string;
  placeholder?: string;
  error: string;
  required?: boolean;
};

export default function FormPhone({
  label,
  required = true,
  error,
  value,
  handleChange,
  handleFocus,
  placeholder,
}: FormInputProps) {
  return (
    <div className="mb-[50px] flex-col flex-1 relative">
      <p className="mb-3 px-4 font-semibold">
        {label} {required && <span className="text-red-800">*</span>}
      </p>
      <input
        aria-label={label}
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        type="tel"
        autoComplete="tel_local"
        required={required}
        name="phone"
        placeholder="06 12 34 56 78"
        className={`w-full bg-slate-200 py-2 px-4 rounded-md border-2 border-slate-300 mb-1 ${
          error.length > 0 && "border-red-500"
        }`}
      />
      {error && <FormError error={error} />}
    </div>
  );
}
