import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    favs:[]
}

const favsSlice = createSlice({
    name:'favs',
    initialState,
    reducers: {
        addFav: () => console.log('adding'),
    }
})

export const { addFav } = favsSlice.actions

export default favsSlice.reducer
