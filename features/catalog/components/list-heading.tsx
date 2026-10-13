import Breadcrumbs from "@/components/breadcrumb";

/** Над товарами, а не над меню: заголовок підписує саме список, і з нього починається сторінка для Google. */
export const ListHeading = ({ title }: { title: string }) => (
  <div className="flex flex-col gap-1.5">
    <Breadcrumbs />
    {title && <h1 className="text-xl font-extrabold leading-tight text-[#2E2E2E] lg:text-[28px]">{title}</h1>}
  </div>
);
