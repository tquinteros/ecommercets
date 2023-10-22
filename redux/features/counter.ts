import { createSlice } from "@reduxjs/toolkit"

type InitialState = {
    value: CounterState;
}

type CounterState = {
    value: number;
}

const initialState = {
    value: {
        value: 0,
    } as CounterState,
} as InitialState;

export const counter = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            state.value.value += 1;
        },
        decrement: (state) => {
            state.value.value -= 1;
        },
    }
})

export const {increment, decrement} = counter.actions;
export default counter.reducer;