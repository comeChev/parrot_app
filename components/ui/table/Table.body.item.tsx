export type BodyItemProps = {
  value: string | number | JSX.Element | React.ReactNode;
  className?: string;
};

export type BodyItems = BodyItemProps[];

type TableBodyItemProps = {
  bodyItems: BodyItemProps[];
};

export default function TableBodyItem({ bodyItems }: TableBodyItemProps) {
  return (
    <tr className="ring-[1px] ring-transparent hover:ring-red-800 my-1 hover:bg-gray-200  hover:bg-opacity-70 transition-all duration-300">
      {bodyItems.map((bodyItem, index: number) => (
        <td key={index} className={`py-2 px-1 ${bodyItem.className ? bodyItem.className : ""}`}>
          {bodyItem.value}
        </td>
      ))}
    </tr>
  );
}
