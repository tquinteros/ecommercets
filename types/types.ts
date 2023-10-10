export interface Products {
    id?: number;
    title: string;
    price: number;
    description: string;
    image?: string;
    category: string;
    rating: {
        rate: number;
        count: number;
    }
}

export interface ProductItemProps {
    id?: number;
    title: string;
    price: number;
    description: string;
    image?: string;
    category: string;
    rating: {
        rate: number;
        count: number;
    }
}

export interface ProductItems {
    params: {
      id: string;
    };
  }

export interface ProductCardProps {
    product: Products;
}