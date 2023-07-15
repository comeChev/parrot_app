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
import { useEffect, useRef, useState } from "react";
import UiButtonAction from "@/components/ui/Ui.button.action";
import { getFullName, getFullStringDate } from "@/utils/globals";
import MessagesStatus from "./Messages.status";
import MessagesListAction from "./Messages.list.action";
import MessagesForm, { defaultMessage } from "./Messages.form";
import { FullCar } from "@/lib/cars";
import UiPagination from "@/components/ui/Ui.pagination";

export default function MessagesTable({
  car,
  setCar,
}: {
  car: FullCar;
  setCar: React.Dispatch<React.SetStateAction<FullCar>>;
}) {
  const [messages, setMessages] = useState(car.car_messages);
  const [messagesToShow, setMessagesToShow] = useState(car.car_messages);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [isNew, setIsNew] = useState<boolean>(true);
  const [currentMessage, setCurrentMessage] = useState(defaultMessage);
  const [isOpenForm, setIsOpenForm] = useState(false);
  const headersList: TableHeaderProps[] = [
    {
      text: "ID",
      className: "hidden w-12 text-center",
    },
    {
      text: "Utilisateur",
      className: "w-12 sm:w-auto lg:w-[200px] truncate",
    },
    {
      text: "Mail",
      className:
        "hidden md:w-auto text-sm md:text-md lg:table-cell lg:text-lg lg:w-[200px] truncate",
    },
    {
      text: "Contenu",
      className: "",
    },
    {
      text: "Date d'envoi",
      className: "hidden lg:w-[200px] lg:table-cell text-start",
    },
    {
      text: "Status",
      className: "w-12 truncate lg:w-20",
    },
    {
      text: "",
      className: "w-12 ",
    },
  ];

  const bodyItems: BodyItems[] = messagesToShow.map((m) => {
    const bodyItem: BodyItemProps[] = [
      // id
      { value: m.car_message_id, className: "hidden text-center" },
      // user
      {
        value: getFullName(
          decodeURI(m.car_message_contact_first_name),
          decodeURI(m.car_message_contact_last_name)
        ),
        className: "w-12 sm:w-auto truncate",
      },
      // mail
      {
        value: m.car_message_contact_email,
        className:
          "hidden md:w-auto text-sm md:text-md lg:text-lg lg:table-cell truncate",
      },
      // content
      { value: decodeURI(m.car_message_content), className: "truncate" },
      // published at
      {
        value: getFullStringDate(m.car_message_published_date),
        className: "hidden lg:w-[200px] lg:table-cell text-start",
      },
      // status
      //message_status: "PENDING" | "REPLIED" | "ARCHIVED";
      {
        value: (
          <MessagesStatus
            status={m.car_message_status as "PENDING" | "REPLIED" | "ARCHIVED"}
          />
        ),
        className: "w-12 w-20 text-center",
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
        className: "w-12",
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
          setCar={setCar}
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
