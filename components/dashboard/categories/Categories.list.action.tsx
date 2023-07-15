"use client";

import TableBodyItemAction from "@/components/ui/table/Table.body.item.action";
import { Dispatch, SetStateAction, useState } from "react";
import {
  CategoriesListActionDelete,
  CategoriesListActionEdit,
} from "./Categories.list.action.buttons";
import { Category } from "@prisma/client";

type CategoriesListActionProps = {
  category: Category;
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  setIsOpenForm: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrent: Dispatch<SetStateAction<Category>>;
  setIsNew: Dispatch<SetStateAction<boolean>>;
  list: React.RefObject<HTMLDivElement>;
};

export default function CategoriesListAction({
  category,
  setCategories,
  setIsOpenForm,
  setCurrent,
  setIsNew,
  list,
}: CategoriesListActionProps) {
  const [isOpenMenuAction, setIsOpenMenuAction] = useState(false);

  return (
    <TableBodyItemAction
      isOpenMenuAction={isOpenMenuAction}
      setIsOpenMenuAction={setIsOpenMenuAction}
    >
      <CategoriesListActionEdit
        setCurrent={setCurrent}
        setIsOpen={setIsOpenMenuAction}
        category={category}
        setOpenForm={setIsOpenForm}
        setIsNew={setIsNew}
        list={list}
      />

      <CategoriesListActionDelete
        category={category}
        setCategories={setCategories}
        setIsOpen={setIsOpenMenuAction}
      />
    </TableBodyItemAction>
  );
}
