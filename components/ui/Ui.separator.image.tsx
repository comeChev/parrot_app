import Image, { StaticImageData } from "next/image";

type SeparatorImageProps = {
  image: StaticImageData;
};

export default function SeparatorImage({ image }: SeparatorImageProps) {
  return (
    <div className="container mx-auto h-[400px] mb-10 md:mb-[70px] relative shadow-lg">
      <Image
        src={image}
        fill
        sizes="(min-width: 1540px) 1536px, (min-width: 1280px) 1280px, (min-width: 1040px) 1024px, (min-width: 780px) 768px, (min-width: 680px) 640px, calc(94.44vw + 17px)"
        placeholder="blur"
        alt="image d'outils garage V. Parrot"
        className="object-cover w-full h-full md:rounded-md"
      />
    </div>
  );
}
