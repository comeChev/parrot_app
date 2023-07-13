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
import { Hour } from "@prisma/client";
import { useRef, useState } from "react";
import HourForm, { defaultHour } from "./Hours.form";
import UiButtonAction from "@/components/ui/Ui.button.action";
import HoursListAction from "./Hours.list.action";
import HoursActionButton from "./Hours.action.button";

export default function HoursTable({ hoursDB }: { hoursDB: Hour[] }) {
  const [hours, setHours] = useState<Hour[]>(hoursDB);
  const [isNew, setIsNew] = useState<boolean>(true);
  const [currentHour, setCurrentHour] = useState<Hour>(defaultHour);
  const [isOpenForm, setIsOpenForm] = useState(false);
  const headersList: TableHeaderProps[] = [
    {
      text: "ID",
      className: "hidden w-12 text-center",
    },
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
      className: "md:text-lg",
    },
    {
      text: "",
      className: "w-12 md:text-lg",
    },
  ];

  const bodyItems: BodyItems[] = hours.map((h) => {
    const bodyItem: BodyItemProps[] = [
      // id
      { value: h.hour_id, className: "hidden text-center" },
      // day
      { value: h.hour_day, className: "" },
      // morning
      {
        value: (
          <div className="flex">
            <HoursActionButton setHours={setHours} isMorning={true} hour={h} />
            <p className="ml-2">
              {!h.hour_morning_status
                ? `Fermé`
                : `de ${h.hour_morning_opening} à ${h.hour_morning_closing}`}
            </p>
          </div>
        ),
        className: "text-sm md:text-md lg:text-lg",
      },
      // afternoon
      {
        value: (
          <div className="flex">
            <HoursActionButton setHours={setHours} isMorning={false} hour={h} />
            <p className="ml-2">
              {!h.hour_afternoon_status
                ? `Fermé`
                : `de ${h.hour_afternoon_opening} à ${h.hour_afternoon_closing}`}
            </p>
          </div>
        ),
        className: "text-sm md:text-md md:text-lg",
      },
      {
        value: (
          <HoursListAction
            hour={h}
            setHours={setHours}
            setIsOpenForm={setIsOpenForm}
            setIsNew={setIsNew}
            setCurrent={setCurrentHour}
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
    <div>
      <div className="flex mb-20">
        <Table reference={tableRef}>
          <TableHeader headersList={headersList} />
          <TableBody bodyItems={bodyItems} />
        </Table>
      </div>

      <div className="mb-16">
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
