"use client";

import TableBodyItemAction from "@/components/ui/table/Table.body.item.action";
import { Dispatch, SetStateAction, useState } from "react";
import {
  StrengthsListActionDelete,
  StrengthsListActionEdit,
} from "./Strengths.list.action.buttons";
import { Strength } from "@prisma/client";

type StrengthsListActionProps = {
  strength: Strength;
  setStrengths: React.Dispatch<React.SetStateAction<Strength[]>>;
  setIsOpenForm: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrent: Dispatch<SetStateAction<Strength>>;
  setIsNew: Dispatch<SetStateAction<boolean>>;
};

export default function StrengthsListAction({
  strength,
  setStrengths,
  setIsOpenForm,
  setCurrent,
  setIsNew,
}: StrengthsListActionProps) {
  const [isOpenMenuAction, setIsOpenMenuAction] = useState(false);

  return (
    <TableBodyItemAction
      isOpenMenuAction={isOpenMenuAction}
      setIsOpenMenuAction={setIsOpenMenuAction}
    >
      <StrengthsListActionEdit
        setCurrent={setCurrent}
        setIsOpen={setIsOpenMenuAction}
        strength={strength}
        setOpenForm={setIsOpenForm}
        setIsNew={setIsNew}
      />

      <StrengthsListActionDelete
        strength={strength}
        setStrengths={setStrengths}
        setIsOpen={setIsOpenMenuAction}
      />
    </TableBodyItemAction>
  );
}
