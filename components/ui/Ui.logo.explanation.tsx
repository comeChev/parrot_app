import { IconType } from "react-icons";

type UiLogoExplanationProps = {
  Icon: IconType;
  text: string;
};

export default function UiLogoExplanation({
  Icon,
  text,
}: UiLogoExplanationProps) {
  return (
    <div className="flex items-center">
      <Icon className="text-xl mr-2 min-w-[25px]" />
      <p className="text-neutral-500 text-sm">{text}</p>
    </div>
  );
}
