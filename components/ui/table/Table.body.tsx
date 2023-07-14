import TableBodyItem, { BodyItems } from "./Table.body.item";

type TableBodyProps = {
  bodyItems: BodyItems[];
};

export default function TableBody({ bodyItems }: TableBodyProps) {
  return (
    <tbody className="text-neutral-500">
      {bodyItems.map((item, index) => (
        <TableBodyItem key={index} bodyItems={item} />
      ))}
    </tbody>
  );
}
