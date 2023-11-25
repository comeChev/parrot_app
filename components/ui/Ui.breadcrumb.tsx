import { FaChevronLeft } from "react-icons/fa";
import { IconType } from "react-icons";
import Link from "next/link";

export type BreadCrumbItem = {
  label: string;
  href: string;
  Icon?: IconType;
};
type BreadCrumbProps = {
  items: BreadCrumbItem[];
};

export default function BreadCrumb({ items }: BreadCrumbProps) {
  return (
    <div>
      <div className="flex mb-12 font-light text-gray-600 md:hidden">
        <Link
          href="/cars"
          className="flex items-center gap-2 px-3 py-2 rounded-md"
          aria-label="Revenir à la liste des véhicules"
        >
          <FaChevronLeft className="text-md" />
          <span>Revenir à la liste des véhicules</span>
        </Link>
      </div>
      <div className="flex-wrap hidden mb-12 text-sm font-light md:flex">
        {items.map((item, index) => {
          return (
            <div className="flex">
              <Link
                aria-label={item.label}
                key={index}
                href={item.href}
                className="flex items-center hover:underline underline-offset-2"
              >
                {item.Icon ? <item.Icon className="text-md" /> : <p>{item.label}</p>}
              </Link>
              {index < items.length - 1 && <span className="mx-1">/</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
