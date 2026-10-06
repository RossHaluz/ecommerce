import React, { FC, ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  title?: string;
  sectionStyles?: string;
  /** h1, коли секція — це вся сторінка (контакти, категорії); інакше лишається h2. */
  titleAs?: "h1" | "h2";
}

const Section: FC<SectionProps> = ({ children, title, sectionStyles, titleAs: Title = "h2" }) => {
  return (
    <section className={`mt-6 mb-6 ${sectionStyles ? sectionStyles : ""}`}>
      <div className="container flex flex-col gap-[30px] overflow-x-auto">
        {title && (
          <Title className="text-[#484848] font-bold text-2xl lg:text-[32px] lg:leading-[40.16px]">
            {title}
          </Title>
        )}
        {children}
      </div>
    </section>
  );
};

export default Section;
