import UiImageMain from "@/components/ui/Ui.image.main";
import galleryMainPic from "@/assets/gallery/mainGallery.jpg";
import UiReasons from "@/components/ui/Ui.reasons";
import { getPictures } from "@/lib/pictures";
import { Picture } from "@prisma/client";
import GalleryPictures from "@/components/site/gallery/Gallery.pictures";

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
      <h2 className="text-center text-4xl font-bold mb-12 px-4">
        Galerie de photos
      </h2>

      <div className="container mx-auto flex flex-col space-y-5 mb-[80px]">
        {pagesPictures.map((pagePictures) => (
          <GalleryPictures pictures={pagePictures} />
        ))}
      </div>

      {/* reasons */}
      <UiReasons />
    </div>
  );
}
