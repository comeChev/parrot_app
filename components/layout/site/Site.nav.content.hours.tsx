"use client";

import { BsCaretDown, BsCaretDownFill } from "react-icons/bs";

import { Hour } from "@prisma/client";
import SiteNavContentHoursItem from "./Site.nav.content.hours.item";

export default function SiteNavContentHours({ hours }: { hours: Hour[] }) {
  return (
    <div className="px-4 my-10">
      <h4 className="font-semibold mb-4 text-xl">Nos horaires d'ouverture</h4>
      {hours &&
        hours.map((day, index) => (
          <SiteNavContentHoursItem key={index} day={day} />
        ))}
    </div>
  );
}
