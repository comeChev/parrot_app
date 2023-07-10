import UiImageMain from "@/components/ui/Ui.image.main";

import reviewsPic from "@/assets/reviews/reviews.jpg";
import { getReviews } from "@/lib/reviews";
import { Review } from "@prisma/client";
import ReviewsComments from "@/components/site/reviews/Reviews.comments";
import ReviewsForm from "@/components/site/reviews/Reviews.form";
import UiReasons from "@/components/ui/Ui.reasons";
import UiTextMain from "@/components/ui/Ui.text.main";

export default async function ReviewsPage() {
  const reviews: Review[] = await getReviews();

  return (
    <div>
      <UiImageMain image={reviewsPic} />

      <UiTextMain text="Découvrez les avis de nos clients !" />

      {/* Reviews */}
      <ReviewsComments reviews={reviews} />

      <div className=" mb-12 px-4" id="makeReview">
        <h2 className="text-center text-4xl font-bold mb-5">
          Vous souhaitez donner votre avis ?
        </h2>
        <div className="h-[3px] bg-red-700 w-2/3 md:w-1/3 lg:w-1/4 mx-auto" />
      </div>
      {/* Form */}
      <ReviewsForm />

      {/* reasons */}
      <UiReasons />
    </div>
  );
}
