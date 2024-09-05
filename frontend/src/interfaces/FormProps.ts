import { Product } from "./Product";

// handleNewProduct é uma função que receberá product que será tipado pelo Product e retornará nada (void) 

export interface FormProps {
    handleNewProduct: (product: Product | undefined) => void;
}