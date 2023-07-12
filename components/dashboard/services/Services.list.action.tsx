"use client";

import TableBodyItemAction from "@/components/ui/table/Table.body.item.action";
import { Dispatch, SetStateAction, useState } from "react";
import {
  ServicesListActionDelete,
  ServicesListActionEdit,
  ServicesListActionStatus,
} from "./Services.list.action.buttons";
import { ServiceWithPicturesAndCategory } from "@/lib/services";

type ServicesListActionProps = {
  service: ServiceWithPicturesAndCategory;
  setServices: React.Dispatch<
    React.SetStateAction<ServiceWithPicturesAndCategory[]>
  >;
  setIsOpenForm: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrent: Dispatch<SetStateAction<ServiceWithPicturesAndCategory>>;
  setIsNew: Dispatch<SetStateAction<boolean>>;
};

export default function ServicesListAction({
  service,
  setServices,
  setIsOpenForm,
  setCurrent,
  setIsNew,
}: ServicesListActionProps) {
  const [isOpenMenuAction, setIsOpenMenuAction] = useState(false);

  return (
    <TableBodyItemAction
      isOpenMenuAction={isOpenMenuAction}
      setIsOpenMenuAction={setIsOpenMenuAction}
    >
      <ServicesListActionEdit
        setCurrent={setCurrent}
        setIsOpen={setIsOpenMenuAction}
        service={service}
        setOpenForm={setIsOpenForm}
        setIsNew={setIsNew}
      />
      <ServicesListActionStatus
        service={service}
        setServices={setServices}
        setIsOpen={setIsOpenMenuAction}
      />
      <ServicesListActionDelete
        service={service}
        setServices={setServices}
        setIsOpen={setIsOpenMenuAction}
      />
    </TableBodyItemAction>
  );
}
