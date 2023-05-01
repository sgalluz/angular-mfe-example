export interface Product {
    image: string,
    id: string | number,
    name: string,
    description?: string,
    deliveryDate?: string,
    inStock?: number,
    shop?: string,
    price: string
}