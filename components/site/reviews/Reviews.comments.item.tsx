import { BsStar, BsStarFill } from "react-icons/bs";

import { Review } from "@prisma/client";

type ReviewsCommentsItemProps = {
  review: Review;
};

const arrayNote = [1, 2, 3, 4, 5];

export default function ReviewsCommentsItem({
  review,
}: ReviewsCommentsItemProps) {
  return (
    <div className="text-start flex flex-col md:flex-row rounded-md bg-gray-50 my-4 p-4 shadow-sm drop-shadow-lg shadow-neutral-400 md:items-center">
      {/* name & date */}
      <div className="mb-3 md:mb-0 md:mr-[100px]">
        <p className="text-xl font-bold">{`${review.review_user_first_name} ${review.review_user_last_name[0]}.`}</p>
        <p className="text-sm text-neutral-400">
          {new Date(review.review_published_date).toLocaleDateString([], {
            dateStyle: "long",
          })}
        </p>
      </div>
      {/* note */}
      <div className="flex space-x-2 mb-3 md:mb-0 md:mr-[100px]">
        {arrayNote.map((s) => {
          if (review.review_note >= s)
            return <BsStarFill key={s} className="text-2xl text-red-700" />;
          return <BsStar key={s} className="text-2xl text-red-700" />;
        })}
      </div>
      {/* comment */}
      <div className="flex-1 text-start">
        <p className="italic text-neutral-500">{`"${review.review_comment}"`}</p>
      </div>
    </div>
  );
}
