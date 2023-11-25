import { FaRegStar, FaStar } from "react-icons/fa";

import React from "react";
import { Review } from "@prisma/client";

type HomeReviewsItemProps = {
  review: Review;
  index: number;
  item: number;
};

export default function HomeReviewsItem({ review, index, item }: HomeReviewsItemProps) {
  const arrayStars = [1, 2, 3, 4, 5];
  function getFullName(review: Review) {
    const fullName = `${review.review_user_first_name.toLocaleUpperCase()} ${review.review_user_last_name[0].toUpperCase()}.`;
    return fullName;
  }

  return (
    <div
      className={`w-full h-full flex-shrink-0 transition-all duration-500 mx-auto py-2  ${
        item === index && "translate-x-[calc(right-[100%]*2)]"
      } scroll-mt-28 scroll-smooth snap-center snap-always`}
    >
      <div className="text-center">
        {/* stars */}
        <div className="flex justify-center space-x-2">
          {arrayStars.map((s) => {
            if (review.review_note >= s) return <FaStar key={s} className="text-2xl text-red-700" />;
            return <FaRegStar key={s} className="text-2xl text-red-700" />;
          })}
        </div>
        {/* review */}
        <div className="mt-6">
          <div className="w-1/2 mx-auto bg-neutral-600 h-[2px] mb-5" />
          <h4 className="text-lg font-semibold">{getFullName(review)}</h4>
          <h4 className="mb-2 text-sm font-light text-neutral-700">
            {new Date(review.review_published_date).toLocaleDateString("fr-FR", {
              dateStyle: "long",
              timeZone: "Europe/Paris",
            })}
          </h4>
          <p className="text-base italic font-light text-neutral-800">{`" ${review.review_comment} "`}</p>
        </div>
      </div>
    </div>
  );
}
