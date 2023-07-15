import React from "react";
import FormError from "./Form.error";

type Autocomplete =
  | "given-name"
  | "family-name"
  | "nickname"
  | "username"
  | "email"
  | "new-password"
  | "current-password"
  | "tel"
  | "tel-country-code"
  | "tel-national"
  | "street-address"
  | "address-line1"
  | "address-line2"
  | "address-line3"
  | "address-level1"
  | "address-level2"
  | "address-level3"
  | "address-level4"
  | "postal-code"
  | "country"
  | "country-name"
  | "bday"
  | "bday-day"
  | "bday-month"
  | "bday-year"
  | "sex";

type FormInputProps = {
  label: string;
  name: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFocus: (e: React.FocusEvent<HTMLInputElement>) => void;
  value: string | number;
  placeholder?: string;
  error?: string;
  required?: boolean;
  type?: string;
  min?: number;
  max?: number;
  autocomplete?: Autocomplete;
  disabled?: boolean;
};

export default function FormInput({
  label,
  required = true,
  type = "text",
  error,
  value,
  handleChange,
  handleFocus,
  autocomplete,
  name,
  placeholder,
  disabled = false,
}: FormInputProps) {
  return (
    <div className="mb-3 flex-col flex-1">
      <p className="mb-3 px-4 font-semibold">
        {label} {required && <span className="text-red-800">*</span>}
      </p>
      <input
        disabled={disabled}
        aria-label={label}
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        type={type}
        autoComplete={autocomplete || "off"}
        required={required}
        name={name}
        placeholder={placeholder || label}
        className={`w-full bg-slate-200 py-2 px-4 rounded-md border-2 border-slate-300 mb-1 ${
          error && error.length > 0 && "border-red-500"
        }  disabled:text-slate-500 disabled:select-none`}
      />
      {error && <FormError error={error} />}
    </div>
  );
}
