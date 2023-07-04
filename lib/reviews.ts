import { Review } from "@prisma/client";

export async function getReviews() {
  const reviews = await fetch("/api/reviews", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
    },
  });
  const reviewsJson = await reviews.json();
  if (reviewsJson.error) {
    console.error(reviewsJson.error);
    return [];
  }
  return reviewsJson.data;
}

export async function getReview(id: number) {
  const review = await fetch(`/api/reviews?id=${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
    },
  });
  const reviewJson = await review.json();
  if (reviewJson.error) {
    console.error(reviewJson.error);
    return null;
  }
  return reviewJson.data;
}

export async function createReview(review: Partial<Review>) {
  const newReview = await fetch("/api/reviews", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
    },
    body: JSON.stringify(review),
  });
  const newReviewJson = await newReview.json();
  if (newReviewJson.error) {
    console.error(newReviewJson.error);
    return null;
  }
  return newReviewJson.data;
}

export async function updateReview(id: number, review: Partial<Review>) {
  const updatedReview = await fetch(`/api/reviews?id=${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(review),
  });
  const updatedReviewJson = await updatedReview.json();
  if (updatedReviewJson.error) {
    console.error(updatedReviewJson.error);
    return null;
  }
  return updatedReviewJson.data;
}

export async function deleteReview(id: number) {
  const deletedReview = await fetch(`/api/reviews?id=${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  const deletedReviewJson = await deletedReview.json();
  if (deletedReviewJson.error) {
    console.error(deletedReviewJson.error);
    return null;
  }
  return deletedReviewJson.data;
}
