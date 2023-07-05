import SiteNavContentHoursItem from "./Site.nav.content.hours.item";
import { Hour } from "@prisma/client";

const hours: Hour[] = [
  {
    hour_id: 1,
    hour_day: "Lundi",
    hour_morning_status: "open",
    hour_morning_opening: new Date(2020, 1, 1, 8, 30),
    hour_morning_closing: new Date(2020, 1, 1, 12, 30),
    hour_afternoon_status: "open",
    hour_afternoon_opening: new Date(2020, 1, 1, 13, 30),
    hour_afternoon_closing: new Date(2020, 1, 1, 18, 30),
  },
  {
    hour_id: 2,
    hour_day: "Mardi",
    hour_morning_status: "open",
    hour_morning_opening: new Date(2020, 1, 1, 8, 30),
    hour_morning_closing: new Date(2020, 1, 1, 12, 30),
    hour_afternoon_status: "open",
    hour_afternoon_opening: new Date(2020, 1, 1, 13, 30),
    hour_afternoon_closing: new Date(2020, 1, 1, 18, 30),
  },
  {
    hour_id: 3,
    hour_day: "Mercredi",
    hour_morning_status: "open",
    hour_morning_opening: new Date(2020, 1, 1, 8, 30),
    hour_morning_closing: new Date(2020, 1, 1, 12, 30),
    hour_afternoon_status: "open",
    hour_afternoon_opening: new Date(2020, 1, 1, 13, 30),
    hour_afternoon_closing: new Date(2020, 1, 1, 18, 30),
  },
  {
    hour_id: 4,
    hour_day: "Jeudi",
    hour_morning_status: "open",
    hour_morning_opening: new Date(2020, 1, 1, 8, 30),
    hour_morning_closing: new Date(2020, 1, 1, 12, 30),
    hour_afternoon_status: "open",
    hour_afternoon_opening: new Date(2020, 1, 1, 13, 30),
    hour_afternoon_closing: new Date(2020, 1, 1, 18, 30),
  },
  {
    hour_id: 5,
    hour_day: "Vendredi",
    hour_morning_status: "open",
    hour_morning_opening: new Date(2020, 1, 1, 8, 30),
    hour_morning_closing: new Date(2020, 1, 1, 12, 30),
    hour_afternoon_status: "open",
    hour_afternoon_opening: new Date(2020, 1, 1, 13, 30),
    hour_afternoon_closing: new Date(2020, 1, 1, 18, 30),
  },
  {
    hour_id: 6,
    hour_day: "Samedi",
    hour_morning_status: "open",
    hour_morning_opening: new Date(2020, 1, 1, 8, 30),
    hour_morning_closing: new Date(2020, 1, 1, 12, 30),
    hour_afternoon_status: "closed",
    hour_afternoon_opening: new Date(2020, 1, 1, 13, 30),
    hour_afternoon_closing: new Date(2020, 1, 1, 18, 30),
  },
  {
    hour_id: 7,
    hour_day: "Dimanche",
    hour_morning_status: "closed",
    hour_morning_opening: new Date(2020, 1, 1, 8, 30),
    hour_morning_closing: new Date(2020, 1, 1, 12, 30),
    hour_afternoon_status: "closed",
    hour_afternoon_opening: new Date(2020, 1, 1, 13, 30),
    hour_afternoon_closing: new Date(2020, 1, 1, 18, 30),
  },
];

export default function SiteNavContentHours() {
  return (
    <div className="px-4 mt-10">
      <h4 className="font-semibold mb-4 text-xl">Nos horaires d'ouverture</h4>
      {hours && hours.map((day) => <SiteNavContentHoursItem day={day} />)}
    </div>
  );
}
