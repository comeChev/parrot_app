"use client";

import { updateMessage } from "@/lib/messages";
import { updateReview } from "@/lib/reviews";
import { Message, Review } from "@prisma/client";
import {
  BsExclamationOctagonFill,
  BsExclamationSquareFill,
  BsEyeFill,
} from "react-icons/bs";

type ReviewsListActionEditProps = {
  review: Review;
  setCurrent: React.Dispatch<React.SetStateAction<Review>>;
  setOpenForm: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsNew: React.Dispatch<React.SetStateAction<boolean>>;
};
type ReviewsListActionToggleStatusProps = {
  review: Review;
  setReviews: React.Dispatch<React.SetStateAction<Review[]>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenForm: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrent: React.Dispatch<React.SetStateAction<Review>>;
};

export function ReviewsListActionEdit({
  review,
  setCurrent,
  setOpenForm,
  setIsOpen,
  setIsNew,
}: ReviewsListActionEditProps) {
  function handleEdit() {
    setCurrent(review);
    setIsNew(false);
    setOpenForm(true);
    setIsOpen(false);
  }

  return (
    <button
      type="button"
      onClick={handleEdit}
      className="text-md text-sky-500 hover:text-sky-700 disabled:text-neutral-300 flex items-center justify-between hover:bg-neutral-200 px-4 py-2"
    >
      <p className="text-sm mr-2">Visualiser</p>
      <BsEyeFill className="" />
    </button>
  );
}
export function ReviewsListActionToggleStatus({
  review,
  setReviews,
  setIsOpen,
  setOpenForm,
  setCurrent,
}: ReviewsListActionToggleStatusProps) {
  async function toggleStatus(status: "ONLINE" | "OFFLINE") {
    const oldReview = review;
    setReviews((prev) =>
      prev.map((m) =>
        m.review_id === review.review_id
          ? {
              ...m,
              review_status: status,
            }
          : m
      )
    );

    const res = await updateReview(review.review_id, {
      ...review,
      review_status: status,
    });
    if (!res) {
      setReviews((prev) =>
        prev.map((m) => (m.review_id === review.review_id ? oldReview : m))
      );
      setIsOpen(false);
      return;
    }
    setIsOpen(false);
  }

  return review.review_status === "ONLINE" ? (
    <button
      onClick={() => toggleStatus("OFFLINE")}
      className="text-md text-red-500 flex items-center justify-between hover:bg-neutral-200 px-4 py-2"
    >
      <p className="text-sm mr-2 w-32 text-start">Mettre hors ligne</p>
      <BsExclamationOctagonFill className="" />
    </button>
  ) : (
    <button
      onClick={() => toggleStatus("ONLINE")}
      className="text-md text-green-500 flex items-center justify-between hover:bg-neutral-200 hover:text-green-600 px-4 py-2"
    >
      <p className="text-sm mr-2 w-32 text-start">Mettre en ligne</p>
      <BsExclamationSquareFill className="" />
    </button>
  );
}
