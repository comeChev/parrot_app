import CarFormStrengthsTableItems from "./Car.form.strengths.table.items";
import { Strength } from "@prisma/client";

type CarFormStrengthsTableProps = {
  strengths: Strength[];
  text: string;
  handleClick: (type: "add" | "remove", s: Strength) => void;
  type: "add" | "remove";
};

export default function CarFormStrengthsTable({ strengths, text, handleClick, type }: CarFormStrengthsTableProps) {
  return (
    <div className="px-4 flex-1">
      <h5 className="px-2 font-semibold text-md">{text}</h5>
      <div className="min-h-[6.25rem] flex-1 bg-slate-200 m-1 border border-slate-400 rounded-md p-2">
        {strengths.map((s) => (
          <CarFormStrengthsTableItems type={type} key={s.strength_id} s={s} handleClick={handleClick} />
        ))}
      </div>
    </div>
  );
}
