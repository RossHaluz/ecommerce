import type { FC, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { CategorySidebar } from "@/features/catalog/components/category-sidebar/category-sidebar";
import { ListHeading } from "@/features/catalog/components/list-heading";
import { ListToolbar } from "@/features/catalog/components/list-toolbar/list-toolbar";

interface MainSectionProps {
  title: string;
  children: ReactNode;
  shouldBeCategories?: boolean;
  shouldBeModels?: boolean;
}

/**
 * Каркас сторінки списку, як у великих каталогах: панель моделі й фільтрів — на всю ширину й прилипає
 * під шапкою; категорії збоку прилипають під нею й гортаються своїм скролом, не відпускаючи товари.
 */
const MainSection: FC<MainSectionProps> = ({ children, title, shouldBeCategories = true, shouldBeModels = true }) => (
  <section className="container mb-6 mt-3 flex flex-col gap-3">
    <ListHeading title={title} />
    <ListToolbar withModel={shouldBeModels} />
    <div className={cn("grid items-start gap-6", shouldBeCategories && "lg:grid-cols-[272px_minmax(0,1fr)]")}>
      {shouldBeCategories && (
        <aside className="sticky top-[148px] hidden max-h-[calc(100vh-164px)] overflow-y-auto rounded-xl lg:block">
          <CategorySidebar />
        </aside>
      )}
      <div className="flex min-w-0 flex-col gap-3">{children}</div>
    </div>
  </section>
);

export default MainSection;
