import React from "react";
import { BsStar, BsStarFill } from "react-icons/bs";

export default function ReviewsNote({ note }: { note: number }) {
  const arrayNote = [1, 2, 3, 4, 5];

  return (
    <div className="flex items-center space-x-2">
      {arrayNote.map((n) => {
        if (note >= n) {
          return (
            <BsStarFill
              key={n}
              aria-label={`note de ${n}`}
              className="text-red-500 text-md cursor-pointer"
            />
          );
        } else {
          return (
            <BsStar
              key={n}
              aria-label={`note de ${n}`}
              className="text-red-500 cursor-pointer text-md"
            />
          );
        }
      })}
    </div>
  );
}
