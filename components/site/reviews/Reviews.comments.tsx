"use client";

import { useRef, useState } from "react";

import { Review } from "@prisma/client";
import ReviewsCommentsItem from "./Reviews.comments.item";

type ReviewsCommentsProps = {
  reviews: Review[];
};

export default function ReviewsComments({ reviews }: ReviewsCommentsProps) {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  const showMoreRef = useRef(null);

  let resultsShown = page * limit;

  function handleShowMore() {
    if (resultsShown < reviews.reverse().length) {
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
        {reviews &&
          reviews.map((review, index) => {
            if (resultsShown > index) {
              return <ReviewsCommentsItem key={review.review_id} review={review} />;
            }
          })}
        <button
          ref={showMoreRef}
          onClick={handleShowMore}
          disabled={resultsShown >= reviews.length}
          className="px-4 py-2 mt-5 text-white bg-red-700 rounded-md shadow-md cursor-not-allowed hover:shadow-lg disabled:opacity-50"
        >
          {reviews.length === 0
            ? "Soyez le premier à donner votre avis"
            : resultsShown >= reviews.length
            ? "Aucun avis supplémentaire"
            : "Voir plus d'avis"}
        </button>
      </section>
    </>
  );
}
