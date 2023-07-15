"use client";

import TableBodyItemAction from "@/components/ui/table/Table.body.item.action";
import React, { useState } from "react";
import {
  UserListActionEdit,
  UserListActionStatus,
} from "./Users.list.action.buttons";
import { User } from "@prisma/client";

type UsersListActionProps = {
  user: User;
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  setIsOpenForm: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrent: React.Dispatch<React.SetStateAction<User>>;
  list: React.RefObject<HTMLDivElement>;
};

export default function UsersListAction({
  user,
  setUsers,
  setIsOpenForm,
  setCurrent,
  list,
}: UsersListActionProps) {
  const [isOpenMenuAction, setIsOpenMenuAction] = useState(false);

  return (
    <TableBodyItemAction
      isOpenMenuAction={isOpenMenuAction}
      setIsOpenMenuAction={setIsOpenMenuAction}
    >
      <UserListActionEdit
        setCurrent={setCurrent}
        setIsOpen={setIsOpenMenuAction}
        user={user}
        setOpenForm={setIsOpenForm}
        list={list}
      />
      <UserListActionStatus
        user={user}
        setUsers={setUsers}
        setIsOpen={setIsOpenMenuAction}
      />
    </TableBodyItemAction>
  );
}
