"use client";

import {
  BodyItemProps,
  BodyItems,
} from "@/components/ui/table/Table.body.item";
import HourForm, { defaultHour } from "./Hours.form";
import TableHeader, {
  TableHeaderProps,
} from "@/components/ui/table/Table.header";
import { useRef, useState } from "react";

import { Hour } from "@prisma/client";
import HoursActionButton from "./Hours.action.button";
import HoursListAction from "./Hours.list.action";
import Table from "@/components/ui/table/Table";
import TableBody from "@/components/ui/table/Table.body";
import UiButtonAction from "@/components/ui/Ui.button.action";

export default function HoursTable({ hoursDB }: { hoursDB: Hour[] }) {
  const [hours, setHours] = useState<Hour[]>(hoursDB);
  const [isNew, setIsNew] = useState<boolean>(true);
  const [currentHour, setCurrentHour] = useState<Hour>(defaultHour);
  const [isOpenForm, setIsOpenForm] = useState(false);
  const list = useRef(null);
  const headersList: TableHeaderProps[] = [
    {
      text: "Jour",
      className: "w-24 sm:w-auto md:text-lg",
    },
    {
      text: "Matin",
      className: "md:text-lg",
    },
    {
      text: "Après-midi",
      className: "md:text-lg truncate",
    },
    {
      text: "",
      className: "w-6 md:text-lg",
    },
  ];

  const bodyItems: BodyItems[] = hours.map((h) => {
    const bodyItem: BodyItemProps[] = [
      // day
      { value: h.hour_day, className: "" },
      // morning
      {
        value: (
          <div className="flex flex-col md:flex-row">
            <HoursActionButton setHours={setHours} isMorning={true} hour={h} />
            <div className="mt-2 md:ml-2 md:mt-0">
              {!h.hour_morning_status ? (
                <div className="flex flex-col md:flex-row">
                  <span className="">{"Fermé"}</span>
                  <span className="text-transparent">{"Fermé"}</span>
                </div>
              ) : (
                <div className="flex flex-col md:flex-row">
                  <span className="hidden md:flex">{"de"}</span>
                  <span className="px-1">{h.hour_morning_opening}</span>
                  <span className="hidden md:flex">{"à"}</span>
                  <span className="px-1">{h.hour_morning_closing}</span>
                </div>
              )}
            </div>
          </div>
        ),
        className: "text-sm md:text-md lg:text-lg",
      },
      // afternoon
      {
        value: (
          <div className="flex flex-col md:flex-row">
            <HoursActionButton setHours={setHours} isMorning={false} hour={h} />
            <div className="mt-2 md:ml-2 md:mt-0">
              {!h.hour_afternoon_status ? (
                <div className="flex flex-col md:flex-row">
                  <span className="">{"Fermé"}</span>
                  <span className="text-transparent">{"Fermé"}</span>
                </div>
              ) : (
                <div className="flex flex-col md:flex-row">
                  <span className="hidden md:flex">{"de"}</span>
                  <span className="px-1">{h.hour_afternoon_opening}</span>
                  <span className="hidden md:flex">{"à"}</span>
                  <span className="px-1">{h.hour_afternoon_closing}</span>
                </div>
              )}
            </div>
          </div>
        ),
        className: "text-sm md:text-md lg:text-lg",
      },
      {
        value: (
          <HoursListAction
            hour={h}
            setHours={setHours}
            setIsOpenForm={setIsOpenForm}
            setIsNew={setIsNew}
            setCurrent={setCurrentHour}
            list={list}
          />
        ),
      },
    ];
    return bodyItem;
  });

  const tableRef = useRef(null);

  function handleOpenForm() {
    setCurrentHour(defaultHour);
    setIsNew(true);
    setIsOpenForm(true);
  }
  function handleCloseForm() {
    setCurrentHour(defaultHour);
    setIsOpenForm(false);
    setIsNew(false);
  }

  return (
    <div className="">
      <div className="flex mb-20">
        <Table reference={tableRef}>
          <TableHeader headersList={headersList} />
          <TableBody bodyItems={bodyItems} />
        </Table>
      </div>

      <div className="mb-16" ref={list}>
        <div className="flex flex-col-reverse md:items-center justify-between md:flex-row">
          {isOpenForm ? (
            <UiButtonAction
              text="Fermer le formulaire"
              onClick={handleCloseForm}
              type="button"
              href=""
            />
          ) : (
            <UiButtonAction
              text="Ajouter un horaire"
              onClick={handleOpenForm}
              type="button"
              href=""
            />
          )}
        </div>
      </div>
      {isOpenForm && (
        <HourForm
          hours={hours}
          setHours={setHours}
          isNew={isNew}
          currentHour={currentHour}
          setIsOpenForm={setIsOpenForm}
        />
      )}
    </div>
  );
}
