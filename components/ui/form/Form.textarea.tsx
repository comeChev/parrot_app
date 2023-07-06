import FormError from "./Form.error";

type FormTextareaProps = {
  label: string;
  required?: boolean;
  name: string;
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleFocus: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  value: string;
  placeholder?: string;
  error: string;
  min?: number;
  max?: number;
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
  min = 3,
  max = 500,
}: FormTextareaProps) {
  return (
    <div className="mb-[50px] flex-col">
      <p className="mb-3 px-4 font-semibold">
        {label} {required && <span className="text-red-500">*</span>}
      </p>
      <div
        className={`flex-1 flex flex-col bg-neutral-200 py-2 px-4 rounded-md border-2 border-neutral-300 mb-1 ${
          error.length > 0 && "border-red-500"
        }`}
      >
        <textarea
          name={name}
          onChange={handleChange}
          onFocus={handleFocus}
          value={value}
          aria-label={label}
          rows={5}
          required={required}
          placeholder={placeholder || label}
          className="bg-neutral-200 resize-none outline-none"
        />
        <span className="text-xs">{`Caractères restants : ${
          max - value.length
        }`}</span>
      </div>
      {error && <FormError error={error} />}
    </div>
  );
}
