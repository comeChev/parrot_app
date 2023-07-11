"use client";

import { FullCar, updateCar } from "@/lib/cars";
import { Dispatch, SetStateAction, useState } from "react";
import { BsThreeDotsVertical, BsXLg } from "react-icons/bs";
import {
  TableActionsButtonsArchive,
  TableActionsButtonsConfirm,
  TableActionsButtonsEdit,
  TableActionsButtonsHide,
  TableActionsButtonsShow,
} from "./Table.actions.buttons";

type TableActionsProps = {
  car: FullCar;
  setCars: Dispatch<SetStateAction<FullCar[]>>;
};

export default function TableActions({ car, setCars }: TableActionsProps) {
  const [isOpenMenuAction, setIsOpenMenuAction] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPendingConfirm, setIsPendingConfirm] = useState(false);

  async function handleHideCar() {
    setIsLoading(true);
    //optimistic update
    setCars((prev) =>
      prev.map((c) =>
        c.car_id === car.car_id ? { ...c, car_status: "OFFLINE" } : c
      )
    );
    //update db
    const res = await updateCar(car.car_id, { ...car, car_status: "OFFLINE" });

    //rollback if error
    if (!res) {
      setCars((prev) =>
        prev.map((c) =>
          c.car_id === car.car_id ? { ...c, car_status: "ONLINE" } : c
        )
      );
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
    setIsOpenMenuAction(false);
  }

  async function handleShowCar() {
    setIsLoading(true);
    //optimistic update
    setCars((prev) =>
      prev.map((c) =>
        c.car_id === car.car_id ? { ...c, car_status: "ONLINE" } : c
      )
    );
    //update db
    const res = await updateCar(car.car_id, { ...car, car_status: "ONLINE" });

    //rollback if error
    if (!res) {
      setCars((prev) =>
        prev.map((c) =>
          c.car_id === car.car_id ? { ...c, car_status: "OFFLINE" } : c
        )
      );
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
    setIsOpenMenuAction(false);
  }

  async function handleArchive() {
    setIsLoading(true);

    //optimistic update
    const oldStatus = car.car_status;
    setCars((prev) =>
      prev.map((c) =>
        c.car_id === car.car_id ? { ...c, car_status: "ARCHIVED" } : c
      )
    );

    //update db
    const res = await updateCar(car.car_id, { ...car, car_status: "ARCHIVED" });

    //rollback if error
    if (!res) {
      setCars((prev) =>
        prev.map((c) =>
          c.car_id === car.car_id ? { ...c, car_status: oldStatus } : c
        )
      );
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
    setIsOpenMenuAction(false);
  }

  function handleConfirm() {
    setIsPendingConfirm(true);
    setTimeout(() => {
      setIsPendingConfirm(false);
    }, 2000);
  }

  return (
    <div className="relative text-center">
      <button onClick={() => setIsOpenMenuAction(!isOpenMenuAction)}>
        {isOpenMenuAction ? (
          <BsXLg className="text-xl" />
        ) : (
          <BsThreeDotsVertical className="text-xl" />
        )}
      </button>

      {isOpenMenuAction && (
        <div
          className="absolute -left-[120px] top-2 flex flex-col bg-neutral-100 w-32 py-2
          h-auto z-50 border border-neutral-400 rounded-md"
        >
          {car.car_status.toUpperCase() === "ONLINE" ? (
            <TableActionsButtonsHide
              onClick={handleHideCar}
              disabled={isLoading}
            />
          ) : (
            car.car_status.toUpperCase() === "OFFLINE" && (
              <TableActionsButtonsShow
                onClick={handleShowCar}
                disabled={isLoading}
              />
            )
          )}
          {car?.car_status.toUpperCase() !== "ARCHIVED" &&
            (isPendingConfirm ? (
              <TableActionsButtonsConfirm
                onClick={handleArchive}
                disabled={car.car_status === "ARCHIVED" || isLoading}
              />
            ) : (
              <TableActionsButtonsArchive
                onClick={handleConfirm}
                disabled={car.car_status === "ARCHIVED" || isLoading}
              />
            ))}
          <TableActionsButtonsEdit href={`/dashboard/car?id=${car.car_id}`} />
        </div>
      )}
    </div>
  );
}
