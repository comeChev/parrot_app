"use client";

import HomeReviewsItem from "@/components/site/home/Home.reviews.item";
import { Review } from "@prisma/client";
import { useState } from "react";

interface CarouselProps {
  reviews: Partial<Review>[];
}

const Carousel: React.FC<CarouselProps> = ({ reviews }) => {
  const [item, setItem] = useState(0);

  return (
    <div className="text-center pb-12 w-full" key={0}>
      <div className=" py-4 mt-8 w-full px-2 overflow-hidden relative">
        <div className="h-[180px] flex items-center justify-center w-full overflow-x-auto text-center no-scrollbar">
          {reviews.map((r, i) => (
            <div
              className={`${
                item === i ? "w-[700px] opacity-100" : "w-0 opacity-0"
              } h-full relative overflow-hidden transition-all shrink-0 duration-500 scroll-mt-28 scroll-smooth snap-center snap-always `}
              key={i}
            >
              <HomeReviewsItem
                review={r as Review}
                index={i}
                length={reviews.length}
                item={item}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center w-full gap-5 md:gap-3">
        {reviews.map((r, i) => (
          <div key={i}>
            <button
              aria-label={`Voir le commentaire ${i + 1}`}
              className={`h-6 w-6 md:h-4 md:w-4  rounded-full ${
                item === i ? "bg-red-900" : "bg-gray-400"
              } transition-all duration-500`}
              onClick={() => setItem(i)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
