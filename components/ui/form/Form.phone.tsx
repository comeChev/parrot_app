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
  name?: string;
  disabled?: boolean;
};

export default function FormPhone({
  label,
  required = true,
  error,
  value,
  handleChange,
  handleFocus,
  placeholder,
  name,
  disabled,
}: FormInputProps) {
  return (
    <div className="mb-[50px] flex-col flex-1 relative pb-1">
      <p className="mb-3 px-4 font-semibold">
        {label} {required && <span className="text-red-800">*</span>}
      </p>
      <input
        disabled={disabled ?? false}
        aria-label={label}
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        type="tel"
        autoComplete="tel_local"
        required={required}
        name={name ?? "phone"}
        placeholder="06 12 34 56 78"
        className={`w-full bg-gray-200 py-2 px-4 rounded-md border-2 border-gray-300 mb-1 ${
          error.length > 0 && "border-red-500"
        }`}
      />
      {error && <FormError error={error} />}
    </div>
  );
}
