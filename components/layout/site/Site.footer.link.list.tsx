"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type SiteFooterLinkListProps = {
  title: string;
  links: {
    url: string;
    text: string;
    originalUrl?: string;
  }[];
};

type LinkWithPathProps = {
  pathName: string;
  originalUrl?: string | null;
  url: string;
  text: string;
};

const LinkWithPath = ({
  pathName,
  url,
  text,
  originalUrl,
}: LinkWithPathProps) => {
  return (
    <Link
      href={url}
      className={`${
        originalUrl && originalUrl === pathName && "underline font-bold"
      } ${
        url === pathName && "underline font-bold"
      } hover:underline underline-offset-2 py-4 px-2 md:py-1 md:px-0`}
    >
      {text}
    </Link>
  );
};

export default function SiteFooterLinkList({
  title,
  links,
}: SiteFooterLinkListProps) {
  const pathName = usePathname();
  return (
    <div className="mx-10 mt-10 flex flex-col">
      <p className="w-[200px] border-0 border-b-2 border-neutral-200 pb-2 mb-4 font-semibold font-title">
        {title}
      </p>
      <div className="text-sm font-light flex flex-col space-y-2">
        {links.map((link, index) => (
          <LinkWithPath
            key={index}
            url={link.url}
            pathName={pathName}
            text={link.text}
            originalUrl={link.originalUrl ? link.originalUrl : null}
          />
        ))}
      </div>
    </div>
  );
}
