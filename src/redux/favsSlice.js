import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    favs:[]
}

const favsSlice = createSlice({
    name:'favs',
    initialState,
    reducers: {
        addFav: (state,action) => {
            console.log(action.payload)
            state.favs = [...action.payload]
        },
    }
})

export const { addFav } = favsSlice.actions

export default favsSlice.reducer
