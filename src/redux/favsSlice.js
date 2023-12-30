import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    favs:[]
}

const favsSlice = createSlice({
    name:'favs',
    initialState,
    reducers: {
        addFav: (payload) => console.log(payload),
    }
})

export const { addFav } = favsSlice.actions

export default favsSlice.reducer
