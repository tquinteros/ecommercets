

export interface ProductItemProps {
    id?: number;
    title: string;
    price?: number;
    description: string;
    thumbnail?: string;
    discountPercentage?: number;
    category: string;
    images?: string[];
    stock?: number;
    rating?: number;
}

export interface ProductDetailsProps {
    product: ProductItemProps;
}

export interface ProductItems {
    params: {
      id: string;
    };
  }

export interface ProductCardProps {
    product: ProductItemProps;
    index: number;
    reverse?: boolean;
}

export interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
}

export interface CartProps {
    setIsCartOpen: (value: boolean) => void;
}