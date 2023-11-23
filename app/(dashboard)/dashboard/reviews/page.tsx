import { DescriptionPin, StatusPin } from "@/components/ui/Ui.status.pin";
import Explanations, {
  TExplanation,
} from "@/components/dashboard/ui/explanations";

import { BsExclamationDiamond } from "react-icons/bs";
import ReviewsTable from "@/components/dashboard/reviews/Reviews.table";
import TextMain from "@/components/dashboard/ui/text.main";
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

  const explanations: TExplanation[] = [
    { status: "ARCHIVED", label: "En attente de validation" },
    { status: "ONLINE", label: "En ligne et visible sur le site" },
    { status: "OFFLINE", label: "Hors ligne, non visible sur le site." },
  ];

  return (
    <div className="px-4 mt-10 min-h-screen container">
      <TextMain text="Gestion des commentaires" />

      {/* explanations status */}
      <Explanations items={explanations} />

      {/* Pending mails */}
      <p className="mt-4 text-md text-neutral-600 flex items-center gap-2">
        {getPendingReviews() > 0 ? (
          <>
            <BsExclamationDiamond className="" />
            <span>
              {`${getPendingReviews()} commentaires en attente de validation`}
            </span>
          </>
        ) : (
          "Aucun commentaire en attente de validation"
        )}
      </p>
      <ReviewsTable reviewsDB={reviewsDB} />
    </div>
  );
}
