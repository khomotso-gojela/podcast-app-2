import { createSlice } from "@reduxjs/toolkit";
import { store } from "../main";

const initialState = {
    favs:[],
    history: [],
    playing: null,
    lastPlayed: {}
}

const favsSlice = createSlice({
    name:'favs',
    initialState,
    reducers: {
        addFav: (state,action) => {
            state.favs = [...action.payload]
        },
        setPlaying: (state,action) => {
            state.playing = action.payload
            
        },
        addHis: (state,action) => {
            state.history = [...state.history,...action.payload]
            if (state.history.length > 5) {
                state.history.shift()
            }
          
        },
        resetHis: (state) => {
            state.history = []
            state.playing = null
        },
        handleLast: (state,action) => state.lastPlayed = action.payload, 
    }
})

export const { addFav, addHis, resetHis, setPlaying } = favsSlice.actions

export default favsSlice.reducer
