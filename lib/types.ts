export interface Product {
  id: string;
  title: string;
  price: string;
  quantity: number;
  article: string;
  product_name: string;
  maxPrice: string;
  /** Не завжди присутній (список товарів не тягне його) — тому опційний;
   *  сторінка товару отримує повний запис і читає його. */
  description?: string;
  models: {
    model: Model;
  }[];
  categories?: { categoryId: string }[];
  catalog_number: string;
  images: {
    id: string;
    url: string;
  }[];
}

export interface Model {
  id: string;
  name: string;
  modelName: string;
}

export interface Meta {
  page: number;
  totalPages: number;
}
export interface Category {
  id: string;
  name: string;
  category_name: string;
  type: "main" | "subcategory";
  position: number;
  isArchive: boolean;
  desctiption: string;
  parentId: string | null;
  children?: Category[];
  billboard?: { label: string; imageUrl: string } | null;
}

/** Те, що бекенд віддає після створення замовлення. */
export interface CreatedOrder {
  id: string;
  orderNumber: number;
  totalPrice: number;
  [key: string]: unknown;
}

/** Форма, яку віддає /search/suggestions — вужча за Product. */
export interface SearchResultItem {
  id: string;
  title: string;
  price: string;
  article: string;
  catalog_number: string;
  product_name: string;
  maxPrice: string;
  images: {
    id: string;
    url: string;
  }[];
}
