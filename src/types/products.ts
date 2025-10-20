export interface Product {
    id: number;
    name: string;
    price: number;
    discount: number;
    image: string | null;
    created_at: string;
}
export interface ProductForm {
    id: number;
    name: string;
    price: string;
    discount: string;
    image: string | File;
}