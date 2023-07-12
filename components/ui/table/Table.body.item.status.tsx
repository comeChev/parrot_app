import React from "react";

type TableBodyItemStatusProps = {
  status: "ONLINE" | "OFFLINE";
};

export default function TableBodyItemStatus({
  status,
}: TableBodyItemStatusProps) {
  function getColorStatus() {
    switch (status) {
      case "ONLINE":
        return "bg-green-500";
      case "OFFLINE":
        return "bg-amber-500";
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
