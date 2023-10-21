// export interface Products {
//     id?: number;
//     title: string;
//     price?: number;
//     description: string;
//     thumbnail?: string;
//     discountPercentage?: number;
//     category: string;
//     rating: {
//         rate: number;
//         count: number;
//     }
// }

export interface ProductItemProps {
    id?: number;
    title: string;
    price?: number;
    description: string;
    thumbnail?: string;
    discountPercentage?: number;
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
    product: ProductItemProps;
    index: number;
}

export interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    disabled?: boolean;
}

export interface CartProps {
    setIsCartOpen: (value: boolean) => void;
}