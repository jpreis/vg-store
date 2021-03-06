// Model

export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  status: StockStatus;
  cover: ProductImage | null;
};

export type StockStatus = "IN_STOCK" | "OUT_OF_STOCK";

export type ProductImage = {
  image: {
    publicUrl: string;
  };
  altText: string;
};

export type ProductCardProps = {
  product: Product;
};

// UI

export type Intent = "warning" | "danger" | "success" | "info" | "none";
