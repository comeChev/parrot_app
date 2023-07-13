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
import { Message } from "@prisma/client";
import { useRef, useState } from "react";
import UiButtonAction from "@/components/ui/Ui.button.action";
import { getFullName, getFullStringDate } from "@/utils/globals";
import MessagesStatus from "./Messages.status";
import MessagesListAction from "./Messages.list.action";
import { defaultMessage } from "./Messages.form";
import MessagesForm from "./Messages.form";

export default function MessagesTable({
  messagesDB,
}: {
  messagesDB: Message[];
}) {
  const [messages, setMessages] = useState(messagesDB);
  const [isNew, setIsNew] = useState<boolean>(true);
  const [currentMessage, setCurrentMessage] = useState<Message>(defaultMessage);
  const [isOpenForm, setIsOpenForm] = useState(false);
  const headersList: TableHeaderProps[] = [
    {
      text: "ID",
      className: "hidden w-12 text-center",
    },
    {
      text: "Utilisateur",
      className: "w-24 sm:w-auto ",
    },
    {
      text: "Mail",
      className: "",
    },
    {
      text: "Contenu",
      className: "",
    },
    {
      text: "Date d'envoi",
      className: "",
    },
    {
      text: "Status",
      className: "",
    },
    {
      text: "",
      className: "w-12 ",
    },
  ];

  const bodyItems: BodyItems[] = messages.map((m) => {
    const bodyItem: BodyItemProps[] = [
      // id
      { value: m.message_id, className: "hidden text-center" },
      // user
      {
        value: getFullName(
          decodeURI(m.message_contact_first_name),
          decodeURI(m.message_contact_last_name)
        ),
        className: "",
      },
      // mail
      {
        value: m.message_contact_email,
        className: "text-sm md:text-md lg:text-lg truncate",
      },
      // content
      { value: decodeURI(m.message_content), className: "truncate" },
      // published at
      {
        value: getFullStringDate(m.message_published_date),
        className: "",
      },
      // status
      //message_status: "PENDING" | "REPLIED" | "ARCHIVED";
      {
        value: (
          <MessagesStatus
            status={m.message_status as "PENDING" | "REPLIED" | "ARCHIVED"}
          />
        ),
        className: "",
      },
      //actions
      {
        value: (
          <MessagesListAction
            message={m}
            setMessages={setMessages}
            setIsOpenForm={setIsOpenForm}
            setIsNew={setIsNew}
            setCurrent={setCurrentMessage}
          />
        ),
      },
    ];
    return bodyItem;
  });

  const tableRef = useRef(null);

  function handleOpenForm() {
    setCurrentMessage(defaultMessage);
    setIsNew(true);
    setIsOpenForm(true);
  }
  function handleCloseForm() {
    setCurrentMessage(defaultMessage);
    setIsOpenForm(false);
    setIsNew(false);
  }

  return (
    <div>
      <div className="flex mb-20">
        <Table reference={tableRef}>
          <TableHeader headersList={headersList} />
          <TableBody bodyItems={bodyItems} />
        </Table>
      </div>

      <div className="mb-16">
        <div className="flex flex-col-reverse md:items-center justify-between md:flex-row">
          {isOpenForm && (
            <UiButtonAction
              text="Fermer le formulaire"
              onClick={handleCloseForm}
              type="button"
              href=""
            />
          )}
        </div>
      </div>
      {isOpenForm && (
        <MessagesForm
          messages={messages}
          setMessages={setMessages}
          isNew={isNew}
          currentMessage={currentMessage}
          setIsOpenForm={setIsOpenForm}
        />
      )}
    </div>
  );
}
