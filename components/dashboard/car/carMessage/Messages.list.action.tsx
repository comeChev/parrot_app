"use client";

import TableBodyItemAction from "@/components/ui/table/Table.body.item.action";
import { Dispatch, SetStateAction, useState } from "react";
import {
  MessagesListActionEdit,
  MessagesListActionMail,
  MessagesListActionPhone,
} from "./Messages.list.action.buttons";
import { Car_message } from "@prisma/client";

type MessagesListActionProps = {
  message: Car_message;
  setMessages: React.Dispatch<React.SetStateAction<Car_message[]>>;
  setIsOpenForm: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrent: Dispatch<SetStateAction<Car_message>>;
  setIsNew: Dispatch<SetStateAction<boolean>>;
};

export default function MessagesListAction({
  message,
  setMessages,
  setIsOpenForm,
  setCurrent,
  setIsNew,
}: MessagesListActionProps) {
  const [isOpenMenuAction, setIsOpenMenuAction] = useState(false);

  return (
    <TableBodyItemAction
      isOpenMenuAction={isOpenMenuAction}
      setIsOpenMenuAction={setIsOpenMenuAction}
    >
      <MessagesListActionPhone
        setMessages={setMessages}
        setOpenForm={setIsOpenForm}
        setIsOpen={setIsOpenMenuAction}
        message={message}
        setCurrent={setCurrent}
      />
      <MessagesListActionMail
        setMessages={setMessages}
        setOpenForm={setIsOpenForm}
        setIsOpen={setIsOpenMenuAction}
        message={message}
        setCurrent={setCurrent}
      />
      <MessagesListActionEdit
        setCurrent={setCurrent}
        setIsOpen={setIsOpenMenuAction}
        message={message}
        setOpenForm={setIsOpenForm}
        setIsNew={setIsNew}
      />
    </TableBodyItemAction>
  );
}
