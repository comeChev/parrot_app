"use client";

import { Review } from "@prisma/client";
import { MutableRefObject, useRef, useState } from "react";
import ReviewsCommentsItem from "./Reviews.comments.item";

type ReviewsCommentsProps = {
  reviews: Review[];
};

export default function ReviewsComments({ reviews }: ReviewsCommentsProps) {
  const [reviewsData, setReviewsData] = useState<Review[]>(reviews.reverse());
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  const showMoreRef = useRef(null);

  let resultsShown = page * limit;

  function handleShowMore() {
    if (resultsShown < reviewsData.length) {
      setPage((prev) => prev + 1);
      if (showMoreRef.current) {
        // @ts-ignore
        showMoreRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  }

  return (
    <>
      {/* historic */}
      <section className="container mx-auto mb-[100px] p-4 text-center">
        {reviewsData &&
          reviews.map((review, index) => {
            if (resultsShown > index) {
              return (
                <ReviewsCommentsItem key={review.review_id} review={review} />
              );
            }
          })}
        <button
          ref={showMoreRef}
          onClick={handleShowMore}
          disabled={resultsShown >= reviewsData.length}
          className="bg-red-700 text-white px-4 py-2 rounded-md shadow-md hover:shadow-lg disabled:opacity-50 disabled:bg-neutral-500 mt-5"
        >
          {reviewsData.length === 0
            ? "Soyez le premier à donner votre avis"
            : resultsShown >= reviewsData.length
            ? "Aucun avis supplémentaire"
            : "Voir plus d'avis"}
        </button>
      </section>
    </>
  );
}
