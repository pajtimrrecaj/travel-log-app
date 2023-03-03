import { createSlice } from "@reduxjs/toolkit";




export const searchSlice = createSlice({
    name: 'search',
    initialState: {
        value: ''
    },
    reducers: {
        setSearchResults: (state, action) => {
            state.value = action.payload
            console.log(state.value)
        }
    }
})

export const { setSearchResults } = searchSlice.actions
export default searchSlice.reducer