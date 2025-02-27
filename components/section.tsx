import React, { FC, ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  title?: string;
  sectionStyles?: string;
}

const Section: FC<SectionProps> = ({ children, title, sectionStyles }) => {
  return (
    <section className={`mt-6 mb-6 ${sectionStyles ? sectionStyles : ""}`}>
      <div className="container flex flex-col gap-[30px] overflow-x-auto">
        {title && (
          <h2 className="text-[#484848] font-bold text-2xl lg:text-[32px] lg:leading-[40.16px]">
            {title}
          </h2>
        )}
        {children}
      </div>
    </section>
  );
};

export default Section;
