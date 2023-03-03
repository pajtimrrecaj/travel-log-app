import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import searchSlice from "./slices/searchSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        search: searchSlice
    }
})