"use client";

import { updateHour } from "@/lib/hours";
import { Hour } from "@prisma/client";
import { BsDoorClosed, BsDoorOpenFill } from "react-icons/bs";

type HoursActionButtonProps = {
  setHours: React.Dispatch<React.SetStateAction<Hour[]>>;
  hour: Hour;
  isMorning: boolean;
};

export default function HoursActionButton({
  setHours,
  isMorning,
  hour,
}: HoursActionButtonProps) {
  const isOpen = isMorning
    ? hour.hour_morning_status
    : hour.hour_afternoon_status;

  async function handleClose() {
    const oldHour = hour;
    const hourToUpdate = isMorning
      ? { ...hour, hour_morning_status: !hour.hour_morning_status }
      : { ...hour, hour_afternoon_status: !hour.hour_afternoon_status };
    //optimistic update
    setHours((prev) =>
      prev.map((h) => {
        if (h.hour_id === hour.hour_id) {
          return hourToUpdate;
        }
        return h;
      })
    );

    //update in database
    const res = await updateHour(hourToUpdate);
    //rollback if error
    if (res.error) {
      setHours((prev) =>
        prev.map((h) => {
          if (h.hour_id === hour.hour_id) {
            return oldHour;
          }
          return h;
        })
      );
    }
  }

  return isOpen ? (
    <button className="text-red-600 text-xl" onClick={handleClose}>
      <BsDoorClosed />
    </button>
  ) : (
    <button className="text-indigo-600 text-xl" onClick={handleClose}>
      <BsDoorOpenFill />
    </button>
  );
}
