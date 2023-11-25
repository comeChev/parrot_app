import { FaRegStar, FaStar } from "react-icons/fa";

import { Review } from "@prisma/client";

type ReviewsCommentsItemProps = {
  review: Review;
};

export default function ReviewsCommentsItem({ review }: ReviewsCommentsItemProps) {
  const arrayNote = [1, 2, 3, 4, 5];
  return (
    <div className="flex flex-col p-4 my-4 rounded-md shadow-sm text-start md:flex-row bg-gray-50 drop-shadow-lg md:items-center md:gap-10">
      <div className="flex flex-col md:flex-row md:items-center md:gap-5 ">
        {/* name & date */}
        <div className="mb-3 md:mb-0 w-[180px] truncate">
          <p className="text-xl font-bold">{`${review.review_user_first_name} ${review.review_user_last_name[0]}.`}</p>
          <p className="text-sm text-gray -400">
            {new Date(review.review_published_date).toLocaleDateString(["fr-FR"], {
              dateStyle: "long",
              timeZone: "Europe/Paris",
            })}
          </p>
        </div>
        {/* note */}
        <div className="flex mb-3 space-x-2 md:mb-0">
          {arrayNote.map((s) => {
            if (review.review_note >= s) return <FaStar key={s} className="text-2xl text-red-700" />;
            return <FaRegStar key={s} className="text-2xl text-red-700" />;
          })}
        </div>
      </div>
      {/* comment */}
      <div className="flex-1 truncate">
        <p className="italic text-gray-500">{`"${review.review_comment}"`}</p>
      </div>
    </div>
  );
}
