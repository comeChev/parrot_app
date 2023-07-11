import { RefObject } from "react";

type CarsTableProps = {
  children: React.ReactNode;
  reference: RefObject<HTMLDivElement>;
};

export default function CarsTable({ children, reference }: CarsTableProps) {
  return (
    <div className="mt-10 select-none" ref={reference}>
      <table className="table-fixed w-full border-collapse">{children}</table>
    </div>
  );
}
