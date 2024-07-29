import React, { FC, ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  title?: string;
  isPadding?: boolean;
}

const Section: FC<SectionProps> = ({ children, title, isPadding = true }) => {
  return (
    <section className={`${isPadding ? "py-[30px]" : "py-0"}`}>
      <div className="container lg:px-[165px] flex flex-col gap-[30px]">
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
