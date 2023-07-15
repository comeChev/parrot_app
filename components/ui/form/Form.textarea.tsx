"use client";

import FormError from "./Form.error";

type FormTextareaProps = {
  label: string;
  required?: boolean;
  name: string;
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleFocus: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  value: string;
  placeholder?: string;
  error?: string;
  min?: number;
  max?: number;
  disabled?: boolean;
  cssClasses?: string;
  valueRows?: number;
};

export default function FormTextarea({
  label,
  required = true,
  name,
  handleChange,
  handleFocus,
  value,
  placeholder,
  error,
  disabled = false,
  min = 3,
  max = 500,
  valueRows = 5,
  cssClasses = "resize-none",
}: FormTextareaProps) {
  return (
    <div className="mb-[50px] flex-col">
      <p className="mb-3 px-4 font-semibold">
        {label} {required && <span className="text-red-500">*</span>}
      </p>
      <div
        className={`flex-1 flex flex-col bg-slate-200 py-2 px-4 rounded-md border-2 border-slate-300 mb-1 ${
          error && error.length > 0 && "border-red-500"
        }`}
      >
        <textarea
          disabled={disabled}
          name={name}
          onChange={handleChange}
          onFocus={handleFocus}
          value={value}
          aria-label={label}
          rows={valueRows}
          required={required}
          placeholder={placeholder || label}
          className={`bg-slate-200 ${cssClasses} outline-none disabled:select-none disabled:text-slate-500 text-sm md:text-base mb-2`}
        />
        {!disabled && value && (
          <span className="text-xs italic text-neutral-500">{`Caractères restants : ${
            max - value.length
          }`}</span>
        )}
      </div>
      {error && <FormError error={error} />}
    </div>
  );
}
