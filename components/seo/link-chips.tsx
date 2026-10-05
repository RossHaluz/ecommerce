import { Link } from "@/i18n/routing";

export interface LinkChip {
  href: string;
  label: string;
}

/** Заголовок і ряд посилань-«чипів»; порожній список не рендерить нічого. */
export const LinkChips = ({ title, links }: { title: string; links: LinkChip[] }) =>
  links.length ? (
    <section className="flex flex-col gap-3">
      <h2 className="text-[#484848] font-bold text-base">{title}</h2>
      <ul className="flex flex-wrap gap-2">
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              prefetch={false}
              className="inline-flex min-h-[32px] items-center rounded-[5px] bg-[#FFFDFD] px-3 text-sm text-[#484848] hover:text-[#c0092a]"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  ) : null;
