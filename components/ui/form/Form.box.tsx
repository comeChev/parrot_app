"use client";

import { BsCaretDownFill, BsCaretUpFill } from "react-icons/bs";

import { useState } from "react";

type FormBoxProps = {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
};

export default function FormBox({
  title,
  children,
  defaultOpen = false,
}: FormBoxProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="mt-10 flex-1 flex flex-col w-full md:min-w-[400px] gap-2">
      <div
        className="flex items-center cursor-pointer p-4 border-2 border-slate-300 bg-slate-200 rounded-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h4 className="text-xl font-bold flex-1 ">{title}</h4>
        <BsCaretDownFill
          className={`${isOpen && "rotate-180"} transition-all duration-500`}
        />
      </div>

      <div
        className={` border-2 rounded-b-md transition-all duration-500 overflow-hidden ${
          isOpen
            ? "max-h-[2000px] border-gray-300"
            : "max-h-0 border-transparent"
        }`}
      >
        <div className="py-6 px-4">{children}</div>
      </div>
    </div>
  );
}
