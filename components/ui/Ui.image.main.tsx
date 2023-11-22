import Image, { StaticImageData } from "next/image";

type UiImageMainProps = {
  image: StaticImageData | string;
};
export default function UiImageMain({ image }: UiImageMainProps) {
  return (
    <div className="container relative w-full h-[500px] mb-10 md:mb-[100px] mx-auto">
      <Image
        src={image}
        alt="Image principale - garage V. Parrot"
        fill
        placeholder="blur"
        className="object-cover brightness-[60%] w-auto h-full"
        priority
      />
      {/* Title with name of the enterprise */}
      <div className="absolute bottom-32 w-3/4 left-1/2 transform -translate-x-1/2 items-center flex flex-col py-3 px-4 rounded-md bg-opacity-70 bg-red-800 -skew-x-[10deg]">
        <h1 className="bottom-4 text-white text-xl md:text-4xl font-extrabold font-title text-center">
          GARAGE V. PARROT
        </h1>
        <h2 className="text-sm md:text-xl text-neutral-200 text-center font-subtitle">
          Toulouse, Zone artisanale du moulin
        </h2>
      </div>
    </div>
  );
}
