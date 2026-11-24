export interface ReturnsSectionContent {
  title: string;
  text?: string;
  items?: string[];
}

export const ReturnsSection = ({ title, text, items }: ReturnsSectionContent) => (
  <section className="flex flex-col gap-2">
    <h2 className="text-base font-bold text-[#111111]">{title}</h2>
    {text && <p className="text-[15px] leading-6 text-[#484848]">{text}</p>}
    {items && (
      <ul className="m-0 flex list-disc flex-col gap-1 pl-5 text-[15px] leading-6 text-[#484848]">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    )}
  </section>
);
