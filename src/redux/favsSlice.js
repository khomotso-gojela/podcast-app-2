import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    favs:[],
    history: []
}

const favsSlice = createSlice({
    name:'favs',
    initialState,
    reducers: {
        addFav: (state,action) => {
            console.log(action.payload)
            state.favs = [...action.payload]
        },
        addHis: (state,action) => state.history.push(action.payload),
        resetHis: (state) => state.history = []
    }
})

export const { addFav } = favsSlice.actions

export default favsSlice.reducer
