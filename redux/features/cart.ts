import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { ProductItemProps } from "@/types/types";

type InitialState = {
    value: CartState;
}

type CartState = {
    products: ProductItemProps[];
}

const initialState: InitialState = {
    value: {
        products: [],
    }
};

export const cart = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<ProductItemProps>) => {
            state.value.products.push(action.payload);
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            const index = state.value.products.findIndex((product) => product.id === action.payload);
            if (index !== -1) {
                state.value.products.splice(index, 1);
            }
        },
        clearCart: (state) => {
            state.value.products = [];
        },
    }
})

export const { addToCart, removeFromCart, clearCart } = cart.actions;
export default cart.reducer;