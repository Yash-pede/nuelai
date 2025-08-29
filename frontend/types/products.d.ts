export type Products = {
  id: string;
  name: string;
  sku: string;
  warehouse: string;
  stock: number;
  demand: number;
};

export type ProductStatus = "healthy" | "low" | "critical";