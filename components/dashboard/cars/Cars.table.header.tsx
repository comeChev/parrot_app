export default function CarsTableHeader({}) {
  return (
    <thead className="bg-neutral-300 ">
      <tr className="text-left text-neutral-700 ">
        <th className="py-2 px-1 w-12 text-center border border-gray-400"></th>
        <th className="py-2 px-1 w-28 text-center border border-gray-400 hidden lg:table-cell">
          Création
        </th>
        <th className="py-2 px-1 w-28 text-center border border-gray-400 hidden md:table-cell">
          Image
        </th>
        <th className="py-2 px-1 text-center border border-gray-400">
          Intitulé
        </th>
        <th className="py-2 px-1 text-center border border-gray-400 w-24 hidden md:table-cell">
          Prix
        </th>
        <th className="py-2 px-1 text-center border border-gray-400 w-24">
          Inbox
        </th>
        <th className="py-2 px-1 text-center border border-gray-400 w-10"></th>
      </tr>
    </thead>
  );
}
