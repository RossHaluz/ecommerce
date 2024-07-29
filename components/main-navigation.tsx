"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const MainNavigation = () => {
  const pathname = usePathname();

  const routes = [
    {
      id: 1,
      name: "Про магазин",
      href: "/about",
      active: pathname === "/about",
    },
    {
      id: 2,
      name: "Відгуки",
      href: "/rewievs",
      active: pathname === "/rewievs",
    },
    {
      id: 3,
      name: "Доставка та оплата",
      href: "/delivary-pay",
      active: pathname === "/delivary-pay",
    },
    {
      id: 4,
      name: "Контакти",
      href: "/contact",
      active: pathname === "/contact",
    },
  ];

  return (
    <nav className="hidden lg:flex items-center gap-[100px]">
      {routes?.map(({ id, name, href, active }) => {
        return (
          <Link key={id} href={href}>
            {name}
          </Link>
        );
      })}
    </nav>
  );
};

export default MainNavigation;
