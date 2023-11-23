export type TableHeaderProps = {
  text: string;
  className?: string;
};

export default function TableHeader({
  headersList,
}: {
  headersList: TableHeaderProps[];
}) {
  return (
    <thead className="bg-gray-200">
      <tr className="text-left text-neutral-700">
        {headersList.map((header, index) => (
          <th
            key={index}
            className={`py-2 px-1 border border-slate-300 ${
              header.className ? header.className : ""
            }`}
          >
            {header.text}
          </th>
        ))}
      </tr>
    </thead>
  );
}
