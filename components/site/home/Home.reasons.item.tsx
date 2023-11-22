import { IconType } from "react-icons";

type HomeReasonsItemProps = {
  Icon: IconType;
  title: string;
  text: string;
};

export default function HomeReasonsItem({
  Icon,
  title,
  text,
}: HomeReasonsItemProps) {
  return (
    <div className="flex flex-col flex-1 items-center min-w-[200px] mx-4 px-4 hover:scale-105 transition-all duration-500">
      <Icon className="text-red-800 text-6xl md:text-7xl lg:text-8xl" />
      <div className="w-full flex flex-col text-start mt-5 mb-12">
        <div className="w-1/2 mx-auto bg-neutral-600 h-[2px] mb-5" />
        <h3 className="text-lg font-semibold font-subtitle mb-2 text-gray-800">
          {title}
        </h3>
        <p className="font-light text-base text-neutral-700 leading-relaxed">
          {text}
        </p>
      </div>
    </div>
  );
}
