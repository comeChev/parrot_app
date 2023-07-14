"use client";

import Table from "@/components/ui/table/Table";
import TableBody from "@/components/ui/table/Table.body";
import {
  BodyItemProps,
  BodyItems,
} from "@/components/ui/table/Table.body.item";
import TableHeader, {
  TableHeaderProps,
} from "@/components/ui/table/Table.header";
import { useEffect, useRef, useState } from "react";
import UiPagination from "@/components/ui/Ui.pagination";
import { Strength } from "@prisma/client";
import StrengthsAddOrCreate from "./Strengths.add";
import { defaultStrength } from "./Strengths.form";
import StrengthsListAction from "./Strengths.list.action";

const tableHeaders: TableHeaderProps[] = [
  {
    text: "ID",
    className: "w-12 hidden lg:table-cell text-center",
  },
  {
    text: "Titre",
    className: "w-[170px] md:w-[270px]",
  },
  {
    text: "",
    className: "w-12",
  },
];

type StrengthsListProps = {
  strengthsDB: Strength[];
};

export default function StrengthsList({ strengthsDB }: StrengthsListProps) {
  const [strengths, setStrengths] = useState<Strength[]>(strengthsDB);
  const [strengthsToShow, setStrengthsToShow] =
    useState<Strength[]>(strengthsDB);
  const [isNew, setIsNew] = useState<boolean>(false);
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [currentStrength, setCurrentStrength] =
    useState<Strength>(defaultStrength);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const listStrengths = useRef<HTMLDivElement>(null);

  let bodyItems: BodyItems[] = [];

  strengthsToShow &&
    strengthsToShow.map((c) => {
      const bodyItem: BodyItemProps[] = [
        // id
        { value: c.strength_id, className: "hidden lg:table-cell text-center" },
        // name
        {
          value: c.strength_name,
          className: "truncate",
        },
        // action
        {
          value: (
            <StrengthsListAction
              strength={c}
              setStrengths={setStrengths}
              setCurrent={setCurrentStrength}
              setIsOpenForm={setIsOpenForm}
              setIsNew={setIsNew}
            />
          ),
          className: "text-center",
        },
      ];
      bodyItems.push(bodyItem);
    });

  useEffect(() => {
    const start = (page - 1) * itemsPerPage;
    const end = page * itemsPerPage;
    setStrengthsToShow(strengths.slice(start, end));
  }, [page, strengths]);

  return (
    <div>
      <div className="mb-20">
        <Table reference={listStrengths}>
          <TableHeader headersList={tableHeaders} />
          <TableBody bodyItems={bodyItems} />
        </Table>
        <UiPagination
          page={page}
          setPage={setPage}
          length={strengths.length}
          itemsPerPage={itemsPerPage}
        />
      </div>
      <div className="mb-20">
        <StrengthsAddOrCreate
          setIsNew={setIsNew}
          isNew={isNew}
          currentStrength={currentStrength}
          setCurrentStrength={setCurrentStrength}
          setIsOpenForm={setIsOpenForm}
          isOpenForm={isOpenForm}
          setStrengths={setStrengths}
        />
      </div>
    </div>
  );
}
