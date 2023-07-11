import React from "react";
import { AiOutlineLoading } from "react-icons/ai";
import mailSendingPic from "@/assets/contact/message_sending.gif";
import Image, { StaticImageData } from "next/image";

export default function UiLoadingWindow({
  text,
  imgSrc = mailSendingPic,
}: {
  text: string;
  imgSrc?: StaticImageData;
}) {
  return (
    <div className="absolute top-0 right-0 w-full h-full bg-neutral-100 opacity-[85%]">
      <div className="flex  flex-col items-center justify-center w-full h-full">
        <p className="text-4xl mb-10 text-sky-700">{text}</p>
        <AiOutlineLoading className="text-4xl animate-spin text-sky-700" />
        <Image
          src={imgSrc}
          alt="illustration sending mail"
          width={500}
          height={500}
        />
      </div>
    </div>
  );
}
