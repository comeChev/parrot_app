import Link from "next/link";
import { IconType } from "react-icons";

type UiButtonActionProps = {
  Icon?: IconType;
  href: string;
  text: string;
  type: "button" | "link" | "a";
  onClick?: () => void;
};

const InsideButton = ({ Icon, text }: { Icon?: IconType; text: string }) => {
  return (
    <div className="flex items-center space-x-3">
      {Icon && <Icon className="text-xl" />}
      <span className="text-lg truncate">{text}</span>
    </div>
  );
};

export default function UiButtonAction({
  Icon,
  href,
  text,
  type,
  onClick,
}: UiButtonActionProps) {
  const buttonClassName =
    "block text-neutral-100 px-4 py-2 rounded-lg font-light bg-red-800 hover:bg-red-900 transition-all duration-150 ease-in-out w-fit m-1";

  return type === "button" ? (
    <button type="button" onClick={onClick} className={buttonClassName}>
      <InsideButton Icon={Icon} text={text} />
    </button>
  ) : type === "link" ? (
    <Link href={href} className={buttonClassName}>
      <InsideButton Icon={Icon} text={text} />
    </Link>
  ) : (
    type === "a" && (
      <a href={href} className={buttonClassName}>
        <InsideButton Icon={Icon} text={text} />
      </a>
    )
  );
}
