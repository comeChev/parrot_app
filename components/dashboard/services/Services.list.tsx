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
import { getFullStringDate } from "@/utils/globals";
import { defaultService } from "./Services.form";
import UiPagination from "@/components/ui/Ui.pagination";
import TableBodyItemStatus from "@/components/ui/table/Table.body.item.status";
import { ServiceWithPicturesAndCategory } from "@/lib/services";
import ServicesListAction from "./Services.list.action";
import ServicesAddOrCreate from "./Services.add";
import { Category } from "@prisma/client";

const tableHeaders: TableHeaderProps[] = [
  {
    text: "ID",
    className: "w-12 hidden lg:table-cell text-center",
  },
  {
    text: "Titre",
    className: "w-[170px] md:w-[270px]",
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

export default function ServicesList({
  servicesDB,
  categoriesDB,
}: ServicesListProps) {
  const [services, setServices] =
    useState<ServiceWithPicturesAndCategory[]>(servicesDB);
  const [servicesToShow, setServicesToShow] =
    useState<ServiceWithPicturesAndCategory[]>(servicesDB);
  const [isNew, setIsNew] = useState<boolean>(false);
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [currentService, setCurrentService] =
    useState<ServiceWithPicturesAndCategory>(defaultService);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

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
          className: "truncate",
        },
        // content
        { value: s.service_paragraph_one, className: "truncate" },
        // category
        {
          value: s.category.category_name,
          className: "hidden lg:table-cell truncate",
        },
        //pusblised date
        {
          value: getFullStringDate(new Date(s.service_published_date)),
          className: "hidden lg:table-cell",
        },
        // status
        {
          value: (
            <TableBodyItemStatus
              status={s.service_status as "ONLINE" | "OFFLINE"}
            />
          ),
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
        <UiPagination
          page={page}
          setPage={setPage}
          length={services.length}
          itemsPerPage={itemsPerPage}
        />
      </div>
      <div className="mb-20">
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
