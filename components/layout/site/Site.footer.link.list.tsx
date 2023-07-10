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

function checkUrl(url: string, pathName: string) {
  const strArray = url.split("");
  console.log(strArray);
  if (strArray.some(() => "?")) return pathName === url.split("?")[0];
  if (strArray.some(() => "#")) {
    console.log(url.split("#"));
    return pathName === url.split("#")[0].split("/")[1];
  }
  return pathName === url;
}

const LinkWithPath = ({
  pathName,
  url,
  text,
  originalUrl,
}: LinkWithPathProps) => {
  return (
    <Link
      href={url}
      className={`${originalUrl && originalUrl === pathName && "underline"} ${
        url === pathName && "underline"
      }`}
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
      <p className="w-[200px] border-0 border-b-2 border-neutral-200 pb-2 mb-4 font-semibold">
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
