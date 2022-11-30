interface Product {
    id: string;
    name: string;
    url: string;
    shop: Shop;
}

interface ProductData {
    id: string;
    product: Product;
    currency: "BRL" | "USD";
    available: boolean;
    priceInfo: PriceInfo;
    promo: boolean;
    images: string[];
    createdAt: Date;
    updatedAt: Date;
}

interface PriceInfo {
    cash: number;
    credit: number;
}
