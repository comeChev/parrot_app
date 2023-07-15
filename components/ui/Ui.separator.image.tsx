import Image, { StaticImageData } from "next/image";

type SeparatorImageProps = {
  image: StaticImageData;
};

export default function SeparatorImage({ image }: SeparatorImageProps) {
  return (
    <div className="w-full h-[400px] mb-10 md:mb-[70px]">
      <Image
        src={image}
        placeholder="blur"
        alt="image de présentation garage V. Parrot"
        className="w-full h-full object-cover"
      />
    </div>
  );
}
