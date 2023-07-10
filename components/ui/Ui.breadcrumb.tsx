import Link from "next/link";
import { IconType } from "react-icons";

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
    <div className="flex flex-wrap text-sm font-light mb-12">
      {items.map((item, index) => {
        return (
          <div className="flex">
            <Link
              aria-label={item.label}
              key={index}
              href={item.href}
              className="flex items-center hover:underline underline-offset-2"
            >
              {item.Icon ? (
                <item.Icon className="text-md" />
              ) : (
                <p>{item.label}</p>
              )}
            </Link>
            {index < items.length - 1 && <span className="mx-1">/</span>}
          </div>
        );
      })}
    </div>
  );
}
