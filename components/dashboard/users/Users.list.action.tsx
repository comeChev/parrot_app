"use client";

import React, { useState } from "react";
import {
  UserListActionEdit,
  UserListActionStatus,
} from "./Users.list.action.buttons";

import TableBodyItemAction from "@/components/ui/table/Table.body.item.action";
import { User } from "@prisma/client";
import { UserWithoutPassword } from "@/lib/sql/users";

type UsersListActionProps = {
  user: UserWithoutPassword;
  setUsers: React.Dispatch<React.SetStateAction<UserWithoutPassword[]>>;
  setIsOpenForm: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrent: React.Dispatch<React.SetStateAction<UserWithoutPassword>>;
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
