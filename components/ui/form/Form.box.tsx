"use client";

import { useState } from "react";
import { BsCaretDownFill, BsCaretUpFill } from "react-icons/bs";

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
    <div className="mt-10 flex-1 mr-10 w-full md:min-w-[400px]">
      <div
        className="flex items-center cursor-pointer p-4 border-2 border-slate-300 bg-slate-200 rounded-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h4 className="text-xl font-bold flex-1 ">{title}</h4>
        {isOpen ? <BsCaretUpFill /> : <BsCaretDownFill />}
      </div>

      <div
        className={`py-6 px-4 border-x-2 border-b-2 border-slate-300 rounded-b-md ${
          isOpen ? "block" : "hidden"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
