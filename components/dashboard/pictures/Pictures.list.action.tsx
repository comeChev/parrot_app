"use client";

import TableBodyItemAction from "@/components/ui/table/Table.body.item.action";
import { Dispatch, SetStateAction, useState } from "react";
import { Picture } from "@prisma/client";
import {
  PicturesListActionDelete,
  PicturesListActionEdit,
  PicturesListActionStatus,
} from "./Pictures.list.action.buttons";

type PicturesListActionProps = {
  picture: Picture;
  setPictures: React.Dispatch<React.SetStateAction<Picture[]>>;
  setIsOpenForm: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrent: Dispatch<SetStateAction<Picture>>;
  setIsNew: Dispatch<SetStateAction<boolean>>;
};

export default function PicturesListAction({
  picture,
  setPictures,
  setIsOpenForm,
  setCurrent,
  setIsNew,
}: PicturesListActionProps) {
  const [isOpenMenuAction, setIsOpenMenuAction] = useState(false);

  return (
    <TableBodyItemAction
      isOpenMenuAction={isOpenMenuAction}
      setIsOpenMenuAction={setIsOpenMenuAction}
    >
      <PicturesListActionEdit
        setCurrent={setCurrent}
        setIsOpen={setIsOpenMenuAction}
        picture={picture}
        setOpenForm={setIsOpenForm}
        setIsNew={setIsNew}
      />
      <PicturesListActionStatus
        picture={picture}
        setPictures={setPictures}
        setIsOpen={setIsOpenMenuAction}
      />
      <PicturesListActionDelete
        picture={picture}
        setPictures={setPictures}
        setIsOpen={setIsOpenMenuAction}
      />
    </TableBodyItemAction>
  );
}
