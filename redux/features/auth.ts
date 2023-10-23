import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type InitialState = {
    value: AuthState;
}

type AuthState = {
    isAuthenticated: boolean;
    username: string;
    id: string;
    isAdmin: boolean;
}

const initialState = {
    value: {
        isAuthenticated: false,
        username: "",
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
        logIn: (state, action: PayloadAction<{ username: string; isAdmin: boolean }>) => {
            const { username, isAdmin } = action.payload;
            return {
                value: {
                    isAuthenticated: true,
                    username: username,
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