import { Product } from "./Product";

export interface EditProductProps  {
    product: Product;
    onSave: (updatedProduct: Product) => void;
    onCancel: () => void   
};