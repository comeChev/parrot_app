"use client";

import { BsThreeDotsVertical, BsXLg } from "react-icons/bs";

type TableActionsProps = {
  children: React.ReactNode;
  isOpenMenuAction: boolean;
  setIsOpenMenuAction: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function TableBodyItemAction({
  children,
  isOpenMenuAction,
  setIsOpenMenuAction,
}: TableActionsProps) {
  return (
    <div className="relative text-center">
      <button onClick={() => setIsOpenMenuAction(!isOpenMenuAction)}>
        {isOpenMenuAction ? (
          <BsXLg className="text-xl" />
        ) : (
          <BsThreeDotsVertical className="text-xl" />
        )}
      </button>

      {isOpenMenuAction && (
        <div className="absolute right-3/4 top-2 flex flex-col bg-neutral-100 py-2 h-auto z-50 border border-neutral-400 rounded-md">
          {children}
        </div>
      )}
    </div>
  );
}
