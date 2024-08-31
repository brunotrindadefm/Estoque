// Definindo ou tipando meu Product

export interface Product {
    id: number,
    name: string,
    description: string,
    price: number,
    stock: number,
    image: string | null | File
}