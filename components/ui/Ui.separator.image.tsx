import Image, { StaticImageData } from "next/image";

type SeparatorImageProps = {
  image: StaticImageData;
};

export default function SeparatorImage({ image }: SeparatorImageProps) {
  return (
    <div className="container mx-auto h-[400px] mb-10 md:mb-[70px] relative">
      <Image
        src={image}
        fill
        placeholder="blur"
        alt="image d'outils garage V. Parrot"
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </div>
  );
}
