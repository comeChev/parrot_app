"use client";

import { BodyItemProps, BodyItems } from "@/components/ui/table/Table.body.item";
import TableHeader, { TableHeaderProps } from "@/components/ui/table/Table.header";
import { useEffect, useRef, useState } from "react";

import Table from "@/components/ui/table/Table";
import TableBody from "@/components/ui/table/Table.body";
import UiPagination from "@/components/ui/Ui.pagination";
import { User } from "@prisma/client";
import UserAddOrCreate from "./User.add";
import { UserWithoutPassword } from "@/lib/sql/users";
import UsersListAction from "./Users.list.action";
import UsersListProfile from "./Users.list.profile";
import UsersListStatus from "./Users.list.status";
import { defaultUser } from "./User.form";

const tableHeaders: TableHeaderProps[] = [
  {
    text: "ID",
    className: "w-12 hidden lg:table-cell text-center",
  },
  {
    text: "Utilisateur",
    className: "",
  },
  {
    text: "Mail",
    className: "hidden md:table-cell",
  },
  {
    text: "Status",
    className: "w-24 text-center",
  },
  {
    text: "État",
    className: "w-12 text-center",
  },
  {
    text: "Actions",
    className: "w-6 text-transparent",
  },
];

type UserListProps = {
  usersDB: UserWithoutPassword[];
};

export default function UsersList({ usersDB }: UserListProps) {
  const [users, setUsers] = useState<UserWithoutPassword[]>(usersDB);
  const [curentUser, setCurentUser] = useState<UserWithoutPassword>(defaultUser);
  const [isNew, setIsNew] = useState<boolean>(false);
  const [isOpenForm, setIsOpenForm] = useState(false);
  const listUsers = useRef<HTMLDivElement>(null);
  const [usersToShow, setUsersToShow] = useState<UserWithoutPassword[]>(usersDB);
  const list = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);

  let bodyItems: BodyItems[] = [];

  usersToShow &&
    usersToShow.map((user) => {
      const bodyItem: BodyItemProps[] = [
        { value: user.user_id, className: "hidden lg:table-cell text-center" },
        { value: <UsersListProfile user={user} /> },
        { value: user.user_email, className: "hidden md:table-cell " },
        {
          value: user.user_role,
          className: "text-center",
        },
        {
          value: <UsersListStatus status={user.user_status as any} />,
          className: "text-center",
        },
        {
          value: (
            <UsersListAction
              user={user}
              setUsers={setUsersToShow}
              setCurrent={setCurentUser}
              setIsOpenForm={setIsOpenForm}
              list={list}
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
    setUsersToShow(users.slice(start, end));
  }, [page]);

  return (
    <div>
      <div className="mb-20">
        <Table reference={listUsers}>
          <TableHeader headersList={tableHeaders} />
          <TableBody bodyItems={bodyItems} />
        </Table>
        <UiPagination page={page} setPage={setPage} length={users.length} itemsPerPage={itemsPerPage} />
      </div>
      <div className="mb-20" ref={list}>
        <UserAddOrCreate
          setIsNew={setIsNew}
          isNew={isNew}
          usersDB={users}
          setUsers={setUsers}
          curentUser={curentUser}
          setCurentUser={setCurentUser}
          setIsOpenForm={setIsOpenForm}
          isOpenForm={isOpenForm}
        />
      </div>
    </div>
  );
}
