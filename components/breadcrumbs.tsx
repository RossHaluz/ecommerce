"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import React, { FC } from "react";

interface BreadcrumbsProps {
  homeElement: string;
  separator: string;
  replaceLink: boolean;
}

const Breadcrumbs: FC<BreadcrumbsProps> = ({
  homeElement,
  separator,
  replaceLink,
}) => {
  const paths = usePathname();
  const pathNames = paths.split("/").filter((path) => path);

  if (pathNames.length === 0) {
    return;
  }

  return (
    <div>
      <ul className="flex items-center gap-1">
        {/* Посилання на головну сторінку */}
        <li className="text-[#484848] text-[10px] leading-[12.19px]">
          <Link href={"/"}>{homeElement}</Link>
        </li>

        {pathNames.length > 0 && separator}

        {/* Мапінг по елементах шляху для створення breadcrumbs */}
        {pathNames?.map((link, index) => {
          if (link === "categories") {
            return null;
          }
          let href = `/${pathNames.slice(0, index + 1).join("/")}`;
          let itemLink = replaceLink
            ? link.slice(1, link.length).replace(/%20/g, "-")
            : link;

          return (
            <React.Fragment key={index}>
              <li className="text-[#484848] text-[10px] leading-[12.19px]">
                <Link href={href}>{link}</Link>
              </li>

              {/* Відображення роздільника, якщо це не останній елемент шляху */}
              {pathNames.length !== index + 1 && separator}
            </React.Fragment>
          );
        })}
      </ul>
    </div>
  );
};

export default Breadcrumbs;
