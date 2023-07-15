import Link from "next/link";
import {
  BsEyeFill,
  BsEyeSlashFill,
  BsFillInboxesFill,
  BsInfoCircle,
  BsPenFill,
} from "react-icons/bs";

export function TableActionsButtonsEdit({ href }: { href: string }) {
  return (
    <Link
      href={href}
      className="text-md text-teal-500 hover:text-teal-700 disabled:text-neutral-300 flex items-center justify-between hover:bg-neutral-200 px-4 py-2"
    >
      <p className="text-sm">Éditer</p>
      <BsPenFill className="" />
    </Link>
  );
}

export function TableActionsButtonsHide({
  onClick,
  disabled,
}: {
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <button
      className="text-md text-red-500 hover:text-red-700 disabled:text-neutral-300 flex items-center justify-between hover:bg-neutral-200 px-4 py-2"
      onClick={onClick}
      disabled={disabled}
    >
      <span className="text-sm">Retirer</span>
      <BsEyeSlashFill className="" />
    </button>
  );
}

export function TableActionsButtonsShow({
  onClick,
  disabled,
}: {
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <button
      className="text-md text-blue-500 hover:text-blue-700 disabled:text-neutral-300 flex items-center justify-between hover:bg-neutral-200 px-4 py-2"
      onClick={onClick}
      disabled={disabled}
    >
      <span className="text-sm">Publier</span>
      <BsEyeFill className="" />
    </button>
  );
}

export function TableActionsButtonsArchive({
  onClick,
  disabled,
}: {
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <button
      className="text-md text-violet-500 hover:text-violet-700 disabled:text-neutral-300 flex items-center justify-between hover:bg-neutral-200 px-4 py-2"
      onClick={onClick}
      disabled={disabled}
    >
      <span className="text-sm">Archiver</span>
      <BsFillInboxesFill className="" />
    </button>
  );
}

export function TableActionsButtonsConfirm({
  onClick,
  disabled,
}: {
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <button
      className="text-md text-red-600 hover:text-red-700 bg-red-100 disabled:text-neutral-300 flex items-center justify-between hover:bg-red-200 px-4 py-2"
      onClick={onClick}
      disabled={disabled}
    >
      <BsInfoCircle className="" />
      <span className="text-sm">Confirmer</span>
    </button>
  );
}
