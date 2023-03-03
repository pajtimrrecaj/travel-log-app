import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    value: localStorage.getItem('auth') ? localStorage.getItem('auth') : null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            localStorage.setItem('auth', action.payload)
            state.value = action.payload

        },
        logout: (state) => {
            localStorage.removeItem('auth')
            state.value = null
        }
    }
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer