import { Hour } from "@prisma/client";
import React from "react";

type HourItemProps = {
  day: Hour;
};

function showTime(date: Date) {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function SiteNavContentHoursItem({ day }: HourItemProps) {
  return (
    <div className="flex text-md py-1 font-text items-center">
      <p className="w-32 text-lg">{day.hour_day}</p>

      <p className="w-40">
        {day.hour_morning_status
          ? `de ${day.hour_morning_opening} à ${day.hour_morning_closing}`
          : "Fermé le matin"}
      </p>

      <p className="w-40">
        {day.hour_afternoon_status
          ? `de ${day.hour_afternoon_opening} à ${day.hour_afternoon_closing}`
          : "Fermé l'après-midi"}
      </p>
    </div>
  );
}
