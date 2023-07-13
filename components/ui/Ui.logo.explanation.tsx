import { IconType } from "react-icons";

type UiLogoExplanationProps = {
  Icon: IconType;
  text: string;
  cssIcon?: string;
};

export default function UiLogoExplanation({
  Icon,
  text,
  cssIcon,
}: UiLogoExplanationProps) {
  return (
    <div className="flex items-center my-2">
      <Icon className={`text-xl mr-2 min-w-[25px] ${cssIcon}`} />
      <p className="text-neutral-500 text-sm">{text}</p>
    </div>
  );
}
