import { Strength } from "@prisma/client";

type CarFormStrengthsTableItemsProps = {
  s: Strength;
  handleClick: (type: "add" | "remove", s: Strength) => void;
  type: "add" | "remove";
};

export default function CarFormStrengthsTableItems({
  s,
  handleClick,
  type,
}: CarFormStrengthsTableItemsProps) {
  return (
    <button
      onClick={() => handleClick(type, s)}
      className={`px-2 py-1 text-neutral-100 rounded-md m-1 ${
        type === "add" ? "bg-indigo-700" : "bg-neutral-700"
      }`}
    >
      <p>{s.strength_name}</p>
    </button>
  );
}
