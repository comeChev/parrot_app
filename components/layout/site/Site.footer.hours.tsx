"use client";

import { BsCaretDownFill } from "react-icons/bs";
import { Hour } from "@prisma/client";
import { useState } from "react";

interface SiteFooterHoursProps {
  hours: Hour[] | [];
}

const SiteFooterHours: React.FC<SiteFooterHoursProps> = ({ hours }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="mx-10 mt-10 flex flex-col">
      <div className="flex items-center justify-between  border-b-2 border-neutral-200 pb-2 mb-4 relative">
        <p className="w-[200px]   font-semibold font-title">
          HEURES D'OUVERTURE
        </p>
        <button
          aria-label={isOpen ? "Fermer les horaires" : "Ouvrir les horaires"}
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden"
        >
          <BsCaretDownFill
            className={`text-2xl ${
              isOpen && "rotate-180"
            } transition-all duration-500`}
          />
        </button>
      </div>
      <div
        className={`text-sm font-light flex flex-col gap-2 transition-all duration-500 overflow-hidden ${
          isOpen ? "max-h-[500px]" : "max-h-0 "
        } md:max-h-[500px]`}
      >
        {hours.map((hour) => (
          <div
            key={hour.hour_id}
            className="flex space-x-2 items-center border-b border-neutral-500 py-2 "
          >
            <div className="w-[100px]">{hour.hour_day}</div>
            {hour.hour_morning_status === false &&
            hour.hour_afternoon_status === false ? (
              <p className="">Fermé toute la journée</p>
            ) : (
              <div className="flex flex-col">
                <p>
                  {hour.hour_morning_status === true
                    ? `de ${hour.hour_morning_opening} à ${hour.hour_morning_closing}`
                    : "Fermé le matin"}
                </p>
                <p>
                  {hour.hour_afternoon_status === true
                    ? `de ${hour.hour_afternoon_opening} à ${hour.hour_afternoon_closing}`
                    : "Fermé l'après-midi"}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SiteFooterHours;
