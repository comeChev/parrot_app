"use client";

import TableBodyItemAction from "@/components/ui/table/Table.body.item.action";
import { Dispatch, SetStateAction, useState } from "react";
import {
  MessagesListActionEdit,
  MessagesListActionMail,
  MessagesListActionPhone,
} from "./Messages.list.action.buttons";
import { Message } from "@prisma/client";

type MessagesListActionProps = {
  message: Message;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  setIsOpenForm: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrent: Dispatch<SetStateAction<Message>>;
  setIsNew: Dispatch<SetStateAction<boolean>>;
  list: React.RefObject<HTMLDivElement>;
};

export default function MessagesListAction({
  message,
  setMessages,
  setIsOpenForm,
  setCurrent,
  setIsNew,
  list,
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
        list={list}
      />
    </TableBodyItemAction>
  );
}
