import { Review } from "@prisma/client";
import ReviewsComments from "@/components/site/reviews/Reviews.comments";
import ReviewsForm from "@/components/site/reviews/Reviews.form";
import UiImageMain from "@/components/ui/Ui.image.main";
import UiReasons from "@/components/ui/Ui.reasons";
import UiTextMain from "@/components/ui/Ui.text.main";
import { getReviews } from "@/lib/reviews";
import reviewsPic from "@/assets/reviews/reviews.jpg";

export const metadata = {
  title: "Commentaires | Garage V. Parrot",
  description:
    "Bienvenue sur le site Garage V. Parrot. Nous sommes spécialisés dans la réparation, l'entretien et la vente de véhicules de toutes marques. Retrouvez les avis de nos clients !",
};

export default async function ReviewsPage() {
  const reviews: Review[] = await getReviews();

  return (
    <div>
      <UiImageMain image={reviewsPic} />

      <UiTextMain text="Découvrez les avis de nos clients !" />

      {/* Reviews */}
      <ReviewsComments reviews={reviews} />

      <div className="px-4 mb-12 " id="makeReview">
        <h2 className="mb-5 text-3xl font-bold md:text-4xl md:text-center font-title">
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
