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