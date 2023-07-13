import ReviewsTable from "@/components/dashboard/reviews/Reviews.table";
import { DescriptionPin, StatusPin } from "@/components/ui/Ui.status.pin";
import { prisma } from "@/utils/prisma";

export default async function ReviewAdminPage() {
  //get reviews && decode from uri
  const reviewsDB = await prisma.review.findMany().then((reviews) =>
    reviews.map((review) => {
      const decodedReview = {
        ...review,
        review_user_first_name: decodeURI(review.review_user_first_name),
        review_user_last_name: decodeURI(review.review_user_last_name),
        review_comment: decodeURI(review.review_comment),
      };
      return decodedReview;
    })
  );

  function getPendingReviews() {
    return reviewsDB.filter((review) => review.review_status === "PENDING")
      .length;
  }

  return (
    <div className="px-4 mt-10 min-h-screen container">
      <h2 className="text-3xl font-bold">Liste des commentaires</h2>
      {/* explanations status */}
      <div className="flex items-center mt-5">
        <div className="flex flex-col">
          <div className="flex mb-1 items-center">
            <StatusPin status="ARCHIVED" />
            <DescriptionPin label="Commentaire en attente de validation" />
          </div>
          <div className="flex mb-1 items-center">
            <StatusPin status="ONLINE" />
            <DescriptionPin label="Commentaire en ligne et visible sur le site" />
          </div>
          <div className="flex mb-1 items-center">
            <StatusPin status="OFFLINE" />
            <DescriptionPin label="Commentaire hors-ligne. Non visible sur le site" />
          </div>
        </div>
      </div>
      <p className="mt-4 text-md text-neutral-600">
        {getPendingReviews() > 0
          ? `${getPendingReviews()} commentaires en attente de validation`
          : "Aucun commentaire en attente de validation"}
      </p>
      <ReviewsTable reviewsDB={reviewsDB} />
    </div>
  );
}
