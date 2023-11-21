"use client";

import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

import HomeReviewsItem from "@/components/site/home/Home.reviews.item";
import { Review } from "@prisma/client";
import { useState } from "react";

interface CarouselProps {
  reviews: Partial<Review>[];
}

const Carousel: React.FC<CarouselProps> = ({ reviews }) => {
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState(0);

  const reviewsDB = [...reviews, reviews];

  return (
    <div className="text-center pb-12 w-full">
      <div className=" py-4 mt-8 w-full px-2 overflow-hidden relative">
        <div className="h-[180px] flex items-center justify-center w-full overflow-x-auto text-center">
          {reviews.map((r, i) => (
            <div
              className={`${
                item === i ? "w-[700px] opacity-100" : "w-0 opacity-0"
              } h-full relative overflow-hidden transition-all shrink-0 duration-500 scroll-mt-28 scroll-smooth snap-center snap-always `}
            >
              <HomeReviewsItem
                key={i}
                review={r as Review}
                index={i}
                length={reviews.length}
                item={item}
              />
              {/* buttons */}
              {/* {i > 0 && (
                <button
                  onClick={() => setItem(i - 1)}
                  className="absolute top-1/2 -translate-top-1/2 left-4 text-3xl text-red-700"
                  aria-label="Commentaire précédent"
                >
                  <BsArrowLeft />
                </button>
              )}
              {i < reviews.length - 1 && (
                <button
                  onClick={() => setItem(i + 1)}
                  className="absolute top-1/2 -translate-top-1/2 right-4 text-3xl text-red-700"
                  aria-label="Commentaire suivant"
                >
                  <BsArrowRight />
                </button>
              )} */}
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center w-full gap-3">
        {reviews.map((r, i) => (
          <button
            aria-label={`Voir le commentaire ${i + 1}`}
            className={`h-4 w-4  rounded-full ${
              item === i ? "bg-red-900" : "bg-gray-400"
            } transition-all duration-500`}
            onClick={() => setItem(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
