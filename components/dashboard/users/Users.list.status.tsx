import React from "react";

type UsersListStatusProps = {
  status: "ACTIVE" | "INACTIVE" | "ARCHIVED";
};

export default function UsersListStatus({ status }: UsersListStatusProps) {
  function getColorStatus() {
    switch (status) {
      case "ACTIVE":
        return "bg-green-500";
      case "INACTIVE":
        return "bg-red-500";
      case "ARCHIVED":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  }

  return (
    <div className="flex items-center justify-center">
      <div className={`h-5 w-5 rounded-full ${getColorStatus()}`} />
    </div>
  );
}
