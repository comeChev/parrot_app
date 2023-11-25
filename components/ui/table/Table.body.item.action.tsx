"use client";

import { BsThreeDotsVertical, BsXLg } from "react-icons/bs";

import { useRef } from "react";

type TableActionsProps = {
  children: React.ReactNode;
  isOpenMenuAction: boolean;
  setIsOpenMenuAction: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function TableBodyItemAction({ children, isOpenMenuAction, setIsOpenMenuAction }: TableActionsProps) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div className="relative text-center">
      <button
        onClick={() => {
          setIsOpenMenuAction(!isOpenMenuAction);
          ref.current?.focus();
        }}
        aria-label="Ouvrir le menu action"
      >
        {isOpenMenuAction ? <BsXLg className="text-xl" /> : <BsThreeDotsVertical className="text-xl" />}
      </button>

      <div
        className={`absolute z-50 flex flex-col ${
          isOpenMenuAction ? "max-h-[500px] opacity-100" : "max-h-0 overflow-hidden border-transparent opacity-0"
        } transition-all duration-700 border rounded-md right-3/4 top-2 bg-neutral-100 border-neutral-400`}
      >
        <div className="w-full py-2" ref={ref} onBlur={() => setIsOpenMenuAction(false)}>
          {children}
        </div>
      </div>
    </div>
  );
}
