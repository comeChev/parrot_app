import GalleryPictures from "@/components/site/gallery/Gallery.pictures";
import { Picture } from "@prisma/client";
import { Suspense } from "react";
import UiImageMain from "@/components/ui/Ui.image.main";
import UiReasons from "@/components/ui/Ui.reasons";
import UiTextMain from "@/components/ui/Ui.text.main";
import galleryMainPic from "@/assets/gallery/mainGallery.jpg";
import { getPictures } from "@/lib/pictures";

export const metadata = {
  title: "Galerie d'images | Garage V. Parrot",
  description:
    "Bienvenue sur le site Garage V. Parrot. Nous sommes spécialisés dans la réparation, l'entretien et la vente de véhicules de toutes marques. Consultez nos plus beaux clichés !",
};

export default async function GalleryPage() {
  const pictures: Picture[] = await getPictures();
  const picturePagination = 5;

  function separatePictures(pictures: Picture[], size: number) {
    const picturesPage = [];
    for (let i = 0; i < pictures.length; i += size) {
      picturesPage.push(pictures.slice(i, i + size));
    }
    return picturesPage;
  }
  const pagesPictures = separatePictures(pictures, picturePagination);

  return (
    <div>
      <UiImageMain image={galleryMainPic} />

      <UiTextMain text="Découvrez nos photos de véhicules, de notre garage et de nos équipes !" />
      <Suspense>
        <div className="container mx-auto flex flex-col space-y-5 mb-[80px]">
          {pagesPictures.map((pagePictures, i) => (
            <GalleryPictures pictures={pagePictures} key={i} />
          ))}
        </div>
      </Suspense>

      {/* reasons */}
      <UiReasons />
    </div>
  );
}
