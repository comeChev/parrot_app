import { Review } from "@prisma/client";
import React from "react";

import { BsStar, BsStarFill } from "react-icons/bs";

type HomeReviewsItemProps = {
  review: Review;
};

const arrayStars = [1, 2, 3, 4, 5];

export default function HomeReviewsItem({ review }: HomeReviewsItemProps) {
  function getFullName(review: Review) {
    const fullName = `${review.review_user_first_name.toLocaleUpperCase()} ${review.review_user_last_name[0].toUpperCase()}.`;
    return fullName;
  }

  return (
    <div className="flex-1 flex flex-col items-center mb-[70px] text-center">
      {/* stars */}
      <div className="flex space-x-2">
        {arrayStars.map((s) => {
          if (review.review_note >= s)
            return <BsStarFill className="text-4xl text-red-700" />;
          return <BsStar className="text-4xl text-red-700" />;
        })}
      </div>
      {/* review */}
      <div className="mt-6">
        <div className="w-1/2 mx-auto bg-neutral-600 h-[2px] mb-5" />
        <h4 className="text-lg font-semibold">{getFullName(review)}</h4>
        <h4 className="text-sm font-light mb-2 text-neutral-600">
          {new Date(review.review_published_date).toLocaleDateString("fr-FR", {
            dateStyle: "long",
          })}
        </h4>
        <p className="font-light italic text-base text-neutral-700">
          {`" ${review.review_comment} "`}
        </p>
      </div>
    </div>
  );
}
