import React from "react";
import FormError from "./Form.error";
import { BsCaretDownFill } from "react-icons/bs";

type FormSelectProps = {
  label: string;
  required?: boolean;
  value: string | number;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleFocus: (e: React.FocusEvent<HTMLSelectElement>) => void;
  error?: string;
  name: string;
  options: {
    value: string | number;
    label: string | number;
  }[];

  placeholder?: string;
};

export default function FormSelect({
  label,
  required = true,
  value,
  handleChange,
  handleFocus,
  error,
  name,
  options,
  placeholder,
}: FormSelectProps) {
  return (
    <div className="mb-3 flex-col flex-1">
      <p className="mb-3 px-4 font-semibold">
        {label} {required && <span className="text-red-500">*</span>}
      </p>
      <div className="relative">
        <select
          aria-label={label}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          required={required}
          name={name}
          placeholder={placeholder || label}
          className={`w-full bg-slate-200 py-2 px-4 rounded-md border-2 border-slate-300 mb-1 appearance-none cursor-pointer ${
            error && error.length > 0 && "border-red-500"
          }`}
        >
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <BsCaretDownFill className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500" />
      </div>
      {error && <FormError error={error} />}
    </div>
  );
}
