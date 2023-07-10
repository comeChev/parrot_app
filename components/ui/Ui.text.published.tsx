import React from "react";

export default function UiTextPublished({
  publishedDate,
}: {
  publishedDate: Date;
}) {
  function getDiffDate(date1: Date, date2: Date): number {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    const utc1 = Date.UTC(
      date1.getFullYear(),
      date1.getMonth(),
      date1.getDate()
    );
    const utc2 = Date.UTC(
      date2.getFullYear(),
      date2.getMonth(),
      date2.getDate()
    );
    return Math.floor((utc1 - utc2) / _MS_PER_DAY);
  }

  const days = getDiffDate(new Date(), new Date(publishedDate));
  const weeks = Math.ceil(days / 7);
  const text =
    days < 7
      ? days === 1
        ? "Publié il y a 1 jour"
        : days === 0
        ? "Publié aujourd'hui"
        : `Publié il y ${days} jours`
      : weeks <= 4
      ? weeks === 1
        ? "Publié il y a 1 semaine"
        : `Publié il y a ${weeks} semaines`
      : `Publié il y a ${Math.ceil(weeks / 4)} mois`;

  return <p className="text-sm font-light text-neutral-400 mb-2">{text}</p>;
}
