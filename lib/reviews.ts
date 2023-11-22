import { Review } from "@prisma/client";

export type NewReview = {
  review_user_email: string;
  review_user_first_name: string;
  review_user_last_name: string;
  review_comment: string;
  review_note: number;
  review_status: "PENDING" | "ONLINE" | "OFFLINE" | null;
};

export async function getReviews() {
  const reviews = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/reviews`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
      },
      // revalidate every hour
      next: { revalidate: 60 * 60 },
    }
  );
  const reviewsJson = await reviews.json();
  if (reviewsJson.error) {
    return [];
  }

  // Decode URI
  const reviewsTransformed = reviewsJson.data.map((review: Review) => {
    return {
      ...review,
      review_user_first_name: decodeURI(review.review_user_first_name),
      review_user_last_name: decodeURI(review.review_user_last_name),
      review_comment: decodeURI(review.review_comment),
    };
  });
  return reviewsTransformed;
}

export async function getReview(id: number) {
  const review = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/reviews?id=${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
      },
    }
  );
  const reviewJson = await review.json();
  if (reviewJson.error) {
    return null;
  }

  // Decode URI
  const reviewTransformed = {
    ...reviewJson.data,
    review_user_first_name: decodeURI(reviewJson.data.review_user_first_name),
    review_user_last_name: decodeURI(reviewJson.data.review_user_last_name),
    review_comment: decodeURI(reviewJson.data.review_comment),
  };
  return reviewTransformed;
}

export async function createReview(review: NewReview) {
  // Encode URI
  const reviewToCreate = {
    ...review,
    review_user_first_name: encodeURI(review.review_user_first_name),
    review_user_last_name: encodeURI(review.review_user_last_name),
    review_comment: encodeURI(review.review_comment),
    review_status: "PENDING",
  };

  const newReview = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/reviews`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
      },
      body: JSON.stringify(reviewToCreate),
    }
  );
  const newReviewJson = await newReview.json();
  if (newReviewJson.error) {
    return null;
  }
  return newReviewJson.data;
}

//only update the review status
/**
 * @description Update a review only by the review status
 * @param review review to update ({review_status: "ONLINE" | "OFFLINE" | "PENDING"})
 */
export async function updateReview(id: number, review: Partial<Review>) {
  const updatedReview = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/reviews?id=${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(review),
    }
  );
  const updatedReviewJson = await updatedReview.json();
  if (updatedReviewJson.error) {
    return null;
  }
  return updatedReviewJson.data;
}

export async function deleteReview(id: number) {
  const deletedReview = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/reviews?id=${id}`,
    {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }
  );
  const deletedReviewJson = await deletedReview.json();
  if (deletedReviewJson.error) {
    return null;
  }
  return deletedReviewJson.data;
}

export async function getFreshReviews(quantity: number) {
  const reviews = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/reviews?fresh=${quantity}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
      },
      // revalidate every hour
      next: { revalidate: 60 * 60 },
    }
  );
  const reviewsJson = await reviews.json();
  if (reviewsJson.error) {
    return [];
  }

  const returnedReviews = reviewsJson.data.map((r: Review) => {
    const review: Review = {
      ...r,
      review_user_first_name: decodeURI(r.review_user_first_name),
      review_user_last_name: decodeURI(r.review_user_last_name),
      review_comment: decodeURI(r.review_comment),
      review_published_date: r.review_published_date,
      review_note: r.review_note,
    };
    return review;
  });
  return returnedReviews;
}
