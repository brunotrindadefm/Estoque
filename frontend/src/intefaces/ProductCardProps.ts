import { UpdatePayload } from "vite/types/hmrPayload.js";
import { Product } from "./Product";

// product recebera os tipos de Product
// onChange receberá o updatedProduct que sera dos tipos de Product e retornará nada (void)

export interface ProductsCardProps {
  product: Product;
  onChange: (updatedProduct: Product) => void;
  onEdit: (updatedProduct: Product) => void;
  onDelete: (deletedProduct: Product) => void;
}
