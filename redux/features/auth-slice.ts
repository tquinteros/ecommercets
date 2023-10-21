import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type InitialState = {
    value: AuthState;
}

type AuthState = {
    isAuthenticated: boolean;
    email: string;
    id: string;
    isAdmin: boolean;
}

const initialState = {
    value: {
        isAuthenticated: false,
        email: "",
        id: "",
        isAdmin: false,
    } as AuthState,
} as InitialState;

export const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logOut: () => {
            return initialState;
        },
        logIn: (state, action: PayloadAction<{ email: string; isAdmin: boolean }>) => {
            const { email, isAdmin } = action.payload;
            return {
                value: {
                    isAuthenticated: true,
                    email: email,
                    id: crypto.randomUUID(),
                    isAdmin: isAdmin,
                },
            };
        },
        toggleAdmin : (state) => {
            state.value.isAdmin = !state.value.isAdmin;
        }
    }
})

export const {logIn, logOut, toggleAdmin} = auth.actions;
export default auth.reducer;