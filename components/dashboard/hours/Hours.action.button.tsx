"use client";

import { FaDoorClosed, FaDoorOpen } from "react-icons/fa";

import { Hour } from "@prisma/client";
import { updateHour } from "@/lib/hours";

type HoursActionButtonProps = {
  setHours: React.Dispatch<React.SetStateAction<Hour[]>>;
  hour: Hour;
  isMorning: boolean;
};

export default function HoursActionButton({ setHours, isMorning, hour }: HoursActionButtonProps) {
  const isOpen = isMorning ? hour.hour_morning_status : hour.hour_afternoon_status;

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
    <button className="text-xl text-red-600" onClick={handleClose} aria-label="Fermer le garage pour ce créneau">
      <FaDoorClosed />
    </button>
  ) : (
    <button className="text-xl text-indigo-600" onClick={handleClose} aria-label="Ouvrir le garage pour ce créneau">
      <FaDoorOpen />
    </button>
  );
}
