import React from "react";
import { AiOutlineLoading } from "react-icons/ai";

export default function UiLoadingWindow({ text }: { text: string }) {
  return (
    <div className="absolute top-0 right-0 w-full h-full bg-neutral-100 opacity-70">
      <div className="flex  flex-col items-center justify-center w-full h-full">
        <p className="text-4xl mb-10">{text}</p>
        <AiOutlineLoading className="text-4xl animate-spin" />
      </div>
    </div>
  );
}
