export interface Product {
  id: string;
  title: string;
  price: string;
  quantity: number;
  article: string;
  product_name: string;
  /** Не завжди присутній (список товарів не тягне його) — тому опційний;
   *  сторінка товару отримує повний запис і читає його. */
  description?: string;
  models: {
    model: Model;
  }[];
  /** `category` приходить лише в деталях товару (бекенд робить include), у списках — тільки id. */
  categories?: {
    categoryId: string;
    category?: { name: string; category_name: string; parentId?: string | null } | null;
  }[];
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
  /** Всього товарів у списку: totalProducts у моделі, totalItem у категорії. */
  totalProducts?: number;
  totalItem?: number;
}
export interface Category {
  id: string;
  name: string;
  category_name: string;
  parentId: string | null;
  children?: Category[];
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
  images: {
    id: string;
    url: string;
  }[];
}
