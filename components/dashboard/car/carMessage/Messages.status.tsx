import React from "react";
import {
  BsBoxSeamFill,
  BsEnvelopeCheckFill,
  BsEnvelopeDashFill,
} from "react-icons/bs";

type MessagesStatusProps = {
  status: "PENDING" | "REPLIED" | "ARCHIVED";
};

export default function MessagesStatus({ status }: MessagesStatusProps) {
  const Icon =
    status === "PENDING" ? (
      <BsEnvelopeDashFill className="text-red-500" />
    ) : status === "REPLIED" ? (
      <BsEnvelopeCheckFill className="text-sky-500" />
    ) : (
      <BsBoxSeamFill className="text-amber-500" />
    );

  const text =
    status === "PENDING"
      ? "En attente"
      : status === "REPLIED"
      ? "Répondu"
      : "Archivé";

  const textColor =
    status === "PENDING"
      ? "text-red-500"
      : "REPLIED"
      ? "text-sky-500"
      : "text-amber-500";

  return (
    <div className="flex">
      <div className="text-xl">{Icon}</div>
      <p className={`hidden ld:flex ml-2 text-sm ${textColor}`}>{text}</p>
    </div>
  );
}
