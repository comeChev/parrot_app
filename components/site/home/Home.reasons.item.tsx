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
    <div className="flex flex-col flex-1 items-center">
      <Icon className="text-red-800 text-6xl md:text-7xl lg:text-8xl" />
      <div className="w-full flex flex-col text-center mt-5 mb-12">
        <div className="w-1/2 mx-auto bg-neutral-600 h-[2px] mb-5" />
        <h4 className="text-lg font-semibold mb-2">{title}</h4>
        <p className="font-light text-base text-neutral-700">{text}</p>
      </div>
    </div>
  );
}
