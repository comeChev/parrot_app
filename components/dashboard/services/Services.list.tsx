"use client";

import { BodyItemProps, BodyItems } from "@/components/ui/table/Table.body.item";
import TableHeader, { TableHeaderProps } from "@/components/ui/table/Table.header";
import { useEffect, useRef, useState } from "react";

import { Category } from "@prisma/client";
import { ServiceWithPicturesAndCategory } from "@/lib/services";
import ServicesAddOrCreate from "./Services.add";
import ServicesListAction from "./Services.list.action";
import Table from "@/components/ui/table/Table";
import TableBody from "@/components/ui/table/Table.body";
import TableBodyItemStatus from "@/components/ui/table/Table.body.item.status";
import UiPagination from "@/components/ui/Ui.pagination";
import { defaultService } from "./Services.form";
import { getFullStringDate } from "@/utils/globals";

const tableHeaders: TableHeaderProps[] = [
  {
    text: "ID",
    className: "w-12 hidden lg:table-cell text-center",
  },
  {
    text: "Titre",
    className: "w-[100px] md:w-[270px] truncate",
  },
  {
    text: "Contenu",
    className: "",
  },
  {
    text: "Catégorie",
    className: "hidden lg:table-cell",
  },
  {
    text: "Date de publication",
    className: "hidden lg:table-cell",
  },
  {
    text: "État",
    className: "w-12 text-center",
  },
  {
    text: "",
    className: "w-12",
  },
];

type ServicesListProps = {
  servicesDB: ServiceWithPicturesAndCategory[];
  categoriesDB: Category[];
};

export default function ServicesList({ servicesDB, categoriesDB }: ServicesListProps) {
  const [services, setServices] = useState<ServiceWithPicturesAndCategory[]>(servicesDB);
  const [servicesToShow, setServicesToShow] = useState<ServiceWithPicturesAndCategory[]>(servicesDB);
  const [isNew, setIsNew] = useState<boolean>(false);
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [currentService, setCurrentService] = useState<ServiceWithPicturesAndCategory>(defaultService);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const list = useRef<HTMLDivElement>(null);
  const listServices = useRef<HTMLDivElement>(null);

  let bodyItems: BodyItems[] = [];

  servicesToShow &&
    servicesToShow.map((s) => {
      const bodyItem: BodyItemProps[] = [
        // id
        { value: s.service_id, className: "hidden lg:table-cell text-center" },
        // title
        {
          value: s.service_title,
          className: "truncate text-gray-600",
        },
        // content
        { value: s.service_paragraph_one, className: "truncate text-gray-600" },
        // category
        {
          value: s.category.category_name,
          className: "hidden lg:table-cell truncate text-gray-600",
        },
        //pusblised date
        {
          value: getFullStringDate(new Date(s.service_published_date)),
          className: "hidden lg:table-cell text-gray-600",
        },
        // status
        {
          value: <TableBodyItemStatus status={s.service_status as "ONLINE" | "OFFLINE"} />,
          className: "text-center",
        },
        {
          value: (
            <ServicesListAction
              service={s}
              setServices={setServices}
              setCurrent={setCurrentService}
              setIsOpenForm={setIsOpenForm}
              setIsNew={setIsNew}
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
    setServicesToShow(services.slice(start, end));
  }, [page, services]);

  return (
    <div>
      <div className="mb-20">
        <Table reference={listServices}>
          <TableHeader headersList={tableHeaders} />
          <TableBody bodyItems={bodyItems} />
        </Table>
        <UiPagination page={page} setPage={setPage} length={services.length} itemsPerPage={itemsPerPage} />
      </div>
      <div className="mb-20" ref={list}>
        <ServicesAddOrCreate
          setIsNew={setIsNew}
          isNew={isNew}
          servicesDB={servicesDB}
          currentService={currentService}
          setCurrentService={setCurrentService}
          setIsOpenForm={setIsOpenForm}
          isOpenForm={isOpenForm}
          setServices={setServices}
          categoriesDB={categoriesDB}
        />
      </div>
    </div>
  );
}
