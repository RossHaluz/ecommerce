export interface Product {
  id: string;
  title: string;
  price: string;
  quantity: number;
  article: string;
  product_name: string;
  maxPrice: string;
  models: {
    model: Model;
  }[];
  catalog_number: string;
  productOptions: any[];
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
