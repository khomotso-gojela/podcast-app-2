import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { store } from "../main";

console.log('slice ran')

export const fetchFavorites = createAsyncThunk('favs/fetchFavs', async () => {
    try {
        const res = await fetch(`http://localhost:4001/favorites`)
        .then(data => data.json())
        
        return res
    } catch (error) {
        console.log(error.massage)
    }
})

const initialState = {
    favs:[],
    favsStatus: 'pending', // pending | fulfilled | error
    history: [],
    playing: null,
    lastPlayed: {},
    currentShow: {}
}

const favsSlice = createSlice({
    name:'favs',
    initialState,
    reducers: {
        setCurrentShow:(state,action) => {
            state.currentShow = action.payload
        },
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
        setTokenOn: (state) => state.token = true,
        setTokenOff: (state) => state.token = false,
    },
    extraReducers(builder) {
        builder.addCase(fetchFavorites.pending, (state) => {
            state.favsStatus = 'pending'
        })
        .addCase(fetchFavorites.fulfilled, (state,action) => {
            
            state.favs = action.payload
            state.favsStatus = 'fulfilled'
        })
        .addCase(fetchFavorites.rejected,(state) => {
            state.favsStatus = 'error'
        })
    }
})

export const { setCurrentShow, addFav, addHis, resetHis, setPlaying,setTokenOff,setTokenOn } = favsSlice.actions

export const allFavs = (state) => state.favs.favs
export const allHistory = (state) => state.favs.history
export const favsStatus = (state) => state.favs.favsStatus
export const currentShow = (state) => state.favs.currentShow

export default favsSlice.reducer
