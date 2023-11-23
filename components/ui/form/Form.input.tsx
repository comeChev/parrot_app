"use client";

import { BsEye, BsEyeSlash } from "react-icons/bs";
import React, { useRef } from "react";

import { AiOutlineInfoCircle } from "react-icons/ai";
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

interface FormInputProps {
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
  isPassword?: boolean;
  labelClasses?: string;
  info?: string | null;
}

const FormInput: React.FC<FormInputProps> = ({
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
  isPassword = false,
  labelClasses = "",
  info = null,
  ...props
}) => {
  const ref = useRef<HTMLInputElement>(null);
  const refInfo = useRef<HTMLParagraphElement>(null);

  function toggleInfos(ref: React.RefObject<HTMLParagraphElement>) {
    ref.current?.classList.toggle("text-transparent");
    ref.current?.classList.toggle("text-blue-700");
  }

  return (
    <div className="mb-8 flex-col flex-1 relative">
      <div className="flex items-center mb-3 pl-4 justify-between">
        <p className={` font-semibold ${labelClasses}`}>
          {label} {required && <span className="text-red-800">*</span>}
        </p>
        {info && (
          <AiOutlineInfoCircle
            className="text-gray-800 text-2xl cursor-pointer"
            onClick={() => toggleInfos(refInfo)}
          />
        )}
      </div>
      <div className="relative">
        <input
          ref={ref}
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
          className={`w-full bg-gray-200 py-2 px-4 rounded-md border-2 border-gray-300 placeholder:text-gray-400 mb-1 ${
            error && error.length > 0 && "border-red-500"
          }  disabled:text-gray-500 disabled:select-none`}
        />

        {isPassword && (
          <button
            type="button"
            className="absolute right-4 top-[0.85rem] text-gray-500"
            onClick={(e) => {
              e.stopPropagation();
              if (!ref?.current) return;
              if (ref?.current.type === "password") {
                ref?.current.setAttribute("type", "text");
                return;
              }
              if (ref?.current.type === "text") {
                ref?.current.setAttribute("type", "password");
                return;
              }
            }}
          >
            {ref?.current?.type === "password" ? <BsEyeSlash /> : <BsEye />}
          </button>
        )}
      </div>
      {info && (
        <p
          ref={refInfo}
          className={`px-4 text-start w-full text-transparent text-sm`}
        >
          {"Votre mail doit contenir un '.' et un '@'"}
        </p>
      )}
      {error && <FormError error={error} />}
    </div>
  );
};

export default FormInput;
