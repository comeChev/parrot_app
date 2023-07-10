"use client";

import { useRef } from "react";
import { MdArrowDropDown } from "react-icons/md";

type CarsFilterFormSelectProps = {
  label: string;
  subLabel: string;
  options: {
    label: string;
    value: string;
  }[];
  name: string;
  defaultOptionLabel: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string;
};

export default function CarsFilterFormSelect({
  label,
  subLabel,
  options,
  name,
  defaultOptionLabel,
  onChange,
  value,
}: CarsFilterFormSelectProps) {
  const inputRef = useRef<HTMLSelectElement>(null);

  return (
    <div className="w-full flex flex-col px-4 mb-5">
      <div className="flex flex-col text-neutral-100 mb-3">
        <label htmlFor={name} className="text-base font-semibold">
          {label}
        </label>
        <span className="text-sm font-light">{subLabel}</span>
      </div>
      <div
        className="text-neutral-700 relative w-full cursor-pointer"
        onClick={() => inputRef.current?.focus()}
      >
        <select
          name={name}
          id={name}
          onChange={onChange}
          value={value}
          ref={inputRef}
          className="py-[6px] px-4 rounded-md w-full cursor-pointer"
        >
          <option value="" className="text-neutral-300">
            {defaultOptionLabel}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {/* <MdArrowDropDown className="text-3xl absolute right-1 top-[6px]" /> */}
      </div>
    </div>
  );
}
