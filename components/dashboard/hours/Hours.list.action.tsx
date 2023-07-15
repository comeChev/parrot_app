"use client";

import TableBodyItemAction from "@/components/ui/table/Table.body.item.action";
import { Dispatch, SetStateAction, useState } from "react";
import {
  HoursListActionDelete,
  HoursListActionEdit,
} from "./Hours.list.action.buttons";
import { Hour } from "@prisma/client";

type HoursListActionProps = {
  hour: Hour;
  setHours: React.Dispatch<React.SetStateAction<Hour[]>>;
  setIsOpenForm: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrent: Dispatch<SetStateAction<Hour>>;
  setIsNew: Dispatch<SetStateAction<boolean>>;
  list: React.RefObject<HTMLDivElement>;
};

export default function HoursListAction({
  hour,
  setHours,
  setIsOpenForm,
  setCurrent,
  setIsNew,
  list,
}: HoursListActionProps) {
  const [isOpenMenuAction, setIsOpenMenuAction] = useState(false);

  return (
    <TableBodyItemAction
      isOpenMenuAction={isOpenMenuAction}
      setIsOpenMenuAction={setIsOpenMenuAction}
    >
      <HoursListActionEdit
        setCurrent={setCurrent}
        setIsOpen={setIsOpenMenuAction}
        hour={hour}
        setOpenForm={setIsOpenForm}
        setIsNew={setIsNew}
        list={list}
      />

      <HoursListActionDelete
        hour={hour}
        setHours={setHours}
        setIsOpen={setIsOpenMenuAction}
      />
    </TableBodyItemAction>
  );
}
