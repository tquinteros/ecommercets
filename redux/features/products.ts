import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { ProductItemProps } from "@/types/types";

type InitialState = {
    value: ProductsState;
}

type ProductsState = {
    products: ProductItemProps[];
}

const initialState: InitialState = {
    value: {
        products: [],
    }
};

export const products = createSlice({
    name: 'products',
    initialState,
    reducers: {
        saveProducts: (state, action: PayloadAction<ProductItemProps[]>) => {
            state.value.products = action.payload;
        },
        editProduct: (state, action: PayloadAction<ProductItemProps>) => {
            const productIndex = state.value.products.findIndex(product => product.id === action.payload.id);
            if (productIndex !== -1) {
                state.value.products[productIndex] = action.payload;
            }
        },
        deleteProduct: (state, action: PayloadAction<number>) => {
            const productIndex = state.value.products.findIndex(product => product.id === action.payload);
            state.value.products.splice(productIndex, 1);
        },
        addProduct: (state, action: PayloadAction<ProductItemProps>) => {
            state.value.products.push(action.payload);
        },
    }
})

export const { saveProducts, deleteProduct, editProduct, addProduct } = products.actions;
export default products.reducer;