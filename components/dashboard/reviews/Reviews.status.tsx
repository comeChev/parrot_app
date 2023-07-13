import React from "react";
import {
  BsExclamationDiamondFill,
  BsExclamationOctagonFill,
  BsExclamationSquareFill,
} from "react-icons/bs";

type ReviewsStatusProps = {
  status: "PENDING" | "ONLINE" | "OFFLINE";
};

export default function ReviewsStatus({ status }: ReviewsStatusProps) {
  const Icon =
    status === "PENDING" ? (
      <BsExclamationDiamondFill className="text-amber-500" />
    ) : status === "ONLINE" ? (
      <BsExclamationSquareFill className="text-green-500" />
    ) : (
      <BsExclamationOctagonFill className="text-red-500" />
    );

  const text =
    status === "PENDING"
      ? "En attente"
      : status === "ONLINE"
      ? "En ligne"
      : "Hors ligne";

  const textColor =
    status === "PENDING"
      ? "text-amber-500"
      : "ONLINE"
      ? "text-green-500"
      : "text-amber-500";

  return (
    <div className="flex w-full items-center justify-center">
      <div className="text-xl">{Icon}</div>
      <p className={`hidden ld:flex ml-2 text-sm ${textColor}`}>{text}</p>
    </div>
  );
}
