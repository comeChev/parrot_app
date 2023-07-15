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
import { useEffect, useRef, useState } from "react";
import UiButtonAction from "@/components/ui/Ui.button.action";
import { getFullName, getFullStringDate } from "@/utils/globals";
import MessagesStatus from "./Messages.status";
import MessagesListAction from "./Messages.list.action";
import { defaultMessage } from "./Messages.form";
import MessagesForm from "./Messages.form";
import UiPagination from "@/components/ui/Ui.pagination";

export default function MessagesTable({
  messagesDB,
}: {
  messagesDB: Message[];
}) {
  const [messages, setMessages] = useState(messagesDB);
  const [messagesToShow, setMessagesToShow] = useState(messagesDB);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [isNew, setIsNew] = useState<boolean>(true);
  const [currentMessage, setCurrentMessage] = useState<Message>(defaultMessage);
  const [isOpenForm, setIsOpenForm] = useState(false);
  const list = useRef<HTMLDivElement>(null);
  const headersList: TableHeaderProps[] = [
    {
      text: "ID",
      className: "hidden w-12 lg:table-cell text-center",
    },
    {
      text: "Utilisateur",
      className: "w-24 sm:w-auto ",
    },
    {
      text: "Mail",
      className: "hidden md:table-cell md:w-[250px]",
    },
    {
      text: "Contenu",
      className: "truncate",
    },
    {
      text: "Date d'envoi",
      className: "hidden lg:table-cell lg:w-[200px]",
    },
    {
      text: "Status",
      className: "w-12 lg:w-20 truncate",
    },
    {
      text: "",
      className: "w-6 ",
    },
  ];

  const bodyItems: BodyItems[] = messagesToShow.map((m) => {
    const bodyItem: BodyItemProps[] = [
      // id
      { value: m.message_id, className: "hidden lg:table-cell text-center" },
      // user
      {
        value: getFullName(
          decodeURI(m.message_contact_first_name),
          decodeURI(m.message_contact_last_name)
        ),
        className: "truncate",
      },
      // mail
      {
        value: m.message_contact_email,
        className:
          "hidden md:table-cell text-sm md:text-md lg:text-lg truncate",
      },
      // content
      { value: decodeURI(m.message_content), className: "truncate" },
      // published at
      {
        value: getFullStringDate(m.message_published_date),
        className: "hidden lg:table-cell ",
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
            list={list}
          />
        ),
      },
    ];
    return bodyItem;
  });

  const tableRef = useRef(null);

  function handleCloseForm() {
    setCurrentMessage(defaultMessage);
    setIsOpenForm(false);
    setIsNew(false);
  }
  useEffect(() => {
    const start = (page - 1) * itemsPerPage;
    const end = page * itemsPerPage;
    setMessagesToShow(messages.slice(start, end));
  }, [page, messages]);

  return (
    <div>
      <div className="mb-20">
        <Table reference={tableRef}>
          <TableHeader headersList={headersList} />
          <TableBody bodyItems={bodyItems} />
        </Table>
        <UiPagination
          page={page}
          setPage={setPage}
          length={messages.length}
          itemsPerPage={itemsPerPage}
        />
      </div>

      <div className="mb-16" ref={list}>
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
