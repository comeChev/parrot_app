import { TStatusPin } from "../dashboard/ui/explanations";

type statusPinProps = {
  status: TStatusPin;
};

export const StatusPin = ({ status }: statusPinProps) => {
  return (
    <div
      className={`h-3 w-3 rounded-full mr-2 ${
        status === "ONLINE"
          ? "bg-green-500"
          : status === "OFFLINE"
          ? "bg-red-500"
          : status === "ARCHIVED"
          ? "bg-amber-500"
          : "READ" && "bg-sky-500"
      }`}
    />
  );
};

export const DescriptionPin = ({ label }: { label: string }) => {
  return <p className="text-sm text-gray-600">{label}</p>;
};
