import { Picture } from "@prisma/client";
import GalleryPicturesItem from "./Gallery.pictures.item";

type GalleryPicturesProps = {
  pictures: Picture[];
  reverse?: string;
};

const arrayReverse = ["col", "row", "row-reverse", "col-reverse"];

/**
 * @description Gallery of pictures (6 per item)
 */
export default function GalleryPictures({
  pictures,
  reverse = arrayReverse[Math.floor(Math.random() * arrayReverse.length)],
}: GalleryPicturesProps) {
  return (
    <div
      className={`w-full flex ${
        reverse === "row-reverse"
          ? "flex-row-reverse h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]"
          : reverse === "row"
          ? "flex-row h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]"
          : reverse === "col-reverse"
          ? "flex-col-reverse h-[500px] sm:h-[600px] md:h-[700px] lg:h-[800px]"
          : "flex-col h-[500px] sm:h-[600px] md:h-[700px] lg:h-[800px]"
      } px-4`}
    >
      <div
        className={`${
          reverse === "row" || reverse === "row-reverse"
            ? "w-2/3"
            : (reverse === "col" || reverse === "col-reverse") && "h-2/3"
        } flex flex-row flex-wrap`}
      >
        {pictures &&
          pictures.map(
            (p, index) =>
              index < pictures.length - 1 && (
                <div className="w-1/2 h-1/2 p-1">
                  <GalleryPicturesItem key={index} picture={p} />
                </div>
              )
          )}
      </div>
      <div
        className={`${
          reverse === "row" || reverse === "row-reverse"
            ? "w-1/3"
            : (reverse === "col" || reverse === "col-reverse") && "w-full h-1/3"
        }`}
      >
        {pictures && pictures[4] && (
          <GalleryPicturesItem key={4} picture={pictures[4]} />
        )}
      </div>
    </div>
  );
}
