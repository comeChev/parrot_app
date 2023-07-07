import Image, { StaticImageData } from "next/image";

type UiImageMainProps = {
  image: StaticImageData;
};
export default function UiImageMain({ image }: UiImageMainProps) {
  return (
    <div className="relative w-full h-[500px] mb-10 md:mb-[100px]">
      <Image
        src={image}
        alt="image de présentation garage V. Parrot"
        className="w-full h-full object-cover brightness-75"
        placeholder="blur"
      />
      {/* Title with name of the enterprise */}
      <div className="absolute bottom-32 w-full h-10 items-center flex flex-col">
        <h1 className="bottom-4 text-white text-4xl font-extrabold">
          GARAGE V. PARROT
        </h1>
        <h2 className="text-xl text-neutral-400">
          St Claude, Zone artisanale du moulin
        </h2>
      </div>
    </div>
  );
}
