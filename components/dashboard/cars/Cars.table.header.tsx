export default function CarsTableHeader({}) {
  return (
    <thead className="mb-3 bg-slate-200">
      <tr className="text-left text-neutral-700">
        <th className="w-12 px-1 py-2 text-center border border-slate-300"></th>
        <th className="hidden px-1 py-2 text-center border w-28 border-slate-300 lg:table-cell">Création</th>
        <th className="hidden px-1 py-2 text-center border w-28 border-slate-300 md:table-cell">Image</th>
        <th className="px-1 py-2 text-center border border-slate-300">Intitulé</th>
        <th className="hidden w-24 px-1 py-2 text-center border border-slate-300 md:table-cell">Prix</th>
        <th className="w-24 px-1 py-2 text-center border border-slate-300">Inbox</th>
        <th className="w-10 px-1 py-2 text-center text-transparent border border-slate-300">Actions</th>
      </tr>
    </thead>
  );
}
